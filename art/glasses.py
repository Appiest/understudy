"""Procedural clay render of generic AI smart glasses.

Run: blender -b -P art/glasses.py -- [--views hero,side,front] [--samples 256] [--scale 1.0]
Units are centimetres. The glasses face -Y, temples run toward +Y, Z is up.
The wearer's left side is +X, which is where the camera module sits.
"""

import math
import os
import sys

import bmesh
import bpy
import numpy as np
from mathutils import Matrix, Vector

ART_DIR = os.path.dirname(os.path.abspath(__file__))
RENDER_DIR = os.path.join(os.path.dirname(ART_DIR), "public", "renders")

FRAME_DEPTH = 0.62
FRAME_BEVEL = 0.1
WRAP_CURVE = 0.012
LENS_CENTER_X = 3.55
LENS_HALF_WIDTH = 2.55
LENS_HALF_HEIGHT = 1.98
LENS_SUPERELLIPSE = 2.8
TEMPLE_CENTER_X = 6.6
TEMPLE_CENTER_Z = 1.9
END_PIECE_LENGTH = 0.85
HINGE_GAP = 0.03
TEMPLE_STRAIGHT = 10.2
TEMPLE_BEND_RADIUS = 3.4
TEMPLE_BEND_ANGLE = math.radians(62)
GRILLE_START = 8.7
GRILLE_SLOTS = 7
GRILLE_PITCH = 0.17

PAPER = "#e4e6e5"
CLAY = "#f2f3f1"
OCEAN = "#0d4f8b"


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    options = {"views": "hero,side,front", "samples": "256", "scale": "1.0"}
    for flag, value in zip(argv[::2], argv[1::2]):
        options[flag.lstrip("-")] = value
    return {
        "views": options["views"].split(","),
        "samples": int(options["samples"]),
        "scale": float(options["scale"]),
    }


def hex_to_linear(hex_color):
    channels = [int(hex_color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    linear = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
    return (*linear, 1.0)


def smoothstep(edge0, edge1, x):
    t = np.clip((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return t * t * (3 - 2 * t)


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


# ---------------------------------------------------------------- 2D shapes

def lens_outline(side, count=240):
    """Slightly trapezoidal rounded lens, wider on top, outer top corner lifted."""
    t = np.linspace(0, 2 * math.pi, count, endpoint=False)
    power = 2 / LENS_SUPERELLIPSE
    ux = np.sign(np.cos(t)) * np.abs(np.cos(t)) ** power
    uz = np.sign(np.sin(t)) * np.abs(np.sin(t)) ** power
    taper = 1 - 0.13 * (1 - uz) / 2
    lx = LENS_HALF_WIDTH * ux * taper
    lz = LENS_HALF_HEIGHT * uz + 0.07 * lx
    lz -= 0.12 * np.clip(-uz, 0, 1) * np.clip(-ux, 0, 1)
    return np.stack([side * (LENS_CENTER_X + lx), lz], axis=1)


def polygon_signed_distance(points, px, pz):
    distance = np.full(px.shape, np.inf)
    inside = np.zeros(px.shape, dtype=bool)
    starts = points
    ends = np.roll(points, -1, axis=0)
    for (ax, az), (bx, bz) in zip(starts, ends):
        ex, ez = bx - ax, bz - az
        t = np.clip(((px - ax) * ex + (pz - az) * ez) / (ex * ex + ez * ez), 0, 1)
        distance = np.minimum(distance, np.hypot(px - ax - t * ex, pz - az - t * ez))
        crosses = (az > pz) != (bz > pz)
        with np.errstate(divide="ignore", invalid="ignore"):
            x_hit = ax + (pz - az) * ex / ez
        inside ^= crosses & (px < x_hit)
    return np.where(inside, -distance, distance)


def smooth_min(a, b, k):
    h = np.clip(0.5 + 0.5 * (b - a) / k, 0, 1)
    return b + (a - b) * h - k * h * (1 - h)


def rim_width(side, px, pz):
    outward = side * (px - LENS_CENTER_X * side)
    brow = 0.3 * smoothstep(0.1, 1.9, pz)
    corner = 0.42 * smoothstep(1.7, 2.8, outward) * smoothstep(0.9, 2.2, pz)
    return 0.3 + brow + corner


def box_distance(px, pz, center, half):
    dx = np.abs(px - center[0]) - half[0]
    dz = np.abs(pz - center[1]) - half[1]
    outside = np.hypot(np.maximum(dx, 0), np.maximum(dz, 0))
    return outside + np.minimum(np.maximum(dx, dz), 0)


def frame_field(px, pz):
    fields = []
    for side in (1, -1):
        lens = polygon_signed_distance(lens_outline(side, 160), px, pz)
        fields.append(lens - rim_width(side, px, pz))
    bridge = box_distance(px, pz, (0.0, 1.45), (1.3, 0.52)) - 0.1
    merged = smooth_min(fields[0], fields[1], 0.3)
    return smooth_min(merged, bridge, 0.18)


def frame_material_field(px, pz):
    field = frame_field(px, pz)
    for side in (1, -1):
        field = np.maximum(field, -polygon_signed_distance(lens_outline(side, 160), px, pz))
    return field


def marching_squares_loop(field, xs, zs):
    inside = field < 0
    neighbors = {}

    def edge_point(key):
        kind, i, j = key
        if kind == "h":
            a, b = field[i, j], field[i, j + 1]
            t = a / (a - b)
            return (xs[j] + t * (xs[j + 1] - xs[j]), zs[i])
        a, b = field[i, j], field[i + 1, j]
        t = a / (a - b)
        return (xs[j], zs[i] + t * (zs[i + 1] - zs[i]))

    def link(a, b):
        neighbors.setdefault(a, []).append(b)
        neighbors.setdefault(b, []).append(a)

    rows, cols = field.shape
    corners = inside[:-1, :-1].astype(int) + 2 * inside[:-1, 1:] + 4 * inside[1:, 1:] + 8 * inside[1:, :-1]
    for i, j in zip(*np.nonzero((corners > 0) & (corners < 15))):
        edges = [("h", i, j), ("v", i, j + 1), ("h", i + 1, j), ("v", i, j)]
        states = [inside[i, j], inside[i, j + 1], inside[i + 1, j + 1], inside[i + 1, j]]
        crossed = [edges[k] for k in range(4) if states[k] != states[(k + 1) % 4]]
        link(crossed[0], crossed[1])
        if len(crossed) == 4:
            link(crossed[2], crossed[3])

    start = next(iter(neighbors))
    loop, previous, current = [start], None, start
    while True:
        options = [n for n in neighbors[current] if n != previous]
        following = options[0]
        if following == start:
            break
        loop.append(following)
        previous, current = current, following
    return np.array([edge_point(key) for key in loop])


def relax_loop(points, iterations=6):
    for _ in range(iterations):
        points = 0.5 * points + 0.25 * (np.roll(points, 1, axis=0) + np.roll(points, -1, axis=0))
    return points


def frame_outline():
    xs = np.arange(-8.5, 8.5, 0.02)
    zs = np.arange(-3.6, 3.8, 0.02)
    px, pz = np.meshgrid(xs, zs)
    loop = relax_loop(marching_squares_loop(frame_field(px, pz), xs, zs))
    return loop[::2], frame_material_field(px, pz), xs, zs


def widest_inset_point(field, xs, zs, window):
    px, pz = np.meshgrid(xs, zs)
    mask = (px > window[0]) & (px < window[1]) & (pz > window[2]) & (pz < window[3])
    masked = np.where(mask, field, np.inf)
    i, j = np.unravel_index(np.argmin(masked), masked.shape)
    return xs[j], zs[i], -field[i, j]


# ---------------------------------------------------------------- materials

def principled(name, color, roughness, **inputs):
    material = bpy.data.materials.new(name)
    material.use_nodes = True
    bsdf = material.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = hex_to_linear(color) if isinstance(color, str) else color
    bsdf.inputs["Roughness"].default_value = roughness
    for key, value in inputs.items():
        bsdf.inputs[key].default_value = value
    return material


def add_micro_grain(material, strength=0.06, scale=90.0):
    nodes = material.node_tree.nodes
    links = material.node_tree.links
    noise = nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = scale
    noise.inputs["Detail"].default_value = 6.0
    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = strength
    bump.inputs["Distance"].default_value = 0.01
    links.new(noise.outputs["Fac"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], nodes["Principled BSDF"].inputs["Normal"])


def build_materials():
    clay = principled(
        "Clay", CLAY, 0.6,
        **{"Subsurface Weight": 0.12, "Subsurface Scale": 0.08},
    )
    add_micro_grain(clay)
    lens = principled(
        "SmokedGlass", (0.2, 0.235, 0.29, 1.0), 0.04,
        **{"Transmission Weight": 1.0, "IOR": 1.5},
    )
    lens.node_tree.nodes["Principled BSDF"].inputs["Specular Tint"].default_value = (0.8, 0.85, 0.95, 1.0)
    black = principled("CameraGlass", (0.004, 0.004, 0.005, 1.0), 0.05, **{"Coat Weight": 1.0})
    ocean = principled("OceanRing", OCEAN, 0.3, **{"Metallic": 0.6})
    led = principled(
        "Led", OCEAN, 0.2,
        **{"Emission Color": hex_to_linear("#3f8fd6"), "Emission Strength": 1.6},
    )
    grille = principled("Grille", (0.025, 0.026, 0.028, 1.0), 0.55)
    hinge = principled("Hinge", "#c9ccca", 0.32, **{"Metallic": 0.85})
    return {"clay": clay, "lens": lens, "black": black, "ocean": ocean, "led": led, "grille": grille, "hinge": hinge}


# ---------------------------------------------------------------- mesh helpers

def mesh_object(name, vertices, faces, material=None, smooth=True):
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata([tuple(v) for v in vertices], [], faces)
    mesh.validate()
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    if smooth:
        mesh.shade_smooth()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    if material:
        obj.data.materials.append(material)
    return obj


def apply_modifiers(obj):
    bpy.context.view_layer.objects.active = obj
    for modifier in list(obj.modifiers):
        bpy.ops.object.modifier_apply(modifier=modifier.name)


def vertex_array(obj):
    coords = np.empty(len(obj.data.vertices) * 3)
    obj.data.vertices.foreach_get("co", coords)
    return coords.reshape(-1, 3)


def set_vertex_array(obj, coords):
    obj.data.vertices.foreach_set("co", coords.ravel())
    obj.data.update()


def wrap_front(obj):
    coords = vertex_array(obj)
    coords[:, 1] += WRAP_CURVE * coords[:, 0] ** 2
    set_vertex_array(obj, coords)


def wrap_offset(x):
    return WRAP_CURVE * x * x


def loft(name, sections, material, cap_start=True, cap_end=True):
    ring = len(sections[0])
    vertices = [v for section in sections for v in section]
    faces = []
    for s in range(len(sections) - 1):
        for k in range(ring):
            a = s * ring + k
            b = s * ring + (k + 1) % ring
            faces.append((a, b, b + ring, a + ring))
    if cap_start:
        vertices.append(np.mean(sections[0], axis=0))
        faces += [(len(vertices) - 1, (k + 1) % ring, k) for k in range(ring)]
    if cap_end:
        vertices.append(np.mean(sections[-1], axis=0))
        base = (len(sections) - 1) * ring
        faces += [(len(vertices) - 1, base + k, base + (k + 1) % ring) for k in range(ring)]
    return mesh_object(name, vertices, faces, material)


# ---------------------------------------------------------------- front frame

def curve_from_loops(name, loops, extrude, bevel):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "2D"
    curve.fill_mode = "BOTH"
    curve.extrude = extrude
    curve.bevel_depth = bevel
    curve.bevel_resolution = 5
    for loop in loops:
        spline = curve.splines.new("POLY")
        spline.points.add(len(loop) - 1)
        for point, (x, z) in zip(spline.points, loop):
            point.co = (x, z, 0.0, 1.0)
        spline.use_cyclic_u = True
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    return obj


def curve_to_mesh(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")
    obj.select_set(False)
    return bpy.context.view_layer.objects.active


def stand_upright(obj):
    """Curves are drawn in XY; rotate so the drawing plane becomes XZ facing -Y."""
    obj.data.transform(Matrix.Rotation(math.radians(90), 4, "X"))


def cylinder_cutter(name, center, radius, depth):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=64, radius1=radius, radius2=radius, depth=depth)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.rotation_euler = (math.radians(90), 0, 0)
    obj.location = center
    return obj


def boolean_cut(target, cutter):
    modifier = target.modifiers.new("Cut", "BOOLEAN")
    modifier.operation = "DIFFERENCE"
    modifier.solver = "EXACT"
    modifier.object = cutter
    apply_modifiers(target)
    bpy.data.objects.remove(cutter)


def remesh_smooth(obj, voxel):
    remesh = obj.modifiers.new("Remesh", "REMESH")
    remesh.mode = "VOXEL"
    remesh.voxel_size = voxel
    remesh.adaptivity = 0.0
    smooth = obj.modifiers.new("Smooth", "CORRECTIVE_SMOOTH")
    smooth.iterations = 4
    smooth.use_only_smooth = True
    apply_modifiers(obj)
    obj.data.shade_smooth()


def build_frame(materials, camera_spot):
    outline, _, _, _ = frame_outline()
    holes = [lens_outline(side) for side in (1, -1)]
    half = FRAME_DEPTH / 2 - FRAME_BEVEL
    frame = curve_to_mesh(curve_from_loops("Frame", [outline] + holes, half, FRAME_BEVEL))
    stand_upright(frame)
    cam_x, cam_z, _ = camera_spot
    cutter = cylinder_cutter("CameraCut", (cam_x, -FRAME_DEPTH / 2, cam_z), 0.23, 0.26)
    boolean_cut(frame, cutter)
    remesh_smooth(frame, 0.012)
    wrap_front(frame)
    frame.data.materials.append(materials["clay"])
    return frame


def lens_mesh(side, material):
    outline = lens_outline(side, 200)
    center = np.array([side * LENS_CENTER_X, 0.0])
    grown = center + (outline - center) * 1.035
    rings = np.linspace(0, 1, 18)
    thickness = 0.12
    front, back = [], []
    for s in rings:
        pts = center + (grown - center) * max(s, 1e-3)
        sag = 0.12 * (1 - s * s)
        front.append([(x, -thickness / 2 - sag, z) for x, z in pts])
        back.append([(x, thickness / 2 - sag, z) for x, z in pts])
    ring = len(grown)
    vertices = [v for r in front for v in r] + [v for r in back for v in r]
    offset = len(rings) * ring
    faces = []
    for s in range(len(rings) - 1):
        for k in range(ring):
            a, b = s * ring + k, s * ring + (k + 1) % ring
            faces.append((a, a + ring, b + ring, b))
            faces.append((offset + a, offset + b, offset + b + ring, offset + a + ring))
    last = (len(rings) - 1) * ring
    for k in range(ring):
        a, b = last + k, last + (k + 1) % ring
        faces.append((a, b, offset + b, offset + a))
    obj = mesh_object(f"Lens{'L' if side > 0 else 'R'}", vertices, faces, material)
    wrap_front(obj)
    return obj


# ---------------------------------------------------------------- camera module

def disc(name, radius, depth, material, dome=0.0, segments=64):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segments, radius1=radius, radius2=radius, depth=depth)
    if dome:
        for vert in bm.verts:
            if vert.co.z > 0:
                r = math.hypot(vert.co.x, vert.co.y) / radius
                vert.co.z += dome * (1 - r * r)
    bm.to_mesh(mesh)
    bm.free()
    mesh.shade_smooth()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)
    return obj


def ring(name, major, minor, material):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    segments, sides = 96, 16
    verts = []
    for i in range(segments):
        a = 2 * math.pi * i / segments
        for j in range(sides):
            b = 2 * math.pi * j / sides
            r = major + minor * math.cos(b)
            verts.append(bm.verts.new((r * math.cos(a), r * math.sin(a), minor * 1.4 * math.sin(b))))
    for i in range(segments):
        for j in range(sides):
            a = verts[i * sides + j]
            b = verts[((i + 1) % segments) * sides + j]
            c = verts[((i + 1) % segments) * sides + (j + 1) % sides]
            d = verts[i * sides + (j + 1) % sides]
            bm.faces.new((a, b, c, d))
    bm.to_mesh(mesh)
    bm.free()
    mesh.shade_smooth()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)
    return obj


def place_on_front(obj, x, z, depth_into):
    """Orient a Z-up part so it faces out of the wrapped front surface at (x, z)."""
    slope = 2 * WRAP_CURVE * x
    yaw = math.atan(slope)
    y = -FRAME_DEPTH / 2 + wrap_offset(x) + depth_into
    obj.rotation_euler = (math.radians(90), 0, yaw)
    obj.location = (x, y, z)


def capsule(name, length, radius, material):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=32, v_segments=16, radius=radius)
    for vert in bm.verts:
        vert.co.x += math.copysign(length / 2 - radius, vert.co.x) if abs(vert.co.x) > 1e-6 else 0
    bm.to_mesh(mesh)
    bm.free()
    mesh.shade_smooth()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(material)
    return obj


def build_camera_module(materials, camera_spot, led_spot):
    cam_x, cam_z, _ = camera_spot
    parts = []
    lens = disc("CameraLens", 0.185, 0.1, materials["black"], dome=0.03)
    place_on_front(lens, cam_x, cam_z, 0.07)
    parts.append(lens)
    accent = ring("CameraRing", 0.2, 0.022, materials["ocean"])
    place_on_front(accent, cam_x, cam_z, 0.035)
    parts.append(accent)
    led_x, led_z, _ = led_spot
    led = capsule("Led", 0.2, 0.042, materials["led"])
    led.scale = (1, 1, 0.55)
    place_on_front(led, led_x, led_z, 0.012)
    parts.append(led)
    return parts


# ---------------------------------------------------------------- temples

def temple_path(u):
    """Centerline point and tangent (in YZ) at arc length u from the hinge."""
    if u <= TEMPLE_STRAIGHT:
        droop = math.radians(3.0)
        return (u * math.cos(droop), -u * math.sin(droop)), (math.cos(droop), -math.sin(droop))
    start, _ = temple_path(TEMPLE_STRAIGHT)
    droop = math.radians(3.0)
    angle = droop + (u - TEMPLE_STRAIGHT) / TEMPLE_BEND_RADIUS
    center = (start[0] - TEMPLE_BEND_RADIUS * math.sin(droop), start[1] - TEMPLE_BEND_RADIUS * math.cos(droop))
    point = (center[0] + TEMPLE_BEND_RADIUS * math.sin(angle), center[1] + TEMPLE_BEND_RADIUS * math.cos(angle))
    return point, (math.cos(angle), -math.sin(angle))


def temple_half_size(u, total):
    half_width = float(np.interp(u, [0, 8, total], [0.29, 0.27, 0.22]))
    half_height = float(np.interp(u, [0, 6.5, 10.5, total], [0.6, 0.57, 0.36, 0.28]))
    return half_width, half_height


def end_inset(u, start, end, radius):
    distance = min(u - start, end - u)
    if distance >= radius:
        return 0.0
    return radius - math.sqrt(max(radius * radius - (radius - distance) ** 2, 0.0))


def superellipse_section(center, normal, half_width, half_height, side, count=48, power=3.0):
    t = np.linspace(0, 2 * math.pi, count, endpoint=False)
    cx = np.sign(np.cos(t)) * np.abs(np.cos(t)) ** (2 / power)
    cz = np.sign(np.sin(t)) * np.abs(np.sin(t)) ** (2 / power)
    points = []
    for a, b in zip(cx, cz):
        offset = normal * (half_height * b)
        points.append(center + Vector((side * half_width * a, 0, 0)) + offset)
    return [tuple(p) for p in points]


def temple_origin(side):
    x = side * TEMPLE_CENTER_X
    return Vector((x, wrap_offset(TEMPLE_CENTER_X) - 0.05, TEMPLE_CENTER_Z))


def temple_segment(name, side, start, end, material, tip_radius):
    origin = temple_origin(side)
    total = TEMPLE_STRAIGHT + TEMPLE_BEND_RADIUS * TEMPLE_BEND_ANGLE
    stations = np.unique(np.concatenate([
        np.linspace(start, end, max(int((end - start) / 0.05), 8)),
        start + tip_radius[0] * (1 - np.cos(np.linspace(0, math.pi / 2, 10))),
        end - tip_radius[1] * (1 - np.cos(np.linspace(0, math.pi / 2, 10))),
    ]))
    sections = []
    for u in stations:
        (py, pz), (ty, tz) = temple_path(u)
        center = origin + Vector((0, py, pz))
        normal = Vector((0, -tz, ty))
        half_width, half_height = temple_half_size(u, total)
        inset = max(end_inset(u, start, end, tip_radius[0]) if u - start < tip_radius[0] else 0.0,
                    end_inset(u, start, end, tip_radius[1]) if end - u < tip_radius[1] else 0.0)
        sections.append(superellipse_section(center, normal, max(half_width - inset, 0.01),
                                             max(half_height - inset, 0.01), side))
    return loft(name, sections, material)


def grille_cutters(side):
    origin = temple_origin(side)
    total = TEMPLE_STRAIGHT + TEMPLE_BEND_RADIUS * TEMPLE_BEND_ANGLE
    cutters = []
    for k in range(GRILLE_SLOTS):
        u = GRILLE_START + k * GRILLE_PITCH
        (py, pz), (ty, tz) = temple_path(u)
        half_width, half_height = temple_half_size(u, total)
        normal = Vector((0, -tz, ty))
        center = origin + Vector((side * 0.03, py, pz)) - normal * half_height
        mesh = bpy.data.meshes.new("SlotCut")
        bm = bmesh.new()
        bmesh.ops.create_uvsphere(bm, u_segments=32, v_segments=16, radius=1.0)
        bm.to_mesh(mesh)
        bm.free()
        cutter = bpy.data.objects.new("SlotCut", mesh)
        bpy.context.collection.objects.link(cutter)
        cutter.scale = (half_width + 0.1, 0.038, 0.13)
        cutter.location = center
        cutter.rotation_euler = (math.atan2(tz, ty), 0, 0)
        cutters.append(cutter)
    return cutters


def color_cut_faces(obj, cutters, material):
    obj.data.materials.append(material)
    slot_index = len(obj.data.materials) - 1
    bpy.context.view_layer.update()
    inverse = [c.matrix_world.inverted() for c in cutters]
    for polygon in obj.data.polygons:
        world = obj.matrix_world @ polygon.center
        if any((inv @ world).length <= 1.01 for inv in inverse):
            polygon.material_index = slot_index


def build_temple(side, materials):
    total = TEMPLE_STRAIGHT + TEMPLE_BEND_RADIUS * TEMPLE_BEND_ANGLE
    hinge_u = FRAME_DEPTH / 2 + 0.05 + END_PIECE_LENGTH
    end_piece = temple_segment(f"EndPiece{side}", side, 0.0, hinge_u, materials["clay"], (0.02, 0.07))
    arm = temple_segment(f"Temple{side}", side, hinge_u + HINGE_GAP, total, materials["clay"], (0.07, 0.3))
    cutters = grille_cutters(side)
    for cutter in cutters:
        modifier = arm.modifiers.new("Slot", "BOOLEAN")
        modifier.operation = "DIFFERENCE"
        modifier.solver = "EXACT"
        modifier.object = cutter
    bpy.context.view_layer.update()
    apply_modifiers(arm)
    color_cut_faces(arm, cutters, materials["grille"])
    for cutter in cutters:
        bpy.data.objects.remove(cutter)
    hinge = build_hinge(side, hinge_u, materials["hinge"])
    return [end_piece, arm, hinge]


def build_hinge(side, hinge_u, material):
    origin = temple_origin(side)
    (py, pz), _ = temple_path(hinge_u)
    barrel = disc(f"Hinge{side}", 0.1, 0.62, material, segments=32)
    barrel.location = origin + Vector((-side * 0.26, py + HINGE_GAP / 2, pz))
    return barrel


# ---------------------------------------------------------------- assembly

def build_glasses():
    materials = build_materials()
    _, field, xs, zs = frame_outline()
    camera_spot = widest_inset_point(field, xs, zs, (5.1, 7.2, 1.2, 3.2))
    led_spot = widest_inset_point(field, xs, zs, (camera_spot[0] - 0.62, camera_spot[0] - 0.52, 1.5, 3.2))
    parts = [build_frame(materials, camera_spot)]
    parts += [lens_mesh(side, materials["lens"]) for side in (1, -1)]
    parts += build_camera_module(materials, camera_spot, led_spot)
    for side in (1, -1):
        parts += build_temple(side, materials)
    rig = bpy.data.objects.new("Glasses", None)
    bpy.context.collection.objects.link(rig)
    for part in parts:
        part.parent = rig
    return rig, parts


def world_points(parts, stride=7):
    chunks = []
    for part in parts:
        coords = vertex_array(part)[::stride]
        matrix = np.array(part.matrix_world)
        chunks.append(coords @ matrix[:3, :3].T + matrix[:3, 3])
    return np.concatenate(chunks)


def rest_on_table(rig, parts):
    for _ in range(3):
        bpy.context.view_layer.update()
        points = world_points(parts)
        front = points[points[:, 1] < 2.0]
        back = points[points[:, 1] > 9.0]
        low_front = front[np.argmin(front[:, 2])]
        low_back = back[np.argmin(back[:, 2])]
        tilt = math.atan2(low_back[2] - low_front[2], low_back[1] - low_front[1])
        rig.rotation_euler.x -= tilt
    bpy.context.view_layer.update()
    points = world_points(parts)
    rig.location.z -= points[:, 2].min()
    bpy.context.view_layer.update()


def add_ground(material_color):
    bpy.ops.mesh.primitive_plane_add(size=400, location=(0, 5, 0))
    ground = bpy.context.active_object
    ground.name = "ShadowCatcher"
    ground.is_shadow_catcher = True
    ground.data.materials.append(principled("Ground", material_color, 0.9))
    return ground


# ---------------------------------------------------------------- lighting & camera

def look_rotation(direction):
    return direction.to_track_quat("-Z", "Y").to_euler()


def area_light(name, location, target, size, power, color=(1, 1, 1), shadows=True):
    data = bpy.data.lights.new(name, "AREA")
    data.use_shadow = shadows
    data.shape = "DISK"
    data.size = size
    data.energy = power
    data.color = color
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler = look_rotation(target - location)
    return obj


def light_rig(camera, target, sheen):
    for obj in [o for o in bpy.data.objects if o.type == "LIGHT"]:
        bpy.data.objects.remove(obj)
    forward = (target - camera.location).normalized()
    right = forward.cross(Vector((0, 0, 1))).normalized()
    up = Vector((0, 0, 1))
    distance = 45.0

    def place(direction):
        return target + direction.normalized() * distance

    key = place(-forward * 0.8 - right * 0.9 + up * 1.2)
    fill = place(-forward * 1.0 + right * 1.0 + up * 0.35)
    rim = place(forward * 1.0 + right * 0.35 + up * 0.9)
    top = place(up)
    scale = distance * distance
    area_light("Key", key, target, 34, 3.4 * scale)
    area_light("Fill", fill, target, 40, 0.6 * scale, (0.96, 0.98, 1.0), shadows=False)
    area_light("Rim", rim, target, 16, 2.4 * scale, shadows=False)
    area_light("Top", top, target, 50, 0.6 * scale)
    reflection_card(camera, target, distance, sheen)


def reflection_card(camera, target, distance, sheen):
    """A long softbox seen only in glossy bounces, so the smoked lenses read as glass."""
    to_camera = (camera.location - target).normalized()
    rig = bpy.data.objects["Glasses"]
    lens_normal = (rig.matrix_world.to_3x3() @ Vector((0, -1, 0))).normalized()
    mirrored = 2 * lens_normal.dot(to_camera) * lens_normal - to_camera
    location = target + (mirrored + Vector((0, 0, 0.1))).normalized() * distance
    card = area_light("Reflection", location, target, 1, sheen * 5 * distance * distance, shadows=False)
    card.data.shape = "RECTANGLE"
    card.data.size, card.data.size_y = 60, 2.4
    card.visible_camera = False
    card.visible_diffuse = False
    card.visible_transmission = False


def project(camera, points):
    matrix = np.array(camera.matrix_world.inverted())
    local = points @ matrix[:3, :3].T + matrix[:3, 3]
    depth = -local[:, 2]
    if camera.data.type == "ORTHO":
        return local[:, 0], local[:, 1], camera.data.ortho_scale / 2
    tan_half = camera.data.sensor_width / 2 / camera.data.lens
    return local[:, 0] / depth, local[:, 1] / depth, tan_half


def frame_camera(camera, points, target, aspect, padding):
    for _ in range(6):
        bpy.context.view_layer.update()
        u, v, half = project(camera, points)
        fit = max((u.max() - u.min()) / (2 * half * (1 - 2 * padding[0])),
                  (v.max() - v.min()) / (2 * half * aspect * (1 - 2 * padding[1])))
        if camera.data.type == "ORTHO":
            camera.data.ortho_scale *= fit
        else:
            camera.location = target + (camera.location - target) * fit
        bpy.context.view_layer.update()
        u, v, half = project(camera, points)
        camera.data.shift_x = (u.max() + u.min()) / 2 / half / 2
        camera.data.shift_y = (v.max() + v.min()) / 2 / half / 2


VIEWS = {
    "hero": {
        "file": "glasses-hero.png", "size": (2400, 1500), "type": "PERSP", "lens": 90,
        "direction": (0.72, -1.0, 0.62), "padding": (0.07, 0.09), "sheen": 1.0,
    },
    "side": {
        "file": "glasses-side.png", "size": (2400, 1200), "type": "PERSP", "lens": 200,
        "direction": (1.0, 0.0, 0.04), "padding": (0.06, 0.12), "sheen": 0.5,
    },
    "front": {
        "file": "glasses-front.png", "size": (2400, 1000), "type": "ORTHO", "lens": 50,
        "direction": (0.0, -1.0, 0.07), "padding": (0.06, 0.1), "sheen": 0.12,
    },
}


def setup_view(name, parts):
    view = VIEWS[name]
    width, height = view["size"]
    scene = bpy.context.scene
    scene.render.resolution_x, scene.render.resolution_y = width, height
    camera = scene.camera
    camera.data.type = view["type"]
    camera.data.lens = view["lens"]
    camera.data.sensor_fit = "HORIZONTAL"
    camera.data.ortho_scale = 20
    camera.data.shift_x = camera.data.shift_y = 0
    points = world_points(parts, stride=5)
    target = Vector(((points.min(0) + points.max(0)) / 2).tolist())
    direction = Vector(view["direction"]).normalized()
    camera.location = target + direction * 80
    camera.rotation_euler = look_rotation(-direction)
    frame_camera(camera, points, target, height / width, view["padding"])
    light_rig(camera, target, view["sheen"])
    camera.data.clip_end = 1000
    return os.path.join(RENDER_DIR, view["file"])


def configure_render(samples, scale):
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    prefs = bpy.context.preferences.addons["cycles"].preferences
    prefs.compute_device_type = "METAL"
    prefs.get_devices()
    for device in prefs.devices:
        device.use = True
    scene.cycles.device = "GPU"
    scene.cycles.samples = samples
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.adaptive_threshold = 0.004
    scene.cycles.use_denoising = True
    scene.cycles.denoiser = "OPENIMAGEDENOISE"
    scene.cycles.max_bounces = 12
    scene.cycles.transmission_bounces = 12
    scene.cycles.film_transparent_glass = False
    scene.render.film_transparent = True
    scene.render.resolution_percentage = int(scale * 100)
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.image_settings.compression = 90
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    scene.view_settings.exposure = 0.8

    world = bpy.data.worlds.new("Paper")
    world.use_nodes = True
    background = world.node_tree.nodes["Background"]
    background.inputs["Color"].default_value = hex_to_linear(PAPER)
    background.inputs["Strength"].default_value = 0.25
    scene.world = world

    camera = bpy.data.objects.new("Camera", bpy.data.cameras.new("Camera"))
    bpy.context.collection.objects.link(camera)
    scene.camera = camera


def feather_edges(path, margin=0.035):
    """Fade alpha to zero at the image border so no shadow is ever cut off hard."""
    image = bpy.data.images.load(path)
    width, height = image.size
    pixels = np.empty(width * height * 4, dtype=np.float32)
    image.pixels.foreach_get(pixels)
    pixels = pixels.reshape(height, width, 4)
    ramp_x = smoothstep(0, margin * width, np.minimum(np.arange(width), np.arange(width)[::-1]))
    ramp_y = smoothstep(0, margin * width, np.minimum(np.arange(height), np.arange(height)[::-1]))
    pixels[..., 3] *= np.outer(ramp_y, ramp_x)
    image.pixels.foreach_set(pixels.ravel())
    image.filepath_raw = path
    image.file_format = "PNG"
    image.save()
    bpy.data.images.remove(image)


def main():
    options = parse_args()
    reset_scene()
    configure_render(options["samples"], options["scale"])
    rig, parts = build_glasses()
    rest_on_table(rig, parts)
    add_ground(PAPER)
    os.makedirs(RENDER_DIR, exist_ok=True)
    setup_view("hero", parts)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(ART_DIR, "glasses.blend"))
    for name in options["views"]:
        path = setup_view(name, parts)
        bpy.context.scene.render.filepath = path
        bpy.ops.render.render(write_still=True)
        feather_edges(path)
        print(f"Rendered {path}")


if __name__ == "__main__":
    main()

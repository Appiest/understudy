"use client";

import { motion, type Variants } from "motion/react";
import { fadeReveal, strokeDraw } from "./primitives";

export const SCENE = { width: 1300, height: 600, panelWidth: 640, panelGap: 20, floor: 510 };

const FIGURE_SCALE = 0.85;
const HEAD_CENTER_OFFSET = 278;

export const HEAD_TOP_Y = SCENE.floor - (HEAD_CENTER_OFFSET + 40) * FIGURE_SCALE;

const FLOOR = SCENE.floor;
const SHOULDER_Y = FLOOR - 212;

type Pose = "rest" | "point" | "reach" | "counter";

type FigureProps = {
  x: number;
  shirt: string;
  skin: string;
  facing?: 1 | -1;
  pose?: Pose;
  apron?: boolean;
  badge?: boolean;
  glasses?: boolean;
  variants?: Variants;
};

function armEnd(pose: Pose, side: 1 | -1, facing: 1 | -1) {
  const leads = side === facing;
  const ends: Record<Pose, [number, number]> = {
    rest: [side * 50, FLOOR - 112],
    point: leads ? [side * 62, FLOOR - 340] : [side * 50, FLOOR - 112],
    reach: leads ? [side * 96, FLOOR - 250] : [side * 50, FLOOR - 112],
    counter: [side * 34, FLOOR - 128],
  };
  return ends[pose];
}

function Arm({ x, pose, side, facing, color }: { x: number; pose: Pose; side: 1 | -1; facing: 1 | -1; color: string }) {
  const [dx, y] = armEnd(pose, side, facing);
  const shoulderX = x + side * 36;
  const elbowX = shoulderX + (x + dx - shoulderX) * 0.5 + side * 6;
  const elbowY = SHOULDER_Y + (y - SHOULDER_Y) * 0.5;
  return (
    <path
      d={`M ${shoulderX} ${SHOULDER_Y} Q ${elbowX} ${elbowY} ${x + dx} ${y}`}
      fill="none"
      stroke={color}
      strokeWidth={24}
      strokeLinecap="round"
    />
  );
}

function Face({ x, glasses }: { x: number; glasses?: boolean }) {
  const eyeY = FLOOR - 276;
  if (glasses) {
    return (
      <g>
        <circle cx={x - 13} cy={eyeY} r={4} fill="var(--color-ink)" />
        <circle cx={x + 13} cy={eyeY} r={4} fill="var(--color-ink)" />
        <rect x={x - 32} y={eyeY - 12} width={28} height={23} rx={7} fill="none" stroke="var(--color-ocean)" strokeWidth={6} />
        <rect x={x + 4} y={eyeY - 12} width={28} height={23} rx={7} fill="none" stroke="var(--color-ocean)" strokeWidth={6} />
        <path d={`M ${x - 4} ${eyeY - 4} L ${x + 4} ${eyeY - 4}`} stroke="var(--color-ocean)" strokeWidth={6} />
        <circle cx={x + 26} cy={eyeY - 6} r={3} fill="var(--color-ocean-wash)" />
      </g>
    );
  }
  return (
    <g fill="var(--color-ink)">
      <circle cx={x - 13} cy={eyeY} r={4} />
      <circle cx={x + 13} cy={eyeY} r={4} />
    </g>
  );
}

export function Figure({ x, shirt, skin, facing = 1, pose = "rest", apron, badge, glasses, variants }: FigureProps) {
  const headY = FLOOR - HEAD_CENTER_OFFSET;
  return (
    <motion.g variants={variants} transform={`translate(${x} ${FLOOR}) scale(${FIGURE_SCALE}) translate(${-x} ${-FLOOR})`}>
      <rect x={x - 32} y={FLOOR - 104} width={26} height={104} rx={10} fill="var(--color-ink)" />
      <rect x={x + 6} y={FLOOR - 104} width={26} height={104} rx={10} fill="var(--color-ink)" />
      <Arm x={x} pose={pose} side={-1} facing={facing} color={shirt} />
      <Arm x={x} pose={pose} side={1} facing={facing} color={shirt} />
      <rect x={x - 44} y={FLOOR - 232} width={88} height={140} rx={34} fill={shirt} />
      {apron && <rect x={x - 30} y={FLOOR - 200} width={60} height={104} rx={10} fill="var(--color-ocean-deep)" />}
      {badge && <circle cx={x + 14} cy={FLOOR - 180} r={9} fill="var(--color-paper)" />}
      <circle cx={x} cy={headY} r={40} fill={skin} />
      <path d={`M ${x - 41} ${headY - 4} A 41 41 0 0 1 ${x + 41} ${headY - 4} Q ${x} ${headY - 26} ${x - 41} ${headY - 4} Z`} fill="var(--color-ink)" />
      <Face x={x} glasses={glasses} />
    </motion.g>
  );
}

const productRows = [
  ["var(--color-ocean-wash)", "var(--color-rival-wash)", "var(--color-paper)", "var(--color-ocean-wash)", "var(--color-rule)"],
  ["var(--color-paper)", "var(--color-ocean-wash)", "var(--color-ocean-wash)", "var(--color-rival-wash)", "var(--color-paper)"],
  ["var(--color-rival-wash)", "var(--color-rule)", "var(--color-paper)", "var(--color-paper)", "var(--color-ocean-wash)"],
];

const SHELF_TOP = FLOOR - 340;
const SHELF_SPACING = 100;

export function Shelf({ x, width }: { x: number; width: number }) {
  const productWidth = (width - 36) / 5;
  return (
    <g>
      <rect x={x} y={SHELF_TOP} width={width} height={FLOOR - SHELF_TOP} fill="var(--color-shelf)" />
      {productRows.map((row, rowIndex) => {
        const boardY = SHELF_TOP + SHELF_SPACING * (rowIndex + 1);
        return (
          <g key={boardY}>
            {row.map((fill, index) => (
              <rect key={index} x={x + 12 + index * (productWidth + 3)} y={boardY - 64} width={productWidth} height={64} rx={4} fill={fill} />
            ))}
            <rect x={x} y={boardY} width={width} height={10} fill="var(--color-ink-faint)" />
          </g>
        );
      })}
    </g>
  );
}

export function Counter({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y={FLOOR - 124} width={200} height={124} fill="var(--color-ink-muted)" />
      <rect x={x - 8} y={FLOOR - 132} width={216} height={14} fill="var(--color-ink)" />
      <rect x={x + 120} y={FLOOR - 184} width={66} height={44} rx={6} fill="var(--color-ink)" />
      <rect x={x + 148} y={FLOOR - 140} width={10} height={10} fill="var(--color-ink)" />
    </g>
  );
}

export function Floor({ x }: { x: number }) {
  return <rect x={x} y={FLOOR} width={SCENE.panelWidth} height={6} fill="var(--color-rule)" />;
}

export function LeaderLine({ from, to, tone, delay }: { from: [number, number]; to: [number, number]; tone: "pain" | "gain"; delay: number }) {
  const color = tone === "pain" ? "var(--color-rival)" : "var(--color-ocean)";
  return (
    <g>
      <motion.path d={`M ${from[0]} ${from[1]} L ${to[0]} ${to[1]}`} stroke={color} strokeWidth={3} strokeDasharray="2 8" strokeLinecap="round" variants={strokeDraw(delay, 0.6)} />
      <motion.circle cx={to[0]} cy={to[1]} r={9} fill={tone === "gain" ? color : "var(--color-paper-raised)"} stroke={color} strokeWidth={4} variants={fadeReveal(delay + 0.4)} />
    </g>
  );
}

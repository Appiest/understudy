"use client";

import { motion, type Variants } from "motion/react";
import { asset } from "@/lib/asset";

type View = "hero" | "side" | "front";

export function GlassesRender({ view, className, variants, alt = "" }: { view: View; className?: string; variants?: Variants; alt?: string }) {
  return (
    <motion.img
      src={asset(`/renders/glasses-${view}.png`)}
      alt={alt}
      draggable={false}
      variants={variants}
      className={`pointer-events-none select-none ${className ?? ""}`}
    />
  );
}

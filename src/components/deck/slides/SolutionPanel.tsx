"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { easeDrawn, exitTransition } from "@/lib/motion";

const panelFrame: Variants = {
  enter: { opacity: 0, x: 40 },
  present: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeDrawn } },
  exit: { opacity: 0, x: -20, transition: exitTransition },
};

export function SolutionPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="enter" animate="present" exit="exit" variants={panelFrame} className={`absolute inset-0 ${className}`}>
      {children}
    </motion.div>
  );
}

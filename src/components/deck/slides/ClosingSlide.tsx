"use client";

import type { Variants } from "motion/react";
import { team } from "@/content/config";
import { closing } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { GlassesRender } from "../GlassesRender";
import { MaskedLines, StepView } from "../primitives";

const glassesSettle: Variants = {
  enter: { opacity: 0, y: 60, scale: 0.94 },
  present: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.4, ease: easeDrawn, delay: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export function ClosingSlide() {
  return (
    <StepView className="flex flex-col items-center justify-center text-center">
      <h2 className="relative z-0 text-poster font-black">
        <MaskedLines lines={[team.productName]} delay={0.1} />
      </h2>
      <GlassesRender view="front" alt="" variants={glassesSettle} className="relative z-10 -mt-24 w-[1000px]" />
      <p className="mt-6 max-w-[1500px] text-title font-bold text-balance">
        <MaskedLines lines={closing.lines} delay={1.2} />
      </p>
    </StepView>
  );
}

"use client";

import { motion } from "motion/react";
import { team } from "@/content/config";
import { productDefinition } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { GlassesRender } from "../GlassesRender";
import { FootnoteMark, MaskedLines, StepView, fadeReveal } from "../primitives";
import { VoiceWave } from "../VoiceWave";

const glassesArrive = {
  enter: { opacity: 0, x: 60, rotate: 2 },
  present: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1.4, ease: easeDrawn, delay: 0.4 } },
};

function CoachingExchange() {
  const { question, answer } = productDefinition.coaching;
  return (
    <div className="flex flex-col items-start gap-4">
      <motion.p variants={fadeReveal(1.6, 16)} className="rounded-card bg-paper-raised px-7 py-4 text-body font-medium text-ink-muted shadow-lift">
        {question}
      </motion.p>
      <motion.div variants={fadeReveal(2.1, 16)} className="ml-16 flex flex-col gap-3 rounded-card bg-ocean px-7 py-5 text-paper shadow-float">
        <VoiceWave width={260} height={28} delay={2.2} strokeWidth={3} tone="paper" />
        <p className="text-point font-bold">{answer}</p>
      </motion.div>
    </div>
  );
}

export function ProductDefinitionSlide() {
  return (
    <StepView className="grid grid-cols-[860px_1fr] grid-rows-[auto_1fr] gap-x-gap">
      <h2 className="relative z-0 col-span-2 text-display font-black text-ocean">
        <MaskedLines lines={[team.productName]} delay={0.05} />
      </h2>
      <div className="relative z-10 flex flex-col justify-end gap-8">
        <motion.p variants={fadeReveal(0.5, 24)} className="text-lede font-bold">
          {productDefinition.definition}
        </motion.p>
        <motion.p variants={fadeReveal(0.8, 24)} className="text-body text-ink-muted">
          {productDefinition.audience}
          <FootnoteMark numbers={[1]} />
        </motion.p>
      </div>
      <div className="relative">
        <GlassesRender view="hero" variants={glassesArrive} className="absolute -top-32 -right-16 w-[1060px] max-w-none" />
        <div className="absolute right-0 bottom-0">
          <CoachingExchange />
        </div>
      </div>
    </StepView>
  );
}

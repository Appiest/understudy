"use client";

import { motion } from "motion/react";
import { tractionSlide } from "@/content/content";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

function InterviewCount() {
  const { count, label, detail } = tractionSlide.interviews;
  return (
    <motion.div variants={fadeReveal(0.3, 20)} className="flex flex-col gap-4">
      <p className="text-poster font-black text-ocean figures-tabular">{count}</p>
      <div>
        <p className="text-lede font-bold">{label}</p>
        <p className="mt-2 text-caption font-semibold text-ink-muted">{detail}</p>
      </div>
    </motion.div>
  );
}

function FindingCard({ finding, index }: { finding: (typeof tractionSlide.findings)[number]; index: number }) {
  return (
    <motion.li
      variants={fadeReveal(0.5 + index * 0.15, 20)}
      className="grid grid-cols-[460px_1fr] items-center gap-8 rounded-card bg-paper-raised px-10 py-7 shadow-lift"
    >
      <p className="whitespace-nowrap text-title font-extrabold text-ocean-deep figures-tabular">{finding.figure}</p>
      <p className="text-body font-semibold">{finding.label}</p>
    </motion.li>
  );
}

export function TractionSlide() {
  return (
    <StepView className="flex flex-col gap-12">
      <h2 className="max-w-[1500px] text-title font-extrabold">
        <MaskedLines lines={[tractionSlide.headline]} delay={0.05} />
      </h2>
      <div className="grid min-h-0 flex-1 grid-cols-[340px_1fr] items-center gap-gap">
        <InterviewCount />
        <ul className="flex flex-col gap-6">
          {tractionSlide.findings.map((finding, index) => (
            <FindingCard key={finding.figure} finding={finding} index={index} />
          ))}
        </ul>
      </div>
      <motion.p variants={fadeReveal(1.1, 12)} className="rounded-card bg-ocean-wash px-10 py-6 text-lede font-bold text-ocean-deep">
        {tractionSlide.ask}
      </motion.p>
    </StepView>
  );
}

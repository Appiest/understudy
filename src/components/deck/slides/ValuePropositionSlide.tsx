"use client";

import { motion } from "motion/react";
import { valueProposition, type ValuePropositionPart } from "@/content/content";
import { useIsPitch } from "../pitchMode";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

function fillClass(part: ValuePropositionPart) {
  return part.emphasis ? "text-title font-extrabold text-ocean-deep" : "text-lede font-semibold text-ink";
}

function PartRow({ part, index }: { part: ValuePropositionPart; index: number }) {
  return (
    <motion.div variants={fadeReveal(0.3 + index * 0.12, 20)} className="grid grid-cols-[300px_1fr] items-baseline gap-10">
      <dt className="text-lede font-medium text-ink-faint">{part.templateWord}</dt>
      <dd className={fillClass(part)}>{part.fill}</dd>
    </motion.div>
  );
}

function PitchClaims() {
  const claims = valueProposition.parts.filter((part) => part.emphasis);
  return (
    <ul className="flex flex-col gap-16">
      {claims.map((claim, index) => (
        <motion.li key={claim.fill} variants={fadeReveal(0.3 + index * 0.4, 20)} className="max-w-[1500px] text-headline font-extrabold text-ocean-deep first-letter:uppercase">
          {claim.fill}
        </motion.li>
      ))}
    </ul>
  );
}

export function ValuePropositionSlide() {
  if (useIsPitch()) {
    return (
      <StepView className="flex flex-col justify-between">
        <h2 className="text-title font-extrabold">
          <MaskedLines lines={[valueProposition.heading]} delay={0.05} />
        </h2>
        <PitchClaims />
      </StepView>
    );
  }
  return (
    <StepView className="flex flex-col justify-between">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[valueProposition.heading]} delay={0.05} />
      </h2>
      <dl className="flex flex-col gap-7">
        {valueProposition.parts.map((part, index) => (
          <PartRow key={part.fill} part={part} index={index} />
        ))}
      </dl>
    </StepView>
  );
}

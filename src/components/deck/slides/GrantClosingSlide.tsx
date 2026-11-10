"use client";

import { motion } from "motion/react";
import { team } from "@/content/config";
import { grantClosing } from "@/content/content";
import { MaskedLines, StepView, fadeReveal } from "../primitives";
import { VoiceWave } from "../VoiceWave";

function Recap() {
  return (
    <dl className="flex flex-col gap-5">
      {grantClosing.recap.map((item, index) => (
        <motion.div key={item.label} variants={fadeReveal(0.6 + index * 0.12, 16)} className="grid grid-cols-[300px_1fr] items-baseline gap-10">
          <dt className="text-lede font-semibold text-ink-muted">{item.label}</dt>
          <dd className="text-lede font-bold">{item.line}</dd>
        </motion.div>
      ))}
    </dl>
  );
}

function Signoff() {
  return (
    <div className="mt-auto flex items-end justify-between gap-gap">
      <motion.div variants={fadeReveal(1.1)} className="flex flex-col gap-4">
        <div className="-ml-2">
          <VoiceWave width={560} height={70} delay={1.2} fadeTowards="start" />
        </div>
        <p className="text-point font-bold">{grantClosing.tagline}</p>
      </motion.div>
      <motion.p variants={fadeReveal(1.3)} className="text-right text-caption text-ink-muted">
        {team.teamMembers.join(", ")}
      </motion.p>
    </div>
  );
}

export function GrantClosingSlide() {
  return (
    <StepView className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h2 className="max-w-[1500px] text-title font-extrabold">
          <MaskedLines lines={[grantClosing.headline]} delay={0.05} />
        </h2>
        <motion.p variants={fadeReveal(0.3)} className="max-w-[1500px] text-lede font-bold text-ocean-deep">
          {grantClosing.ask}
        </motion.p>
      </div>
      <Recap />
      <Signoff />
    </StepView>
  );
}

"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { visualValueProposition as vvp } from "@/content/content";
import { asset } from "@/lib/asset";
import { MaskedLines, StepView, fadeReveal } from "../primitives";
import { VoiceWave } from "../VoiceWave";

const labelTones = {
  pain: "text-rival",
  gain: "text-ocean",
};

type PhotoPanelProps = { photo: { src: string; alt: string }; label: string; tone: keyof typeof labelTones; delay: number; children?: ReactNode };

function PhotoPanel({ photo, label, tone, delay, children }: PhotoPanelProps) {
  return (
    <motion.figure variants={fadeReveal(delay, 24)} className="relative min-h-0 overflow-hidden rounded-card shadow-lift">
      <motion.img src={asset(photo.src)} alt={photo.alt} className="absolute inset-0 h-full w-full object-cover" />
      {children}
      <figcaption className={`absolute bottom-6 left-6 rounded-chip bg-paper px-6 py-2 text-point font-extrabold ${labelTones[tone]}`}>{label}</figcaption>
    </motion.figure>
  );
}

function VoiceExchange() {
  return (
    <div className="absolute inset-x-6 top-6 flex flex-col items-end gap-4">
      <motion.p variants={fadeReveal(1.2, 12)} className="rounded-card bg-paper px-6 py-3 text-point font-semibold shadow-lift">
        {vvp.with.question}
      </motion.p>
      <motion.div variants={fadeReveal(1.8, 12)} className="flex flex-col gap-2 rounded-card bg-ocean px-6 py-4 text-paper shadow-float">
        <VoiceWave width={260} height={26} delay={1.9} strokeWidth={4} tone="paper" />
        <p className="text-point font-bold">{vvp.with.answer}</p>
      </motion.div>
    </div>
  );
}

export function PhotoValueProposition() {
  return (
    <StepView className="flex flex-col gap-9">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[vvp.tagline]} delay={0.05} />
      </h2>
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-1 gap-8">
        <PhotoPanel photo={vvp.photos.today} label={vvp.without.label} tone="pain" delay={0.3} />
        <PhotoPanel photo={vvp.photos.with} label={vvp.with.label} tone="gain" delay={0.6}>
          <VoiceExchange />
        </PhotoPanel>
      </div>
    </StepView>
  );
}

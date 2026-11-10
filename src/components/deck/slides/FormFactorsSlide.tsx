"use client";

import { Eyeglasses, Microphone, Radio, type Icon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { formFactors } from "@/content/content";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

type IconName = typeof formFactors.primary.icon | (typeof formFactors.alternatives)[number]["icon"];
type Alternative = (typeof formFactors.alternatives)[number];

const optionIcons: Record<IconName, Icon> = {
  glasses: Eyeglasses,
  radio: Radio,
  mic: Microphone,
};

function PrimaryCard() {
  const { label, name, line, icon } = formFactors.primary;
  const PrimaryIcon = optionIcons[icon];
  return (
    <motion.div variants={fadeReveal(0.3, 24)} className="flex flex-col gap-10 rounded-card bg-paper-raised p-14 shadow-lift">
      <p className="text-body font-bold text-ocean">{label}</p>
      <PrimaryIcon size={180} weight="duotone" className="text-ocean" aria-hidden />
      <div className="flex flex-col gap-3">
        <p className="text-title font-extrabold">{name}</p>
        <p className="text-lede text-ink-muted">{line}</p>
      </div>
    </motion.div>
  );
}

function AlternativeCard({ option, index }: { option: Alternative; index: number }) {
  const OptionIcon = optionIcons[option.icon];
  return (
    <motion.li
      variants={fadeReveal(0.6 + index * 0.15, 20)}
      className="flex items-center gap-8 rounded-card px-10 py-8 text-ink-muted ring-2 ring-paper-sunken ring-inset"
    >
      <OptionIcon size={72} weight="duotone" className="shrink-0" aria-hidden />
      <div className="flex flex-col gap-2">
        <p className="text-point font-bold">{option.name}</p>
        <p className="text-body">{option.line}</p>
      </div>
    </motion.li>
  );
}

function Alternatives() {
  return (
    <div className="flex flex-col gap-5">
      <motion.p variants={fadeReveal(0.5)} className="text-body font-bold text-ink-muted">
        {formFactors.alternativesLabel}
      </motion.p>
      <ul className="flex flex-col gap-6">
        {formFactors.alternatives.map((option, index) => (
          <AlternativeCard key={option.name} option={option} index={index} />
        ))}
      </ul>
    </div>
  );
}

export function FormFactorsSlide() {
  return (
    <StepView className="flex flex-col gap-gap">
      <h2 className="max-w-[1500px] text-title font-extrabold">
        <MaskedLines lines={[formFactors.headline]} delay={0.05} />
      </h2>
      <div className="grid grid-cols-[1.25fr_1fr] items-center gap-gap">
        <PrimaryCard />
        <Alternatives />
      </div>
      <motion.p variants={fadeReveal(1)} className="text-lede font-bold text-ocean-deep">
        {formFactors.closing}
      </motion.p>
    </StepView>
  );
}

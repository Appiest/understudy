"use client";

import { Eyeglasses, Microphone, Radio, type Icon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { formFactors } from "@/content/content";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

const optionIcons: Record<(typeof formFactors.options)[number]["icon"], Icon> = {
  glasses: Eyeglasses,
  radio: Radio,
  mic: Microphone,
};

function OptionCard({ option, index }: { option: (typeof formFactors.options)[number]; index: number }) {
  const OptionIcon = optionIcons[option.icon];
  return (
    <motion.li variants={fadeReveal(0.3 + index * 0.15, 24)} className="flex flex-col gap-8 rounded-card bg-paper-raised p-12 shadow-lift">
      <OptionIcon size={120} weight="duotone" className="text-ocean" aria-hidden />
      <div className="flex flex-col gap-3">
        <p className="text-lede font-extrabold">{option.name}</p>
        <p className="text-body text-ink-muted">{option.line}</p>
      </div>
    </motion.li>
  );
}

export function FormFactorsSlide() {
  return (
    <StepView className="flex flex-col gap-gap">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[formFactors.headline]} delay={0.05} />
      </h2>
      <ul className="grid grid-cols-3 gap-8">
        {formFactors.options.map((option, index) => (
          <OptionCard key={option.name} option={option} index={index} />
        ))}
      </ul>
      <motion.p variants={fadeReveal(1)} className="text-lede font-bold text-ocean-deep">
        {formFactors.closing}
      </motion.p>
    </StepView>
  );
}

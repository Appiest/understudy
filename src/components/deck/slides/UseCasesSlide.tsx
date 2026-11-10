"use client";

import { motion } from "motion/react";
import { useCases } from "@/content/content";
import { asset } from "@/lib/asset";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

function UseCaseCard({ card, index }: { card: (typeof useCases.cards)[number]; index: number }) {
  return (
    <motion.figure variants={fadeReveal(0.3 + index * 0.12, 24)} className="flex min-h-0 flex-col gap-5">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-card shadow-lift">
        <motion.img
          src={asset(card.photo.src)}
          alt={card.photo.alt}
          draggable={false}
          className="absolute inset-0 h-full w-full origin-top object-cover"
          style={{ scale: "zoom" in card.photo ? card.photo.zoom : 1 }}
        />
      </div>
      <figcaption className="text-point font-extrabold">{card.caption}</figcaption>
    </motion.figure>
  );
}

export function UseCasesSlide() {
  return (
    <StepView className="flex flex-col gap-12">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[useCases.headline]} delay={0.05} />
      </h2>
      <div className="grid min-h-0 flex-1 grid-cols-4 gap-8">
        {useCases.cards.map((card, index) => (
          <UseCaseCard key={card.caption} card={card} index={index} />
        ))}
      </div>
    </StepView>
  );
}

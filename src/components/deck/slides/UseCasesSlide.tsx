"use client";

import { motion } from "motion/react";
import { useCases } from "@/content/content";
import { asset } from "@/lib/asset";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

function UseCaseCard({ card, index }: { card: (typeof useCases.cards)[number]; index: number }) {
  return (
    <motion.figure variants={fadeReveal(0.3 + index * 0.12, 24)} className="row-span-2 grid min-h-0 grid-rows-subgrid">
      <div className="relative min-h-0 overflow-hidden rounded-card shadow-lift">
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
      {/* Photos and captions share rows, so a caption that wraps to two lines doesn't make its photo shorter. */}
      <div className="grid min-h-0 flex-1 grid-cols-4 grid-rows-[minmax(0,1fr)_auto] gap-x-8 gap-y-5">
        {useCases.cards.map((card, index) => (
          <UseCaseCard key={card.caption} card={card} index={index} />
        ))}
      </div>
    </StepView>
  );
}

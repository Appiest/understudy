"use client";

import { motion } from "motion/react";
import { swot, type SwotItem, type SwotQuadrant } from "@/content/content";
import { FootnoteMark, StepView, fadeReveal, footnoteNumbers } from "../primitives";

const effectColor: Record<SwotQuadrant["effect"], string> = {
  helps: "text-ocean",
  hurts: "text-rival",
};

function Item({ item }: { item: SwotItem }) {
  return (
    <li>
      <p className="text-caption font-bold">
        {item.name}
        <FootnoteMark numbers={footnoteNumbers(swot.sources, item.sources)} />
      </p>
      <p className="mt-1 text-caption text-ink-muted">{item.detail}</p>
    </li>
  );
}

function Quadrant({ quadrant, index }: { quadrant: SwotQuadrant; index: number }) {
  return (
    <motion.section variants={fadeReveal(0.3 + index * 0.15, 20)} className="rounded-card bg-paper-raised px-9 py-6 shadow-lift">
      <h3 className={`text-point font-extrabold ${effectColor[quadrant.effect]}`}>{quadrant.name}</h3>
      <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-5">
        {quadrant.items.map((item) => (
          <Item key={item.name} item={item} />
        ))}
      </ul>
    </motion.section>
  );
}

function RowLabel({ label }: { label: string }) {
  return (
    <motion.p variants={fadeReveal(0.2)} className="rotate-180 self-center text-center text-caption font-semibold text-ink-muted [writing-mode:vertical-rl]">
      {label}
    </motion.p>
  );
}

export function SwotSlide() {
  const [strengths, weaknesses, opportunities, threats] = swot.quadrants;
  return (
    <StepView className="grid grid-cols-[40px_1fr_1fr] grid-rows-2 gap-x-6 gap-y-6">
      <h2 className="sr-only">{swot.heading}</h2>
      <RowLabel label={swot.rows[0]} />
      <Quadrant quadrant={strengths} index={0} />
      <Quadrant quadrant={weaknesses} index={1} />
      <RowLabel label={swot.rows[1]} />
      <Quadrant quadrant={opportunities} index={2} />
      <Quadrant quadrant={threats} index={3} />
    </StepView>
  );
}

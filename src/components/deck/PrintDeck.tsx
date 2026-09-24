"use client";

import { MotionGlobalConfig } from "motion/react";
import { SlideFooter } from "./SlideFooter";
import { slides } from "./slides";

MotionGlobalConfig.skipAnimations = true;

const pages = slides.flatMap((slide) =>
  (slide.printSteps ?? [slide.steps - 1]).map((step) => ({ slide, step })),
);

export function PrintDeck() {
  return (
    <main>
      {pages.map(({ slide, step }) => (
        <section
          key={`${slide.id}-${step}`}
          aria-label={`${slide.name}, part ${step + 1}`}
          className="stage relative overflow-hidden bg-paper not-last:break-after-page"
        >
          <slide.Content step={step} />
          <SlideFooter slide={slide} step={step} />
        </section>
      ))}
    </main>
  );
}

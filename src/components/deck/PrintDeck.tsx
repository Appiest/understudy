"use client";

import { MotionGlobalConfig } from "motion/react";
import { SlideFooter } from "./SlideFooter";
import { decks, type DeckId } from "./decks";

MotionGlobalConfig.skipAnimations = true;

function printedPages(deckId: DeckId) {
  return decks[deckId].slides.flatMap((slide) => (slide.printSteps ?? [slide.steps - 1]).map((step) => ({ slide, step })));
}

export function PrintDeck({ deckId }: { deckId: DeckId }) {
  const pages = printedPages(deckId);
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

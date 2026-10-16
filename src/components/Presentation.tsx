"use client";

import { guideFor } from "@/content/guides";
import { Deck } from "./deck/Deck";
import { decks, type DeckId } from "./deck/decks";
import { FactsPage } from "./facts/FactsPage";
import { GuidePage } from "./guide/GuidePage";
import { clampSlideNumber } from "./PageNav";
import { useHashRoute } from "./useHashRoute";

function guideForSlide(deckId: DeckId, slideNumber: number) {
  const slides = decks[deckId].slides;
  return guideFor(slides[clampSlideNumber(slideNumber, slides.length) - 1].id);
}

export function Presentation({ deckId }: { deckId: DeckId }) {
  const route = useHashRoute();
  const guide = route.view === "guide" ? guideForSlide(deckId, route.slideNumber) : undefined;
  if (guide) return <GuidePage key={route.slideNumber} deckId={deckId} slideNumber={route.slideNumber} guide={guide} />;
  if (route.view !== "deck") return <FactsPage deckId={deckId} slideNumber={route.slideNumber} />;
  return <Deck deckId={deckId} />;
}

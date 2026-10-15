"use client";

import { Deck } from "./deck/Deck";
import type { DeckId } from "./deck/decks";
import { FactsPage } from "./facts/FactsPage";
import { useHashRoute } from "./useHashRoute";

export function Presentation({ deckId }: { deckId: DeckId }) {
  const route = useHashRoute();
  if (route.view === "facts") return <FactsPage deckId={deckId} slideNumber={route.slideNumber} />;
  return <Deck deckId={deckId} />;
}

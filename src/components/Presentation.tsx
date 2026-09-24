"use client";

import { Deck } from "./deck/Deck";
import { FactsPage } from "./facts/FactsPage";
import { useHashRoute } from "./useHashRoute";

export function Presentation() {
  const route = useHashRoute();
  if (route.view === "facts") return <FactsPage slideNumber={route.slideNumber} />;
  return <Deck />;
}

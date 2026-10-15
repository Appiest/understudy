import type { Metadata } from "next";
import { Presentation } from "@/components/Presentation";
import { decks } from "@/components/deck/decks";

export const metadata: Metadata = {
  title: decks.valueProposition.title,
};

export default function ValuePropositionPage() {
  return <Presentation deckId="valueProposition" />;
}

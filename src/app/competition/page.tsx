import type { Metadata } from "next";
import { Presentation } from "@/components/Presentation";
import { decks } from "@/components/deck/decks";

export const metadata: Metadata = {
  title: decks.competition.title,
};

export default function CompetitionPage() {
  return <Presentation deckId="competition" />;
}

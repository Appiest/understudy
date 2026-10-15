import type { Metadata } from "next";
import { PrintDeck } from "@/components/deck/PrintDeck";
import { decks } from "@/components/deck/decks";

export const metadata: Metadata = {
  title: `${decks.competition.title} for print`,
};

export default function CompetitionPrintPage() {
  return <PrintDeck deckId="competition" />;
}

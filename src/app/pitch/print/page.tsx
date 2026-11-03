import type { Metadata } from "next";
import { PrintDeck } from "@/components/deck/PrintDeck";
import { decks } from "@/components/deck/decks";

export const metadata: Metadata = {
  title: `${decks.finalPitch.title} for print`,
};

export default function PitchPrintPage() {
  return <PrintDeck deckId="finalPitch" />;
}

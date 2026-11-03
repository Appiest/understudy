import type { Metadata } from "next";
import { Presentation } from "@/components/Presentation";
import { decks } from "@/components/deck/decks";

export const metadata: Metadata = {
  title: decks.finalPitch.title,
};

export default function PitchPage() {
  return <Presentation deckId="finalPitch" />;
}

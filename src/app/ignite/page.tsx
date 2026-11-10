import type { Metadata } from "next";
import { Presentation } from "@/components/Presentation";
import { decks } from "@/components/deck/decks";

export const metadata: Metadata = {
  title: decks.ignite.title,
};

export default function IgnitePage() {
  return <Presentation deckId="ignite" />;
}

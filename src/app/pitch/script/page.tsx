import type { Metadata } from "next";
import { pitchSlides } from "@/components/deck/pitchSlides";
import { decks } from "@/components/deck/decks";
import { ScriptPage } from "@/components/script/ScriptPage";

export const metadata: Metadata = {
  title: `${decks.finalPitch.title} script`,
};

export default function PitchScriptPage() {
  return <ScriptPage slides={pitchSlides} />;
}

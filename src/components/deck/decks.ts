import { competitionSlides } from "./competitionSlides";
import { igniteSlides } from "./igniteSlides";
import { pitchSlides } from "./pitchSlides";
import { slides, type SlideDefinition } from "./slides";
import { valuePropositionSlides } from "./valuePropositionSlides";

export type DeckDefinition = {
  title: string;
  path: string;
  slides: SlideDefinition[];
};

export const decks = {
  pitch: { title: "Understudy", path: "", slides },
  competition: { title: "Understudy competitive analysis", path: "/competition", slides: competitionSlides },
  valueProposition: { title: "Understudy value proposition", path: "/value-proposition", slides: valuePropositionSlides },
  finalPitch: { title: "Understudy final pitch", path: "/pitch", slides: pitchSlides },
  ignite: { title: "Understudy grant submission", path: "/ignite", slides: igniteSlides },
} satisfies Record<string, DeckDefinition>;

export type DeckId = keyof typeof decks;

export function printPath(deck: DeckDefinition) {
  return `${deck.path}/print`;
}

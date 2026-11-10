import { competitionSlides } from "./competitionSlides";
import { HeadlineOverride } from "./headlineOverride";
import { slides, type SlideDefinition, type SlideProps } from "./slides";
import { storySlides } from "./storySlides";
import { valuePropositionSlides } from "./valuePropositionSlides";

const existingSlides = [...slides, ...competitionSlides, ...valuePropositionSlides, ...storySlides];

function existingSlide(id: string) {
  const slide = existingSlides.find((candidate) => candidate.id === id);
  if (!slide) throw new Error(`No existing slide with id "${id}"`);
  return slide;
}

/** `beats` picks which of the original beats to show, in order. `headlines` gives one headline per shown beat. */
export type ReuseOptions = { beats?: number[]; name?: string; headlines?: string[][] };

function withSelectedBeats(slide: SlideDefinition, beats: number[]): SlideDefinition {
  const OriginalContent = slide.Content;
  function SelectedBeats({ step }: SlideProps) {
    return <OriginalContent step={beats[step]} />;
  }
  return {
    ...slide,
    steps: beats.length,
    printSteps: beats.map((_, index) => index),
    sourcesByStep: beats.map((beat) => slide.sourcesByStep[Math.min(beat, slide.sourcesByStep.length - 1)]),
    Content: SelectedBeats,
  };
}

function withHeadlines(slide: SlideDefinition, headlines: string[][]): SlideDefinition {
  const OriginalContent = slide.Content;
  function HeadlinedBeat({ step }: SlideProps) {
    return (
      <HeadlineOverride lines={headlines[step]}>
        <OriginalContent step={step} />
      </HeadlineOverride>
    );
  }
  return { ...slide, Content: HeadlinedBeat };
}

export function reuse(id: string, notes: string[], { beats, name, headlines }: ReuseOptions = {}): SlideDefinition {
  const slide = existingSlide(id);
  const original = { ...slide, name: name ?? slide.name, notes };
  const selected = beats ? withSelectedBeats(original, beats) : original;
  return headlines ? withHeadlines(selected, headlines) : selected;
}

import { customerProfile, proFormaCosts, proFormaRevenue, talinStory } from "@/content/content";
import { pitchScript, speakerSections } from "@/content/pitchScript";
import { competitionSlides } from "./competitionSlides";
import { PitchMode } from "./pitchMode";
import { slides, type SlideDefinition, type SlideProps } from "./slides";
import { ClosingSlide } from "./slides/ClosingSlide";
import { CustomerProfileSlide } from "./slides/CustomerProfileSlide";
import { ProFormaCostsSlide } from "./slides/ProFormaCostsSlide";
import { ProFormaRevenueSlide } from "./slides/ProFormaRevenueSlide";
import { TalinStorySlide } from "./slides/TalinStorySlide";
import { valuePropositionSlides } from "./valuePropositionSlides";

const existingSlides = [...slides, ...competitionSlides, ...valuePropositionSlides];

function existingSlide(id: string) {
  const slide = existingSlides.find((candidate) => candidate.id === id);
  if (!slide) throw new Error(`No existing slide with id "${id}"`);
  return slide;
}

type ReuseOptions = { beats?: number[]; name?: string };

function reuse(id: string, notes: string[], { beats, name }: ReuseOptions = {}): SlideDefinition {
  const slide = existingSlide(id);
  const original = { ...slide, name: name ?? slide.name, notes };
  if (!beats) return original;
  const selectedBeats = beats;
  const OriginalContent = original.Content;
  function SelectedBeats({ step }: SlideProps) {
    return <OriginalContent step={selectedBeats[step]} />;
  }
  return {
    ...original,
    steps: selectedBeats.length,
    printSteps: selectedBeats.map((_, index) => index),
    sourcesByStep: selectedBeats.map((beat) => original.sourcesByStep[Math.min(beat, original.sourcesByStep.length - 1)]),
    Content: SelectedBeats,
  };
}

const scriptedSlides: SlideDefinition[] = [
  reuse("title", pitchScript.title, { beats: [0], name: "Vision" }),
  {
    id: "talin-story",
    name: "Talin Market",
    steps: 2,
    printSteps: [0, 1],
    sourcesByStep: talinStory.sources,
    notes: pitchScript.talinStory,
    Content: TalinStorySlide,
  },
  { ...reuse("challenge", pitchScript.challenge, { beats: [0, 1], name: "The problem" }), sourcesByStep: [["blsJolts"], ["groceryDive"]] },
  reuse("canvas", pitchScript.canvas, { beats: [0], name: "Strategy: our Blue Ocean value curve" }),
  {
    id: "customer-profile",
    name: "Customer profile",
    steps: 1,
    sourcesByStep: [customerProfile.sources],
    notes: pitchScript.customerProfile,
    Content: CustomerProfileSlide,
  },
  { ...reuse("visual-value-proposition", pitchScript.visualValueProposition), footnotes: false, sourcesByStep: [[]] },
  reuse("solution", pitchScript.solution, { beats: [0, 1, 2] }),
  reuse("value-proposition", pitchScript.valueProposition),
  reuse("market", pitchScript.market),
  { ...reuse("competitor-map", pitchScript.competitorMap), footnotes: false },
  reuse("comparison", pitchScript.comparison),
  reuse("swot", pitchScript.swot),
  {
    id: "pro-forma-revenue",
    name: "Pro forma: stores and revenue",
    steps: 1,
    sourcesByStep: [proFormaRevenue.sources],
    notes: pitchScript.proFormaRevenue,
    Content: ProFormaRevenueSlide,
  },
  {
    id: "pro-forma-costs",
    name: "Pro forma: spending and profit",
    steps: 1,
    sourcesByStep: [proFormaCosts.sources],
    notes: pitchScript.proFormaCosts,
    Content: ProFormaCostsSlide,
  },
  reuse("use-of-funds", pitchScript.useOfFunds),
  {
    id: "closing",
    name: "Closing",
    steps: 1,
    sourcesByStep: [[]],
    notes: pitchScript.closing,
    Content: ClosingSlide,
  },
];

function speakerFor(slideNumber: number) {
  return speakerSections.find((section) => slideNumber >= section.firstSlide && slideNumber <= section.lastSlide)?.speaker;
}

function inPitchMode(slide: SlideDefinition): SlideDefinition {
  const SlideContent = slide.Content;
  function PitchContent(props: SlideProps) {
    return (
      <PitchMode>
        <SlideContent {...props} />
      </PitchMode>
    );
  }
  return { ...slide, Content: PitchContent };
}

export const pitchSlides = scriptedSlides.map((slide, index) => ({ ...inPitchMode(slide), speaker: speakerFor(index + 1) }));

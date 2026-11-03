import { customerProfile, proFormaCosts, proFormaRevenue } from "@/content/content";
import { pitchScript } from "@/content/pitchScript";
import { competitionSlides } from "./competitionSlides";
import { slides, type SlideDefinition, type SlideProps } from "./slides";
import { CustomerProfileSlide } from "./slides/CustomerProfileSlide";
import { ProFormaCostsSlide } from "./slides/ProFormaCostsSlide";
import { ProFormaRevenueSlide } from "./slides/ProFormaRevenueSlide";
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

export const pitchSlides: SlideDefinition[] = [
  reuse("title", pitchScript.title, { beats: [0], name: "Vision" }),
  reuse("challenge", pitchScript.challenge, { beats: [0, 1], name: "The problem" }),
  reuse("canvas", pitchScript.canvas, { beats: [0], name: "Strategy: our Blue Ocean value curve" }),
  {
    id: "customer-profile",
    name: "Customer profile",
    steps: 1,
    sourcesByStep: [customerProfile.sources],
    notes: pitchScript.customerProfile,
    Content: CustomerProfileSlide,
  },
  reuse("visual-value-proposition", pitchScript.visualValueProposition),
  reuse("solution", pitchScript.solution, { beats: [0, 1, 2] }),
  reuse("value-proposition", pitchScript.valueProposition),
  reuse("market", pitchScript.market),
  reuse("competitor-map", pitchScript.competitorMap),
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
];

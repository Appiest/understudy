import { pitchScript, speakerSections } from "@/content/pitchScript";
import { PitchMode } from "./pitchMode";
import { reuse } from "./reuseSlide";
import type { SlideDefinition, SlideProps } from "./slides";

const scriptedSlides: SlideDefinition[] = [
  reuse("title", pitchScript.title, { beats: [0], name: "Vision" }),
  reuse("talin-story", pitchScript.talinStory),
  { ...reuse("challenge", pitchScript.challenge, { beats: [0, 1], name: "The problem" }), sourcesByStep: [["blsJolts"], ["groceryDive"]] },
  reuse("canvas", pitchScript.canvas, { beats: [0], name: "Strategy: our Blue Ocean value curve" }),
  reuse("customer-profile", pitchScript.customerProfile),
  { ...reuse("visual-value-proposition", pitchScript.visualValueProposition), footnotes: false, sourcesByStep: [[]] },
  { ...reuse("solution", pitchScript.solution, { beats: [0, 1, 2] }), sourcesByStep: [[], [], ["metaGlassesPrices"]] },
  reuse("value-proposition", pitchScript.valueProposition),
  reuse("market", pitchScript.market),
  { ...reuse("competitor-map", pitchScript.competitorMap), footnotes: false },
  reuse("comparison", pitchScript.comparison),
  reuse("pro-forma-revenue", pitchScript.proFormaRevenue),
  reuse("pro-forma-costs", pitchScript.proFormaCosts),
  reuse("use-of-funds", pitchScript.useOfFunds),
  reuse("closing", pitchScript.closing),
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

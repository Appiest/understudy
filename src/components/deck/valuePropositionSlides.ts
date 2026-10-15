import { valueProposition, visualValueProposition } from "@/content/content";
import type { SlideDefinition } from "./slides";
import { ValuePropositionSlide } from "./slides/ValuePropositionSlide";
import { VisualValuePropositionSlide } from "./slides/VisualValuePropositionSlide";

export const valuePropositionSlides: SlideDefinition[] = [
  {
    id: "value-proposition",
    name: "Value proposition",
    steps: 1,
    sourcesByStep: [["mooreChasm"]],
    notes: valueProposition.notes,
    Content: ValuePropositionSlide,
  },
  {
    id: "visual-value-proposition",
    name: "Visual value proposition",
    steps: 1,
    footnotes: true,
    sourcesByStep: [[visualValueProposition.hardwareSource]],
    notes: visualValueProposition.notes,
    Content: VisualValuePropositionSlide,
  },
];

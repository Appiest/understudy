import { chartSources, comparisonChart, competitorMap, competitorSources, productDefinition, swot } from "@/content/content";
import type { SlideDefinition } from "./slides";
import { ComparisonChartSlide } from "./slides/ComparisonChartSlide";
import { CompetitorMapSlide } from "./slides/CompetitorMapSlide";
import { ProductDefinitionSlide } from "./slides/ProductDefinitionSlide";
import { SwotSlide } from "./slides/SwotSlide";

export const competitionSlides: SlideDefinition[] = [
  {
    id: "definition",
    name: "Product definition",
    steps: 1,
    footnotes: true,
    sourcesByStep: [[productDefinition.audienceSource]],
    notes: productDefinition.notes,
    Content: ProductDefinitionSlide,
  },
  {
    id: "swot",
    name: "SWOT analysis",
    steps: 1,
    footnotes: true,
    sourcesByStep: [swot.sources],
    notes: swot.notes,
    Content: SwotSlide,
  },
  {
    id: "competitor-map",
    name: "Competitive landscape",
    steps: 1,
    footnotes: true,
    sourcesByStep: [competitorSources],
    notes: competitorMap.notes,
    Content: CompetitorMapSlide,
  },
  {
    id: "comparison",
    name: "Comparison chart",
    steps: 1,
    footnotes: true,
    sourcesByStep: [chartSources],
    notes: comparisonChart.notes,
    Content: ComparisonChartSlide,
  },
];

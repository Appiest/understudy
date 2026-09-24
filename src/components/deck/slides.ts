import type { ComponentType } from "react";
import { appendix, canvas, drivers, landscape, mindMap, solution, title, turnover } from "@/content/content";
import type { SourceId } from "@/content/sources";
import { CanvasSlide } from "./slides/CanvasSlide";
import { ChallengeSlide } from "./slides/ChallengeSlide";
import { DriversSlide } from "./slides/DriversSlide";
import { LandscapeSlide } from "./slides/LandscapeSlide";
import { MindMapSlide } from "./slides/MindMapSlide";
import { SolutionSlide } from "./slides/SolutionSlide";
import { SourcesSlide } from "./slides/SourcesSlide";
import { TitleSlide } from "./slides/TitleSlide";

export type SlideProps = { step: number };

export type SlideDefinition = {
  id: string;
  name: string;
  steps: number;
  printSteps?: number[];
  sourcesByStep: SourceId[][];
  notes: string[];
  Content: ComponentType<SlideProps>;
};

export const slides: SlideDefinition[] = [
  {
    id: "title",
    name: "Title and our rules against solution jumping",
    steps: 2,
    printSteps: [0, 1],
    sourcesByStep: [[]],
    notes: title.notes,
    Content: TitleSlide,
  },
  {
    id: "challenge",
    name: "The challenge and the evidence",
    steps: 4,
    printSteps: [0, 1, 2, 3],
    sourcesByStep: [["blsJolts"], ["groceryDive", "strivrWalmart"], ["kimMauborgne"], ["kimMauborgne"]],
    notes: turnover.notes,
    Content: ChallengeSlide,
  },
  {
    id: "drivers",
    name: "Exponential drivers",
    steps: 3,
    printSteps: [0, 1, 2],
    sourcesByStep: [["metaLiveAi"], ["idcTracker", "essilorResults", "metaSalesHistory", "idcXr2025"], ["hololensEnd", "armyAnduril", "metaForWork", "metaQ4Call", "googleWarbyParker", "appleGlassesReport", "amazonGlasses", "idcTraining"]],
    notes: drivers.notes,
    Content: DriversSlide,
  },
  {
    id: "solution",
    name: "The solution",
    steps: 5,
    printSteps: [0, 1, 2, 3, 4],
    sourcesByStep: [[], [], [], ["metaGlassesPrices", "retrocausal", "mentra"], ["recordingConsent", "ftcRiteAid", "metaGlassesLawsuit", "wearableSurvey", "connecticutMonitoring"]],
    notes: solution.notes,
    Content: SolutionSlide,
  },
  {
    id: "canvas",
    name: "Blue Ocean value map",
    steps: 2,
    printSteps: [0, 1],
    sourcesByStep: [["kimMauborgne"], ["kimMauborgne", "metaGlassesPrices", "hololensPrice"]],
    notes: canvas.notes,
    Content: CanvasSlide,
  },
  {
    id: "landscape",
    name: "Competitive landscape",
    steps: 1,
    sourcesByStep: [["strivrWalmart", "walmartVr", "yoobic", "viture", "retrocausal", "airwave", "augmentir"]],
    notes: landscape.notes,
    Content: LandscapeSlide,
  },
  {
    id: "mind-map",
    name: "Mind map of the problem space",
    steps: 1,
    sourcesByStep: [[]],
    notes: mindMap.notes,
    Content: MindMapSlide,
  },
  {
    id: "sources",
    name: "Sources",
    steps: 2,
    printSteps: [0, 1],
    sourcesByStep: [[]],
    notes: appendix.notes,
    Content: SourcesSlide,
  },
];

export function sourcesForStep(slide: SlideDefinition, step: number) {
  return slide.sourcesByStep[Math.min(step, slide.sourcesByStep.length - 1)];
}

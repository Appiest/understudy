import { customerProfile, proFormaCosts, proFormaRevenue, talinStory } from "@/content/content";
import { pitchScript } from "@/content/pitchScript";
import type { SlideDefinition } from "./slides";
import { ClosingSlide } from "./slides/ClosingSlide";
import { CustomerProfileSlide } from "./slides/CustomerProfileSlide";
import { ProFormaCostsSlide } from "./slides/ProFormaCostsSlide";
import { ProFormaRevenueSlide } from "./slides/ProFormaRevenueSlide";
import { TalinStorySlide } from "./slides/TalinStorySlide";

/** Slides first written for the final pitch, which later decks reuse. */
export const storySlides: SlideDefinition[] = [
  {
    id: "talin-story",
    name: "Talin Market",
    steps: 2,
    printSteps: [0, 1],
    sourcesByStep: talinStory.sources,
    notes: pitchScript.talinStory,
    Content: TalinStorySlide,
  },
  {
    id: "customer-profile",
    name: "Customer profile",
    steps: 1,
    sourcesByStep: [customerProfile.sources],
    notes: pitchScript.customerProfile,
    Content: CustomerProfileSlide,
  },
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
  {
    id: "closing",
    name: "Closing",
    steps: 1,
    sourcesByStep: [[]],
    notes: pitchScript.closing,
    Content: ClosingSlide,
  },
];

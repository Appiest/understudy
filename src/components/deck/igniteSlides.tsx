import { appendix, canvas, formFactors, grantClosing, grantFunds, ignite, igniteAppendix, useCases, market, title, tractionSlide, turnover, visualValueProposition } from "@/content/content";
import { pitchScript } from "@/content/pitchScript";
import { BriefMode } from "./pitchMode";
import { reuse } from "./reuseSlide";
import type { SlideDefinition, SlideProps } from "./slides";
import { AppendixDividerSlide } from "./slides/AppendixDividerSlide";
import { FormFactorsSlide } from "./slides/FormFactorsSlide";
import { GrantClosingSlide } from "./slides/GrantClosingSlide";
import { GrantFundsSlide } from "./slides/GrantFundsSlide";
import { TractionSlide } from "./slides/TractionSlide";
import { UseCasesSlide } from "./slides/UseCasesSlide";

const { headlines } = ignite;

/** Puts a sentence in front of that beat's notes. */
function withLead(notes: string[], beat: number, lead: string) {
  return notes.map((note, index) => (index === beat ? `${lead} ${note}` : note));
}

/** Adds the supporting text the brief slide leaves out to the end of that beat's notes. */
function withDetail(notes: string[], beat: number, detail: string[]) {
  return notes.map((note, index) => (index === beat ? [note, "More detail:", ...detail].join(" ") : note));
}

const movedDetail = {
  title: [title.subtitle],
  canvas: [`${canvas.estimateLabel}.`],
  cost: [`“${turnover.quote.text}” ${turnover.quote.speaker}, ${turnover.quote.role}.`],
  visualValueProposition: [visualValueProposition.description, `${visualValueProposition.hardwareNote}.`],
  market: [...market.rings.map((ring) => `${ring.acronym}: ${ring.covers}.`), market.priceNote],
};

function inBriefMode(slide: SlideDefinition): SlideDefinition {
  const SlideContent = slide.Content;
  function BriefContent(props: SlideProps) {
    return (
      <BriefMode>
        <SlideContent {...props} />
      </BriefMode>
    );
  }
  return { ...slide, Content: BriefContent };
}

const mainSlides: SlideDefinition[] = [
  reuse("title", withDetail(pitchScript.title, 0, movedDetail.title), { beats: [0], name: "Vision" }),
  reuse("talin-story", pitchScript.talinStory, { headlines: headlines.talinStory }),
  {
    ...reuse("challenge", withDetail(pitchScript.challenge, 1, movedDetail.cost), { beats: [0, 1], name: "The problem", headlines: headlines.challenge }),
    sourcesByStep: [["blsJolts"], ["groceryDive"]],
  },
  reuse("canvas", withDetail(pitchScript.canvas, 0, movedDetail.canvas), { beats: [0], name: "Our Blue Ocean value curve", headlines: [headlines.canvas] }),
  reuse("customer-profile", pitchScript.customerProfile, { headlines: [headlines.customerProfile] }),
  reuse("visual-value-proposition", withDetail(pitchScript.visualValueProposition, 0, movedDetail.visualValueProposition), {
    headlines: [headlines.visualValueProposition],
  }),
  reuse("solution", withLead(pitchScript.solution, 0, `${headlines.solution[0][0]}.`), { beats: [0, 1, 2], headlines: headlines.solution }),
  reuse("value-proposition", pitchScript.valueProposition, { headlines: [headlines.valueProposition] }),
  reuse("market", withDetail(pitchScript.market, 0, movedDetail.market)),
  reuse("competitor-map", pitchScript.competitorMap),
  reuse("comparison", pitchScript.comparison),
  { id: "traction", name: "Traction", steps: 1, sourcesByStep: [tractionSlide.sources], notes: tractionSlide.notes, Content: TractionSlide },
  {
    id: "use-cases",
    name: "Use cases",
    steps: 1,
    sourcesByStep: [useCases.sources],
    footerNote: useCases.footerNote,
    notes: useCases.notes,
    Content: UseCasesSlide,
  },
  { id: "form-factors", name: "Form factors", steps: 1, sourcesByStep: [[]], notes: formFactors.notes, Content: FormFactorsSlide },
  {
    id: "grant-funds",
    name: "Use of funds",
    steps: 1,
    sourcesByStep: [[]],
    footerNote: grantFunds.footerNote,
    notes: grantFunds.notes,
    Content: GrantFundsSlide,
  },
  {
    id: "grant-closing",
    name: "Closing",
    steps: 1,
    sourcesByStep: [grantClosing.sources],
    notes: grantClosing.notes,
    Content: GrantClosingSlide,
  },
];

const appendixSlides: SlideDefinition[] = [
  { id: "appendix", name: "Appendix", steps: 1, sourcesByStep: [[]], notes: igniteAppendix.notes, Content: AppendixDividerSlide },
  {
    ...reuse("pro-forma-revenue", pitchScript.proFormaRevenue, { name: "Appendix: pro forma stores and revenue" }),
    footerLead: igniteAppendix.proFormaNote,
  },
  {
    ...reuse("pro-forma-costs", pitchScript.proFormaCosts, { name: "Appendix: pro forma spending and profit" }),
    footerLead: igniteAppendix.proFormaNote,
  },
  reuse("sources", appendix.notes, { name: "Appendix: sources" }),
];

/** The grant deck. It is read without a presenter, so every beat states its point and keeps its supporting text short. */
export const igniteSlides: SlideDefinition[] = [...mainSlides.map(inBriefMode), ...appendixSlides];

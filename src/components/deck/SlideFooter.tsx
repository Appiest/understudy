import { rubricNames, type Rubric } from "@/content/content";
import { sources } from "@/content/sources";
import { mainSlideCount, sourcesForStep, type SlideDefinition } from "./slides";

function Citations({ slide, step }: { slide: SlideDefinition; step: number }) {
  const cited = sourcesForStep(slide, step);
  if (cited.length === 0) return <span />;
  return (
    <p className="max-w-[1100px] text-fineprint text-ink-muted">
      Source{cited.length > 1 ? "s" : ""}: {cited.map((id) => sources[id].cite).join("; ")}
    </p>
  );
}

function ProgressLine({ index, step, slide }: { index: number; step: number; slide: SlideDefinition }) {
  const completed = Math.min((index + (step + 1) / slide.steps) / mainSlideCount, 1);
  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-paper-sunken">
      <div className="h-full origin-left bg-ocean transition-[scale] duration-500 ease-(--ease-drawn)" style={{ scale: `${completed} 1` }} />
    </div>
  );
}

function SlideNumber({ index }: { index: number }) {
  if (index >= mainSlideCount) return <span className="text-ink-muted">Appendix</span>;
  return (
    <span className="figures-tabular">
      {index + 1}
      <span className="text-ink-faint"> / {mainSlideCount}</span>
    </span>
  );
}

function RubricTag({ rubric }: { rubric?: Rubric[] }) {
  if (!rubric) return null;
  if (rubric.length > 1) {
    const letters = rubric.map((item) => `(${item})`);
    return <span className="text-ink-muted">Supports rubric {letters.slice(0, -1).join(", ")} and {letters.at(-1)}</span>;
  }
  return (
    <span className="text-ink-muted">
      Rubric ({rubric[0]}) <span className="font-normal">{rubricNames[rubric[0]]}</span>
    </span>
  );
}

export function SlideFooter({ slide, index, step }: { slide: SlideDefinition; index: number; step: number }) {
  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 flex h-(--spacing-footer) items-center justify-between gap-gap px-stage-x pb-2">
      <Citations slide={slide} step={step} />
      <div className="flex shrink-0 items-baseline gap-gap-sm text-fineprint font-semibold">
        <RubricTag rubric={slide.rubric} />
        <SlideNumber index={index} />
      </div>
      <ProgressLine index={index} step={step} slide={slide} />
    </footer>
  );
}

import { rubricNames, type Rubric } from "@/content/content";
import { sources } from "@/content/sources";
import { sourcesForStep, type SlideDefinition } from "./slides";

function Citations({ slide, step }: { slide: SlideDefinition; step: number }) {
  const cited = sourcesForStep(slide, step);
  if (cited.length === 0) return <span />;
  return (
    <p className="max-w-[1100px] text-fineprint text-ink-muted">
      Source{cited.length > 1 ? "s" : ""}: {cited.map((id) => sources[id].cite).join("; ")}
    </p>
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

export function SlideFooter({ slide, step }: { slide: SlideDefinition; step: number }) {
  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 flex h-(--spacing-footer) items-center justify-between gap-gap px-stage-x pb-2">
      <Citations slide={slide} step={step} />
      <p className="shrink-0 text-fineprint font-semibold">
        <RubricTag rubric={slide.rubric} />
      </p>
    </footer>
  );
}

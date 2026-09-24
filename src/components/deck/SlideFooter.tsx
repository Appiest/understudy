import { sources } from "@/content/sources";
import { sourcesForStep, type SlideDefinition } from "./slides";

function Citations({ slide, step }: { slide: SlideDefinition; step: number }) {
  const cited = sourcesForStep(slide, step);
  if (cited.length === 0) return null;
  return (
    <p className="max-w-[1100px] text-fineprint text-ink-muted">
      Source{cited.length > 1 ? "s" : ""}: {cited.map((id) => sources[id].cite).join("; ")}
    </p>
  );
}

function BeatLabel({ slideNumber, step }: { slideNumber: number; step: number }) {
  return (
    <p className="ml-auto shrink-0 text-fineprint text-ink-faint figures-tabular">
      Slide {slideNumber}, beat {step + 1}
    </p>
  );
}

type SlideFooterProps = { slide: SlideDefinition; step: number; slideNumber?: number };

export function SlideFooter({ slide, step, slideNumber }: SlideFooterProps) {
  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 flex h-(--spacing-footer) items-center gap-gap px-stage-x pb-2">
      <Citations slide={slide} step={step} />
      {slideNumber && <BeatLabel slideNumber={slideNumber} step={step} />}
    </footer>
  );
}

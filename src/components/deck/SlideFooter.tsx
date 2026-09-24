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

export function SlideFooter({ slide, step }: { slide: SlideDefinition; step: number }) {
  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 flex h-(--spacing-footer) items-center px-stage-x pb-2">
      <Citations slide={slide} step={step} />
    </footer>
  );
}

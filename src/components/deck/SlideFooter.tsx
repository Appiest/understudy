import { sources, type Source, type SourceId } from "@/content/sources";
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

function CitationLink({ id }: { id: SourceId }) {
  const source: Source = sources[id];
  if (!source.url) return source.cite;
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className="pointer-events-auto hover:text-ink hover:underline">
      {source.cite}
    </a>
  );
}

function NumberedFootnotes({ slide, step }: { slide: SlideDefinition; step: number }) {
  const cited = sourcesForStep(slide, step);
  return (
    <ol className="flex flex-wrap gap-x-5 text-fineprint text-ink-muted">
      {cited.map((id, index) => (
        <li key={id} className="flex gap-1.5">
          <span className="font-semibold text-ink figures-tabular">{index + 1}</span>
          <CitationLink id={id} />
        </li>
      ))}
    </ol>
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

const footerLayout = {
  citations: "h-(--spacing-footer) items-center pb-2",
  footnotes: "min-h-(--spacing-footer) items-end pb-7",
};

export function SlideFooter({ slide, step, slideNumber }: SlideFooterProps) {
  const Sources = slide.footnotes ? NumberedFootnotes : Citations;
  return (
    <footer className={`pointer-events-none absolute inset-x-0 bottom-0 flex gap-gap px-stage-x ${footerLayout[slide.footnotes ? "footnotes" : "citations"]}`}>
      <Sources slide={slide} step={step} />
      {slideNumber && <BeatLabel slideNumber={slideNumber} step={step} />}
    </footer>
  );
}

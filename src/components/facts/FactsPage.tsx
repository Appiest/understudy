"use client";

import { ArrowSquareOut, ArrowsClockwise, BookOpenText, CheckCircle, PaintBrush, Scales, Warning, type Icon } from "@phosphor-icons/react";
import { factsBySlide, factsCheckedOn, type Fact, type FactStatus } from "@/content/facts";
import { guideFor } from "@/content/guides";
import { sources, type Source } from "@/content/sources";
import { decks, type DeckId } from "../deck/decks";
import { PageNav, PageNavLink, clampSlideNumber, useEscapeBackToSlide } from "../PageNav";
import { QuestionList } from "../QuestionList";
import { factsHash, guideHash } from "../useHashRoute";
import { CanvasScores } from "./CanvasScores";

const statusStyle: Record<FactStatus, { label: string; Icon: Icon; className: string }> = {
  verified: { label: "Matches the source", Icon: CheckCircle, className: "bg-ocean-wash text-ocean-deep" },
  adjusted: { label: "Corrected to match the source", Icon: ArrowsClockwise, className: "bg-ocean-wash text-ocean-deep" },
  estimate: { label: "Team estimate", Icon: Scales, className: "bg-paper-sunken text-ink" },
  illustrative: { label: "Illustration, not data", Icon: PaintBrush, className: "bg-paper-sunken text-ink" },
  unconfirmed: { label: "Couldn’t confirm", Icon: Warning, className: "bg-rival-wash text-rival" },
};

function StatusBadge({ status }: { status: FactStatus }) {
  const { label, Icon, className } = statusStyle[status];
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${className}`}>
      <Icon size={16} weight="bold" aria-hidden />
      {label}
    </span>
  );
}

function SourceQuote({ fact }: { fact: Fact }) {
  if (!fact.source) return null;
  const source: Source = sources[fact.source];
  return (
    <figure className="mt-4 rounded-xl bg-paper px-5 py-4">
      {fact.quote && <blockquote className="text-base text-ink">“{fact.quote}”</blockquote>}
      <figcaption className={`text-sm text-ink-muted ${fact.quote ? "mt-2" : ""}`}>
        {source.url ? (
          <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-ocean underline decoration-1 underline-offset-4">
            {source.title}
            <ArrowSquareOut size={14} weight="bold" aria-hidden />
          </a>
        ) : (
          <span className="font-semibold">{source.title}</span>
        )}
      </figcaption>
    </figure>
  );
}

function FactCard({ fact }: { fact: Fact }) {
  return (
    <li className="grid gap-x-8 gap-y-3 rounded-2xl bg-paper-raised p-6 shadow-lift md:grid-cols-[200px_1fr] md:p-8">
      <p className="text-3xl leading-tight font-extrabold md:text-4xl">{fact.figure}</p>
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="max-w-prose text-lg font-semibold">{fact.claim}</p>
          <StatusBadge status={fact.status} />
        </div>
        {fact.derivation && <p className="mt-3 max-w-prose text-base text-ink-muted">{fact.derivation}</p>}
        <SourceQuote fact={fact} />
        {fact.caveat && (
          <p className="mt-4 max-w-prose text-base">
            <span className="font-semibold">If someone pushes back: </span>
            {fact.caveat}
          </p>
        )}
      </div>
    </li>
  );
}

export function FactsPage({ deckId, slideNumber }: { deckId: DeckId; slideNumber: number }) {
  const slides = decks[deckId].slides;
  const clampedNumber = clampSlideNumber(slideNumber, slides.length);
  const slide = slides[clampedNumber - 1];
  const facts = factsBySlide[slide.id];
  useEscapeBackToSlide(clampedNumber);

  return (
    <div className="min-h-full bg-paper text-ink">
      <PageNav label="Fact pages" slideNumber={clampedNumber} slideCount={slides.length} hashFor={factsHash} widthClass="max-w-6xl">
        {guideFor(slide.id) && (
          <PageNavLink href={guideHash(clampedNumber)} icon={<BookOpenText size={16} weight="bold" aria-hidden />}>
            Explain this slide
          </PageNavLink>
        )}
      </PageNav>
      <main className="mx-auto max-w-6xl px-4 pt-10 pb-24 md:px-8">
        <header className="max-w-3xl">
          <h1 className="text-4xl leading-tight font-extrabold md:text-5xl">
            Slide {clampedNumber}: {slide.name}
          </h1>
          <p className="mt-4 text-xl text-ink-muted">{facts.summary}</p>
        </header>

        {facts.facts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-extrabold">The numbers and claims</h2>
            <ul className="mt-6 flex flex-col gap-5">
              {facts.facts.map((fact) => (
                <FactCard key={fact.figure + fact.claim} fact={fact} />
              ))}
            </ul>
          </section>
        )}

        {facts.background && (
          <section className="mt-14">
            <h2 className="text-2xl font-extrabold">Background numbers for tough questions</h2>
            <p className="mt-2 max-w-prose text-base text-ink-muted">These aren’t on the slide, but they help answer questions about market size and newer data.</p>
            <ul className="mt-6 flex flex-col gap-5">
              {facts.background.map((fact) => (
                <FactCard key={fact.figure + fact.claim} fact={fact} />
              ))}
            </ul>
          </section>
        )}

        {slide.id === "canvas" && <CanvasScores />}

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold">Questions to expect</h2>
          <QuestionList questions={facts.questions} />
        </section>

        <p className="mt-14 text-sm text-ink-muted">Every sourced figure on this page was checked against its source on {facts.checkedOn ?? factsCheckedOn}.</p>
      </main>
    </div>
  );
}

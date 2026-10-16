"use client";

import { CheckCircle, ListMagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import { professorName, type GuidePart, type RubricCheck, type SlideGuide } from "@/content/guides";
import type { Question } from "@/content/facts";
import { decks, type DeckId } from "../deck/decks";
import { PageNav, PageNavLink, clampSlideNumber, useEscapeBackToSlide } from "../PageNav";
import { QuestionList } from "../QuestionList";
import { factsHash, guideHash } from "../useHashRoute";
import { AnnotatedSlide, PartNumber } from "./AnnotatedSlide";

function partElementId(index: number) {
  return `part-${index + 1}`;
}

function scrollToPart(index: number) {
  document.getElementById(partElementId(index))?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

type PartListProps = { parts: GuidePart[]; activePart: number | null; onSelectPart: (index: number | null) => void };

function PartList({ parts, activePart, onSelectPart }: PartListProps) {
  return (
    <ol className="flex flex-col gap-2">
      {parts.map((part, index) => (
        <li
          key={part.name}
          id={partElementId(index)}
          onPointerEnter={() => onSelectPart(index)}
          onPointerLeave={() => onSelectPart(null)}
          className={`flex scroll-mt-24 gap-4 rounded-2xl p-5 transition-[background-color] duration-150 ${activePart === index ? "bg-ocean-wash" : "bg-paper-raised"}`}
        >
          <PartNumber number={index + 1} active={activePart === index} />
          <div>
            <h3 className="text-lg font-bold">{part.name}</h3>
            <p className="mt-1 text-base leading-relaxed">{part.explanation}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function RubricList({ checks }: { checks: RubricCheck[] }) {
  return (
    <dl className="mt-6 divide-y divide-rule bg-paper-raised">
      {checks.map((check) => (
        <div key={check.requirement} className="grid gap-x-8 gap-y-1 px-6 py-4 md:grid-cols-[300px_1fr]">
          <dt className="flex items-start gap-2 font-semibold">
            <CheckCircle size={20} weight="fill" aria-hidden className="mt-0.5 shrink-0 text-ocean" />
            {check.requirement}
          </dt>
          <dd className="text-ink-muted">{check.howWeMeetIt}</dd>
        </div>
      ))}
    </dl>
  );
}

function QuestionSection({ heading, questions }: { heading: string; questions: Question[] }) {
  return (
    <section>
      <h2 className="text-2xl font-extrabold">{heading}</h2>
      <QuestionList questions={questions} />
    </section>
  );
}

type GuidePageProps = { deckId: DeckId; slideNumber: number; guide: SlideGuide };

export function GuidePage({ deckId, slideNumber, guide }: GuidePageProps) {
  const slides = decks[deckId].slides;
  const clampedNumber = clampSlideNumber(slideNumber, slides.length);
  const slide = slides[clampedNumber - 1];
  const [activePart, setActivePart] = useState<number | null>(null);
  useEscapeBackToSlide(clampedNumber);

  return (
    <div className="min-h-full bg-paper text-ink">
      <PageNav label="Slide explainers" slideNumber={clampedNumber} slideCount={slides.length} hashFor={guideHash} widthClass="max-w-7xl">
        <PageNavLink href={factsHash(clampedNumber)} icon={<ListMagnifyingGlass size={16} weight="bold" aria-hidden />}>
          Facts behind this slide
        </PageNavLink>
      </PageNav>
      <main className="mx-auto max-w-7xl px-4 pt-10 pb-24 md:px-8">
        <header className="max-w-3xl">
          <h1 className="text-4xl leading-tight font-extrabold md:text-5xl">
            Slide {clampedNumber}: {slide.name}
          </h1>
          <p className="mt-4 text-xl text-ink-muted">{guide.purpose}</p>
        </header>

        <section aria-label="Slide walkthrough" className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,5fr)]">
          <div className="lg:sticky lg:top-20">
            <AnnotatedSlide slide={slide} parts={guide.parts} activePart={activePart} onSelectPart={setActivePart} onOpenPart={scrollToPart} />
          </div>
          <PartList parts={guide.parts} activePart={activePart} onSelectPart={setActivePart} />
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-extrabold">What {professorName} grades here</h2>
          <RubricList checks={guide.rubric} />
        </section>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-8">
          <QuestionSection heading="Questions from a VC" questions={guide.vcQuestions} />
          <QuestionSection heading={`Questions from ${professorName}`} questions={guide.professorQuestions} />
        </div>
      </main>
    </div>
  );
}

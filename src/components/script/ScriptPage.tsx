import { ArrowSquareOut, PencilSimple, Play } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import type { SlideDefinition } from "@/components/deck/slides";
import { team } from "@/content/config";

const SLOW_WORDS_PER_MINUTE = 140;
const FAST_WORDS_PER_MINUTE = 150;

function wordCount(paragraphs: string[]) {
  return paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
}

function minutes(words: number, wordsPerMinute: number) {
  return (words / wordsPerMinute).toFixed(1);
}

function secondsAtMiddlePace(words: number) {
  const middlePace = (SLOW_WORDS_PER_MINUTE + FAST_WORDS_PER_MINUTE) / 2;
  return Math.round((words / middlePace) * 60);
}

const actionStyles = {
  primary: "bg-ink text-paper hover:bg-ocean-deep",
  secondary: "bg-paper-raised text-ink shadow-lift hover:bg-paper-sunken",
};

type ActionProps = { href: string; variant: keyof typeof actionStyles; external?: boolean; children: ReactNode };

function Action({ href, variant, external = false, children }: ActionProps) {
  const className = `inline-flex items-center gap-2 rounded-chip px-5 py-3 text-base font-semibold transition-colors ${actionStyles[variant]}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function ScriptHeader({ totalWords }: { totalWords: number }) {
  return (
    <header className="flex flex-col gap-6">
      <h1 className="text-5xl font-extrabold">Pitch script</h1>
      <p className="text-lg text-ink-muted">
        {totalWords} words take {minutes(totalWords, FAST_WORDS_PER_MINUTE)} to {minutes(totalWords, SLOW_WORDS_PER_MINUTE)} minutes to say out loud. Edits saved on GitHub show up in the deck’s presenter notes once the site rebuilds.
      </p>
      <div className="flex flex-wrap gap-3">
        <Action href={team.scriptEditLink} variant="primary" external>
          <PencilSimple size={20} weight="bold" aria-hidden />
          Edit the script on GitHub
          <ArrowSquareOut size={18} weight="bold" aria-hidden />
        </Action>
        <Action href="/pitch" variant="secondary">
          <Play size={20} weight="fill" aria-hidden />
          Present the deck
        </Action>
      </div>
    </header>
  );
}

function SlideScript({ slide, slideNumber }: { slide: SlideDefinition; slideNumber: number }) {
  const showBeats = slide.notes.length > 1;
  return (
    <li className="flex flex-col gap-4 py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="text-2xl font-bold">
          {slideNumber}. {slide.name}
        </h2>
        <p className="text-base text-ink-muted figures-tabular">about {secondsAtMiddlePace(wordCount(slide.notes))} seconds</p>
      </div>
      <ol className="flex flex-col gap-4">
        {slide.notes.map((paragraph, index) => (
          <li key={paragraph} className="grid grid-cols-[4.5rem_1fr] gap-4 text-lg">
            <span className="text-base text-ink-faint figures-tabular">{showBeats ? `Beat ${index + 1}` : ""}</span>
            <p>{paragraph}</p>
          </li>
        ))}
      </ol>
      <Link href={`/pitch#${slideNumber}`} className="ms-[5.5rem] self-start text-base font-semibold text-ocean underline decoration-1 underline-offset-4">
        Present from slide {slideNumber}
      </Link>
    </li>
  );
}

export function ScriptPage({ slides }: { slides: SlideDefinition[] }) {
  const totalWords = wordCount(slides.flatMap((slide) => slide.notes));
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-8">
      <ScriptHeader totalWords={totalWords} />
      <ol className="divide-y divide-rule">
        {slides.map((slide, index) => (
          <SlideScript key={slide.id} slide={slide} slideNumber={index + 1} />
        ))}
      </ol>
    </main>
  );
}

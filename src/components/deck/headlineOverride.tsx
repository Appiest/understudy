"use client";

import { useIsPresent } from "motion/react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { MaskedLines } from "./primitives";

const HeadlineContext = createContext<string[] | undefined>(undefined);

/** Replaces a reused slide's headline, so a deck can state each beat's point in its own words. */
export function HeadlineOverride({ lines, children }: { lines?: string[]; children: ReactNode }) {
  return <HeadlineContext.Provider value={lines}>{children}</HeadlineContext.Provider>;
}

/**
 * A beat that is animating out keeps the headline it showed. If it took the next beat's headline,
 * new text would mount inside the exiting view, its exit would never finish, and the next beat would never appear.
 */
export function useHeadlineOverride() {
  const lines = useContext(HeadlineContext);
  const isPresent = useIsPresent();
  const [shownLines, setShownLines] = useState(lines);
  if (isPresent && shownLines !== lines) setShownLines(lines);
  return isPresent ? lines : shownLines;
}

export function useHeadline(lines: string[]) {
  return useHeadlineOverride() ?? lines;
}

/** Override headlines state a full point, so they set at title size where the original used a bigger, shorter line. */
export function useHeadlineSize(originalSize: string) {
  return useHeadlineOverride() ? "text-title" : originalSize;
}

/** For views whose own heading is only for screen readers: shows the override when a deck sets one. */
export function HiddenHeadline({ lines, className, delay = 0.1 }: { lines: string[]; className: string; delay?: number }) {
  const override = useHeadlineOverride();
  if (!override) return <h2 className="sr-only">{lines.join(" ")}</h2>;
  return (
    <h2 className={className}>
      <MaskedLines lines={override} delay={delay} />
    </h2>
  );
}

/** For views with no heading at all: adds the override when a deck sets one. */
export function AddedHeadline({ className, delay = 0.1 }: { className: string; delay?: number }) {
  const override = useHeadlineOverride();
  if (!override) return null;
  return (
    <h2 className={className}>
      <MaskedLines lines={override} delay={delay} />
    </h2>
  );
}

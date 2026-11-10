"use client";

import { createContext, useContext, type ReactNode } from "react";

const PitchContext = createContext(false);

export function PitchMode({ children }: { children: ReactNode }) {
  return <PitchContext.Provider value>{children}</PitchContext.Provider>;
}

export function useIsPitch() {
  return useContext(PitchContext);
}

/** Text for people reading the deck on their own. The live pitch leaves it out because nobody reads it while someone talks. */
export function ReadingDetail({ children }: { children: ReactNode }) {
  return useIsPitch() ? null : children;
}

const BriefContext = createContext(false);

/** The read-alone grant deck: keeps layouts as they are but drops long supporting text, which moves to the notes and fact pages. */
export function BriefMode({ children }: { children: ReactNode }) {
  return <BriefContext.Provider value>{children}</BriefContext.Provider>;
}

export function useIsBrief() {
  return useContext(BriefContext);
}

/** Supporting text that the brief deck leaves off the slide. */
export function FullDetail({ children }: { children: ReactNode }) {
  return useIsBrief() ? null : children;
}

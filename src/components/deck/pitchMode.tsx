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

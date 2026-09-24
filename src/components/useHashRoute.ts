"use client";

import { useSyncExternalStore } from "react";

export type HashRoute = { slideNumber: number; view: "deck" | "facts" };

const FACTS_SUFFIX = "/data";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const readHash = () => window.location.hash;
const serverHash = () => "";

export function parseHashRoute(hash: string): HashRoute {
  const body = hash.replace(/^#/, "");
  const slideNumber = Number.parseInt(body, 10);
  return {
    slideNumber: Number.isFinite(slideNumber) ? slideNumber : 1,
    view: body.endsWith(FACTS_SUFFIX) ? "facts" : "deck",
  };
}

export function factsHash(slideNumber: number) {
  return `#${slideNumber}${FACTS_SUFFIX}`;
}

export function useHashRoute() {
  return parseHashRoute(useSyncExternalStore(subscribe, readHash, serverHash));
}

"use client";

import { useSyncExternalStore } from "react";

export type HashView = "deck" | "facts" | "guide";
export type HashRoute = { slideNumber: number; view: HashView };

const FACTS_SUFFIX = "/data";
const GUIDE_SUFFIX = "/guide";

function viewFromHash(body: string): HashView {
  if (body.endsWith(FACTS_SUFFIX)) return "facts";
  if (body.endsWith(GUIDE_SUFFIX)) return "guide";
  return "deck";
}

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
    view: viewFromHash(body),
  };
}

export function factsHash(slideNumber: number) {
  return `#${slideNumber}${FACTS_SUFFIX}`;
}

export function guideHash(slideNumber: number) {
  return `#${slideNumber}${GUIDE_SUFFIX}`;
}

export function useHashRoute() {
  return parseHashRoute(useSyncExternalStore(subscribe, readHash, serverHash));
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { asset } from "@/lib/asset";
import { factsHash } from "../useHashRoute";

function toggleFullscreen() {
  if (document.fullscreenElement) {
    void document.exitFullscreen();
    return;
  }
  void document.documentElement.requestFullscreen({ navigationUI: "hide" });
}

const BEAT_LABEL_KEY = "understudy:beat-label";
const beatLabelListeners = new Set<() => void>();

function readBeatLabelVisible() {
  try {
    return window.localStorage.getItem(BEAT_LABEL_KEY) !== "hidden";
  } catch {
    return true;
  }
}

function toggleBeatLabel() {
  const nextValue = readBeatLabelVisible() ? "hidden" : "shown";
  try {
    window.localStorage.setItem(BEAT_LABEL_KEY, nextValue);
  } catch {
    return;
  }
  beatLabelListeners.forEach((notify) => notify());
}

function subscribeToBeatLabel(notify: () => void) {
  beatLabelListeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    beatLabelListeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

export function useBeatLabelVisible() {
  return useSyncExternalStore(subscribeToBeatLabel, readBeatLabelVisible, () => true);
}

export function usePresenterKeys(slideNumber: number) {
  const [notesOpen, setNotesOpen] = useState(false);

  useEffect(() => {
    const actions: Record<string, () => void> = {
      n: () => setNotesOpen((open) => !open),
      f: toggleFullscreen,
      b: toggleBeatLabel,
      p: () => window.open(asset("/print"), "_blank"),
      d: () => {
        window.location.hash = factsHash(slideNumber);
      },
      Escape: () => setNotesOpen(false),
    };

    function handleKeyDown(event: KeyboardEvent) {
      const action = actions[event.key] ?? actions[event.key.toLowerCase()];
      if (!action || event.metaKey || event.ctrlKey || event.altKey) return;
      event.preventDefault();
      action();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideNumber]);

  return { notesOpen, toggleNotes: () => setNotesOpen((open) => !open) };
}

const CURSOR_IDLE_MS = 1600;

export function useIdleCursor() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer = window.setTimeout(() => setIsIdle(true), CURSOR_IDLE_MS);

    function wake() {
      setIsIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIsIdle(true), CURSOR_IDLE_MS);
    }

    window.addEventListener("pointermove", wake);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", wake);
    };
  }, []);

  return isIdle;
}

const STAGE = { width: 1920, height: 1080 };

export function useStageScale() {
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => setScale(Math.min(window.innerWidth / STAGE.width, window.innerHeight / STAGE.height));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return scale;
}

"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { GuidePart } from "@/content/guides";
import { SlideFooter } from "../deck/SlideFooter";
import type { SlideDefinition } from "../deck/slides";

const STAGE_WIDTH = 1920;

function useFitScale(frameRef: RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState<number | null>(null);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / STAGE_WIDTH));
    observer.observe(frame);
    return () => observer.disconnect();
  }, [frameRef]);
  return scale;
}

const partNumberSize = {
  pin: "size-6 text-xs",
  card: "size-8 text-sm",
};

export function PartNumber({ number, active, size = "card" }: { number: number; active: boolean; size?: keyof typeof partNumberSize }) {
  const tone = active ? "bg-ocean text-paper scale-125 ring-4 ring-ocean/25" : "bg-ink text-paper";
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold figures-tabular shadow-lift transition-[scale,background-color,box-shadow] duration-150 ${partNumberSize[size]} ${tone}`}
    >
      {number}
    </span>
  );
}

function lastPrintedStep(slide: SlideDefinition) {
  return slide.printSteps?.at(-1) ?? slide.steps - 1;
}

type AnnotatedSlideProps = {
  slide: SlideDefinition;
  parts: GuidePart[];
  activePart: number | null;
  onSelectPart: (index: number | null) => void;
  onOpenPart: (index: number) => void;
};

export function AnnotatedSlide({ slide, parts, activePart, onSelectPart, onOpenPart }: AnnotatedSlideProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(frameRef);
  const step = lastPrintedStep(slide);

  return (
    <div ref={frameRef} className="relative aspect-video w-full overflow-hidden rounded-2xl bg-paper shadow-float">
      <div inert className="stage absolute top-0 left-0 origin-top-left bg-paper" style={{ scale: scale ?? 1, opacity: scale === null ? 0 : 1 }}>
        <slide.Content step={step} />
        <SlideFooter slide={slide} step={step} />
        <div aria-hidden className="paper-grain pointer-events-none absolute inset-0" />
      </div>
      <ol aria-label="Parts of the slide">
        {parts.map((part, index) => (
          <li key={part.name} className="absolute -translate-1/2" style={{ left: `${part.at.x}%`, top: `${part.at.y}%` }}>
            <button
              type="button"
              aria-label={`Explain part ${index + 1}: ${part.name}`}
              className="flex size-11 cursor-pointer items-center justify-center rounded-full"
              onPointerEnter={() => onSelectPart(index)}
              onPointerLeave={() => onSelectPart(null)}
              onFocus={() => onSelectPart(index)}
              onBlur={() => onSelectPart(null)}
              onClick={() => onOpenPart(index)}
            >
              <PartNumber number={index + 1} active={activePart === index} size="pin" />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

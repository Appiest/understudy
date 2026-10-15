"use client";

import { motion, type Variants } from "motion/react";
import { competitorMap, competitors, competitorSources, type Competitor } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { CompetitorLogo } from "../CompetitorLogo";
import { MaskedLines, StepView, fadeReveal, footnoteNumbers, strokeDraw } from "../primitives";
import { VoiceWave } from "../VoiceWave";

const MAP = { width: 1696, height: 640 };
const STRIVR_VR = { onTheJob: 0.12, smallBusiness: 0.3 };

type MapPoint = { onTheJob: number; smallBusiness: number };

function toPixels(point: MapPoint) {
  return { x: point.onTheJob * MAP.width, y: (1 - point.smallBusiness) * MAP.height };
}

const us = competitors.find((competitor) => competitor.isUs)!;
const plotted = competitors.filter((competitor) => competitor.map && competitor.logo);
const strivr = plotted.find((competitor) => competitor.name === "Strivr")!;

function logoAppears(index: number): Variants {
  return {
    enter: { opacity: 0, scale: 0.85 },
    present: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeDrawn, delay: 0.7 + index * 0.08 } },
  };
}

function PlottedLogo({ competitor, index }: { competitor: Competitor; index: number }) {
  const { x, y } = toPixels(competitor.map!);
  return (
    <motion.div variants={logoAppears(index)} className="absolute text-caption" style={{ left: x, top: y, translate: "-50% -50%" }}>
      <CompetitorLogo competitor={competitor} footnote={footnoteNumbers(competitorSources, [competitor.source!])[0]} />
    </motion.div>
  );
}

function Axes() {
  const labelClass = "absolute text-caption font-semibold text-ink-muted";
  return (
    <>
      <div aria-hidden className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 bg-ink" />
      <div aria-hidden className="absolute top-0 left-1/2 h-full w-[3px] -translate-x-1/2 bg-ink" />
      <p className={`${labelClass} top-1/2 left-0 mt-3`}>{competitorMap.axes.x[0]}</p>
      <p className={`${labelClass} top-1/2 right-0 mt-3 text-right`}>{competitorMap.axes.x[1]}</p>
      <p className={`${labelClass} top-0 left-1/2 ml-5`}>{competitorMap.axes.y[1]}</p>
      <p className={`${labelClass} right-1/2 bottom-0 mr-5 text-right`}>{competitorMap.axes.y[0]}</p>
    </>
  );
}

function QuadrantLabels() {
  const labelClass = "absolute text-caption text-ink-faint";
  const { quadrants } = competitorMap;
  return (
    <>
      <p className={`${labelClass} top-0 left-0`}>{quadrants.smallOff}</p>
      <p className={`${labelClass} bottom-0 left-0`}>{quadrants.largeOff}</p>
      <p className={`${labelClass} right-0 bottom-0 text-right`}>{quadrants.largeOn}</p>
      <p className="absolute top-0 right-0 text-caption font-bold text-ocean">{quadrants.smallOn}</p>
    </>
  );
}

function OpenQuadrant() {
  return (
    <motion.div
      aria-hidden
      variants={{ enter: { opacity: 0 }, present: { opacity: 1, transition: { duration: 1, delay: 1.8 } } }}
      className="hatch absolute top-0 right-0 h-1/2 w-1/2"
    />
  );
}

function StrivrMove() {
  const from = toPixels(STRIVR_VR);
  const to = toPixels(strivr.map!);
  const control = { x: (from.x + to.x) / 2, y: Math.max(from.y, to.y) + 40 };
  const end = { x: to.x - 96, y: to.y + 6 };
  return (
    <>
      <svg aria-hidden className="absolute inset-0 overflow-visible" width={MAP.width} height={MAP.height}>
        <motion.path
          d={`M ${from.x + 18} ${from.y + 8} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
          fill="none"
          stroke="var(--color-ink-faint)"
          strokeWidth={3}
          strokeDasharray="3 10"
          strokeLinecap="round"
          variants={strokeDraw(1.6, 1.2)}
        />
        <motion.circle cx={from.x} cy={from.y} r={10} fill="none" stroke="var(--color-ink-faint)" strokeWidth={3} variants={fadeReveal(1.5)} />
      </svg>
      <motion.p variants={fadeReveal(1.5)} className="absolute text-caption text-ink-faint" style={{ left: from.x - 10, top: from.y - 52 }}>
        {competitorMap.strivrMove}
      </motion.p>
    </>
  );
}

function UsMarker() {
  const { x, y } = toPixels(us.map!);
  return (
    <motion.div
      variants={{ enter: { opacity: 0, scale: 0.6 }, present: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeDrawn, delay: 2.2 } } }}
      className="absolute flex items-center gap-5"
      style={{ left: x, top: y, translate: "-24px -50%" }}
    >
      <span aria-hidden className="h-12 w-12 shrink-0 rounded-full bg-ocean shadow-[0_0_0_12px_var(--color-ocean-wash)]" />
      <span className="flex flex-col">
        <span className="text-lede font-extrabold text-ocean">{us.name}</span>
        <VoiceWave width={200} height={22} delay={2.6} strokeWidth={3} fadeTowards="end" />
      </span>
    </motion.div>
  );
}

export function CompetitorMapSlide() {
  return (
    <StepView className="flex flex-col gap-10">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[competitorMap.headline]} delay={0.05} />
      </h2>
      <motion.div variants={fadeReveal(0.3)} className="relative" style={{ width: MAP.width, height: MAP.height }}>
        <OpenQuadrant />
        <Axes />
        <QuadrantLabels />
        <StrivrMove />
        {plotted.map((competitor, index) => (
          <PlottedLogo key={competitor.name} competitor={competitor} index={index} />
        ))}
        <UsMarker />
      </motion.div>
    </StepView>
  );
}

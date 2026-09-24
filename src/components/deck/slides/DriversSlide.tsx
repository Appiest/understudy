"use client";

import { ArrowRight, CalendarCheck, CheckCircle, Package, Record, Sparkle, Truck, type Icon } from "@phosphor-icons/react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { drivers, type ShipmentQuarter } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { CountUp, StepView, fadeReveal, useProgress } from "../primitives";
import type { SlideProps } from "../slides";

function DriverHeading({ heading }: { heading: string }) {
  return (
    <motion.h2 variants={fadeReveal(0.1, 24)} className="max-w-[1500px] text-title font-extrabold">
      {heading}
    </motion.h2>
  );
}

const frameIcons: Icon[] = [Truck, CalendarCheck, Package];

function Filmstrip() {
  return (
    <motion.div variants={fadeReveal(0.5, 20)}>
      <p className="mb-4 flex items-center gap-2 text-caption font-semibold text-ink-muted">
        <Record weight="fill" size={22} className="text-rival" aria-hidden />
        {drivers.ai.recordedLabel}
      </p>
      <ol className="flex bg-ink p-4" aria-label={drivers.ai.recordedLabel}>
        {drivers.ai.frames.map((frame, index) => {
          const FrameIcon = frameIcons[index];
          return (
            <li key={frame} className="flex h-[300px] w-[300px] flex-col justify-between bg-paper-sunken p-6 not-first:ml-4">
              <FrameIcon size={96} weight="duotone" className="text-ink-muted" aria-hidden />
              <span className="text-body font-semibold">{frame}</span>
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}

function Procedure() {
  return (
    <motion.div variants={fadeReveal(1.3, 20)}>
      <p className="mb-4 flex items-center gap-2 text-caption font-semibold text-ink-muted">
        <Sparkle weight="fill" size={22} className="text-ocean" aria-hidden />
        {drivers.ai.writtenLabel}
      </p>
      <ol className="flex w-[520px] flex-col gap-5 rounded-card bg-paper-raised p-10 shadow-lift">
        {drivers.ai.steps.map((step, index) => (
          <motion.li key={step} variants={fadeReveal(1.6 + index * 0.25)} className="flex items-center gap-4 text-body font-semibold">
            <CheckCircle weight="fill" size={36} className="shrink-0 text-ocean" aria-hidden />
            {step}
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

function AiView() {
  return (
    <StepView className="flex flex-col justify-between">
      <DriverHeading heading={drivers.ai.heading} />
      <div className="flex items-end gap-10">
        <Filmstrip />
        <motion.span variants={fadeReveal(1)} className="pb-32">
          <ArrowRight size={64} weight="bold" aria-hidden />
        </motion.span>
        <Procedure />
      </div>
      <motion.p variants={fadeReveal(2.2)} className="max-w-[1400px] text-body text-ink-muted">
        {drivers.ai.proof}
      </motion.p>
    </StepView>
  );
}

const CHART = { width: 1080, height: 560, left: 96, right: 20, top: 24, bottom: 470, barWidth: 52, barGap: 6, maxValue: 3000 };
const TICKS = [0, 1000, 2000, 3000];
const thousands = new Intl.NumberFormat("en-US");
const { chart } = drivers.glasses;
const groupWidth = (CHART.width - CHART.left - CHART.right) / chart.quarters.length;

function yForValue(value: number) {
  return CHART.bottom - (value / CHART.maxValue) * (CHART.bottom - CHART.top);
}

function groupCenter(index: number) {
  return CHART.left + groupWidth * (index + 0.5);
}

function barGrows(delay: number): Variants {
  return {
    enter: { scaleY: 0 },
    present: { scaleY: 1, transition: { duration: 0.9, ease: easeDrawn, delay } },
  };
}

function Bar({ x, value, fill, delay }: { x: number; value: number; fill: string; delay: number }) {
  const top = yForValue(value);
  return (
    <motion.g variants={barGrows(delay)} style={{ originY: 1, transformBox: "fill-box" }}>
      <rect x={x} y={top} width={CHART.barWidth} height={CHART.bottom - top} rx={4} fill={fill} />
      <rect x={x} y={CHART.bottom - 4} width={CHART.barWidth} height={4} fill={fill} />
    </motion.g>
  );
}

function QuarterBars({ quarter, index }: { quarter: ShipmentQuarter; index: number }) {
  const center = groupCenter(index);
  const delay = 0.5 + index * 0.12;
  if (quarter.glasses === undefined || quarter.other === undefined) {
    return (
      <text x={center} y={CHART.bottom - 24} textAnchor="middle" className="text-fineprint" fill="var(--color-ink-faint)">
        {chart.unpublishedLabel}
      </text>
    );
  }
  const glassesX = center - CHART.barWidth - CHART.barGap / 2;
  return (
    <g>
      <Bar x={glassesX} value={quarter.glasses} fill="var(--color-ocean-chart)" delay={delay} />
      <Bar x={center + CHART.barGap / 2} value={quarter.other} fill="var(--color-rival)" delay={delay + 0.08} />
      <motion.text variants={fadeReveal(delay + 0.7)} x={glassesX + CHART.barWidth / 2} y={yForValue(quarter.glasses) - 14} textAnchor="middle" className="text-caption font-bold" fill="var(--color-ink)">
        {thousands.format(quarter.glasses)}
      </motion.text>
    </g>
  );
}

function ChartTooltip({ quarter, index }: { quarter: ShipmentQuarter; index: number }) {
  if (quarter.glasses === undefined || quarter.other === undefined) return null;
  return (
    <div className="pointer-events-none absolute z-10 w-[360px] -translate-x-1/2 rounded-card bg-paper-raised px-6 py-4 text-caption shadow-float" style={{ left: groupCenter(index), top: -8 }}>
      <p className="font-bold">{quarter.quarter}</p>
      <p className="mt-1 flex items-center gap-2">
        <span aria-hidden className="h-3 w-3 rounded-sm bg-ocean-chart" />
        {thousands.format(quarter.glasses)}K glasses, +{quarter.glassesGrowth}% in a year
      </p>
      <p className="mt-1 flex items-center gap-2">
        <span aria-hidden className="h-3 w-3 shrink-0 rounded-sm bg-rival" />
        {thousands.format(quarter.other)}K {quarter.otherSplit ? `(${quarter.otherSplit})` : "headsets and display glasses"}
      </p>
    </div>
  );
}

function ChartLegend() {
  return (
    <div className="flex items-center gap-8 text-caption">
      <span className="flex items-center gap-3">
        <span aria-hidden className="h-4 w-4 rounded-sm bg-ocean-chart" />
        {chart.glassesLabel}
      </span>
      <span className="flex items-center gap-3">
        <span aria-hidden className="h-4 w-4 rounded-sm bg-rival" />
        {chart.otherLabel}
      </span>
    </div>
  );
}

function ShipmentChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div variants={fadeReveal(0.3)}>
      <p className="text-caption font-semibold text-ink-muted">{chart.caption}</p>
      <div className="mt-3">
        <ChartLegend />
      </div>
      <div className="relative mt-6" style={{ width: CHART.width, height: CHART.height }}>
        <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} width={CHART.width} height={CHART.height} className="overflow-visible" role="img" aria-label="Quarterly shipments of glasses without a display grew from 831 thousand in Q1 2025 to 2.5 million in Q2 2026, while headsets and display glasses stayed near 1 million">
          {TICKS.map((tick) => (
            <g key={tick}>
              <line x1={CHART.left} x2={CHART.width - CHART.right} y1={yForValue(tick)} y2={yForValue(tick)} stroke="var(--color-rule)" strokeWidth={1} />
              <text x={CHART.left - 16} y={yForValue(tick) + 8} textAnchor="end" className="text-fineprint" fill="var(--color-ink-muted)">
                {thousands.format(tick)}
              </text>
            </g>
          ))}
          {chart.quarters.map((quarter, index) => (
            <g key={quarter.quarter}>
              <QuarterBars quarter={quarter} index={index} />
              <text x={groupCenter(index)} y={CHART.bottom + 44} textAnchor="middle" className="text-caption font-semibold" fill="var(--color-ink)">
                {quarter.quarter}
              </text>
              <rect
                data-interactive
                x={groupCenter(index) - groupWidth / 2}
                y={CHART.top}
                width={groupWidth}
                height={CHART.bottom - CHART.top}
                fill="transparent"
                onPointerEnter={() => setHovered(index)}
                onPointerLeave={() => setHovered(null)}
              />
            </g>
          ))}
        </svg>
        {hovered !== null && <ChartTooltip quarter={chart.quarters[hovered]} index={hovered} />}
      </div>
    </motion.div>
  );
}

function GlassesStats() {
  const { metaSales, questDecline } = drivers.glasses;
  const metaProgress = useProgress(1.6, 1.4);
  const questProgress = useProgress(1.2, 2.2);
  return (
    <div className="flex flex-col gap-14 pb-10">
      <div>
        <p className="text-display font-black text-ocean">
          <CountUp progress={metaProgress} total={metaSales.value} format={(value) => `${Math.round(value)}M+`} />
        </p>
        <motion.p variants={fadeReveal(1.8)} className="mt-3 text-body font-semibold">
          {metaSales.caption}
        </motion.p>
      </div>
      <div>
        <p className="text-display font-black">
          <CountUp progress={questProgress} total={questDecline.value} format={(value) => `−${Math.round(value)}%`} />
        </p>
        <motion.p variants={fadeReveal(2.6)} className="mt-3 text-body font-semibold">
          {questDecline.caption}
        </motion.p>
      </div>
    </div>
  );
}

function GlassesView() {
  return (
    <StepView className="flex flex-col">
      <DriverHeading heading={drivers.glasses.heading} />
      <div className="mt-auto grid grid-cols-[1080px_1fr] items-end gap-gap">
        <ShipmentChart />
        <GlassesStats />
      </div>
    </StepView>
  );
}

type Move = (typeof drivers.shift.betting.moves)[number];

function MoveList({ moves, tone, delay }: { moves: Move[]; tone: "rival" | "ocean"; delay: number }) {
  return (
    <ol className="flex flex-col gap-7">
      {moves.map((move, index) => (
        <motion.li key={move.who + move.when} variants={fadeReveal(delay + index * 0.18, 16)} className="grid grid-cols-[28px_1fr] items-baseline">
          <span aria-hidden className={`h-4 w-4 -translate-y-0.5 rounded-full ${tone === "ocean" ? "bg-ocean" : "bg-rival"}`} />
          <div>
            <p className="text-point">
              <span className="font-extrabold">{move.who}</span> <span className="text-caption font-semibold text-ink-muted">{move.when}</span>
            </p>
            <p className="mt-1 text-body">{move.what}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

function ShiftView() {
  const { shift } = drivers;
  return (
    <StepView className="flex flex-col">
      <DriverHeading heading={shift.heading} />
      <div className="mt-10 grid grid-cols-[560px_auto_1fr] items-start gap-12">
        <section>
          <h3 className="mb-7 text-lede font-extrabold text-ink-muted">{shift.leaving.label}</h3>
          <MoveList moves={shift.leaving.moves} tone="rival" delay={0.5} />
          <motion.figure variants={fadeReveal(2.4)} className="mt-14 rounded-card bg-paper-raised p-8 shadow-lift">
            <blockquote className="text-point font-bold">“{shift.analyst.quote}”</blockquote>
            <figcaption className="mt-3 text-caption text-ink-muted">{shift.analyst.who}</figcaption>
          </motion.figure>
        </section>
        <motion.span variants={fadeReveal(1)} className="pt-24">
          <ArrowRight size={72} weight="bold" aria-hidden />
        </motion.span>
        <section>
          <h3 className="mb-7 text-lede font-extrabold text-ocean">{shift.betting.label}</h3>
          <MoveList moves={shift.betting.moves} tone="ocean" delay={1.2} />
        </section>
      </div>
    </StepView>
  );
}

const views = [AiView, GlassesView, ShiftView];

export function DriversSlide({ step }: SlideProps) {
  const View = views[step];
  return (
    <AnimatePresence mode="wait">
      <View key={step} />
    </AnimatePresence>
  );
}

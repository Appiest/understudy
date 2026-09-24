"use client";

import { ArrowRight, CheckCircle, Record } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { drivers } from "@/content/content";
import { CountUp, MaskedLines, StepView, fadeReveal, strokeDraw, useProgress } from "../primitives";
import type { SlideProps } from "../slides";

function DriverHeading({ name }: { name: string }) {
  return (
    <div>
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[drivers.headline]} delay={0.1} />
      </h2>
      <p className="mt-2 text-lede font-bold text-ocean">
        <MaskedLines lines={[name]} delay={0.3} />
      </p>
    </div>
  );
}

function Filmstrip() {
  return (
    <motion.ol variants={fadeReveal(0.5, 20)} className="flex bg-ink p-4" aria-label="Frames from a recorded shift">
      {drivers.ai.frames.map((frame, index) => (
        <li key={frame} className="flex h-[300px] w-[300px] flex-col justify-between bg-paper-sunken p-5 not-first:ml-4">
          <span className="flex items-center gap-2 text-fineprint font-semibold text-rival">
            <Record weight="fill" size={20} aria-hidden />
            Shift recording {index + 1}
          </span>
          <span className="text-body font-semibold">{frame}</span>
        </li>
      ))}
    </motion.ol>
  );
}

function Procedure() {
  return (
    <motion.div variants={fadeReveal(1.3, 20)} className="flex w-[520px] flex-col rounded-card bg-paper-raised p-10 shadow-lift">
      <p className="text-caption font-semibold text-ink-muted">Procedure</p>
      <ol className="mt-6 flex flex-col gap-5">
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
      <DriverHeading name={drivers.ai.name} />
      <div className="flex items-center gap-10">
        <Filmstrip />
        <motion.span variants={fadeReveal(1)}>
          <ArrowRight size={64} weight="bold" aria-hidden />
        </motion.span>
        <Procedure />
      </div>
      <motion.p variants={fadeReveal(0.8)} className="max-w-[1400px] text-lede font-semibold">
        {drivers.ai.claim}
      </motion.p>
    </StepView>
  );
}

const SLOPE = { width: 820, height: 560, left: 190, right: 630, top: 40, bottom: 520 };

function yForShare(share: number) {
  return SLOPE.bottom - (share / 100) * (SLOPE.bottom - SLOPE.top);
}

function SlopeLine({ values, label, tone, delay }: { values: number[]; label: string; tone: "ocean" | "rival"; delay: number }) {
  const [start, end] = values.map(yForShare);
  const color = `var(--color-${tone})`;
  const isHero = tone === "ocean";
  return (
    <g>
      <motion.line x1={SLOPE.left} y1={start} x2={SLOPE.right} y2={end} stroke={color} strokeWidth={isHero ? 12 : 5} strokeLinecap="round" variants={strokeDraw(delay)} />
      <motion.g variants={fadeReveal(delay + 0.8)} fill={color}>
        <circle cx={SLOPE.left} cy={start} r={isHero ? 14 : 9} />
        <circle cx={SLOPE.right} cy={end} r={isHero ? 14 : 9} />
        <text x={SLOPE.left - 28} y={start + 12} textAnchor="end" className="text-body font-bold figures-tabular">{values[0]}%</text>
        <text x={SLOPE.right + 30} y={end - 8} className="text-lede font-extrabold figures-tabular">{values[1]}%</text>
        <text x={SLOPE.right + 30} y={end + 30} className="text-caption font-semibold">{label}</text>
      </motion.g>
    </g>
  );
}

function ShareSlope() {
  const { share } = drivers.glasses;
  return (
    <svg viewBox={`0 0 ${SLOPE.width} ${SLOPE.height + 60}`} className="w-[820px] overflow-visible" role="img" aria-label={`Glasses rose from ${share.glasses[0]}% to ${share.glasses[1]}% of XR shipments while headsets fell from ${share.headsets[0]}% to ${share.headsets[1]}%`}>
      {share.periods.map((period, index) => (
        <text key={period} x={index === 0 ? SLOPE.left : SLOPE.right} y={SLOPE.height + 50} textAnchor="middle" className="text-caption font-semibold" fill="var(--color-ink-muted)">
          {period}
        </text>
      ))}
      <line x1={SLOPE.left} x2={SLOPE.left} y1={SLOPE.top} y2={SLOPE.bottom} stroke="var(--color-rule)" strokeWidth={2} />
      <line x1={SLOPE.right} x2={SLOPE.right} y1={SLOPE.top} y2={SLOPE.bottom} stroke="var(--color-rule)" strokeWidth={2} />
      <SlopeLine values={share.headsets} label="Headsets" tone="rival" delay={0.5} />
      <SlopeLine values={share.glasses} label="Glasses" tone="ocean" delay={0.9} />
    </svg>
  );
}

function GlassesView() {
  const { soldIn2025, share } = drivers.glasses;
  const progress = useProgress(1.6, 1.2);
  return (
    <StepView className="flex flex-col">
      <DriverHeading name={drivers.glasses.name} />
      <div className="mt-auto grid grid-cols-[900px_1fr] items-end gap-gap">
        <div>
          <motion.p variants={fadeReveal(0.4)} className="mb-6 text-caption font-semibold text-ink-muted">
            {share.caption}
          </motion.p>
          <ShareSlope />
        </div>
        <div className="pb-16">
          <p className="text-poster font-black text-ocean">
            <CountUp progress={progress} total={soldIn2025.value} format={(value) => `${Math.round(value)}M`} />
          </p>
          <motion.p variants={fadeReveal(1.6)} className="mt-4 text-lede font-bold">
            {soldIn2025.caption}
          </motion.p>
        </div>
      </div>
    </StepView>
  );
}

const TODAY_AFTER_EVENT = 1;

function TimelineEvent({ event, index }: { event: (typeof drivers.retreat.events)[number]; index: number }) {
  return (
    <motion.li variants={fadeReveal(0.7 + index * 0.25, 20)} className="relative pt-16">
      <span aria-hidden className="absolute top-0 left-0 h-7 w-7 -translate-y-1/2 rounded-full bg-ink" />
      <p className="text-point font-extrabold">{event.when}</p>
      <p className="mt-3 text-body text-ink-muted">{event.what}</p>
    </motion.li>
  );
}

function RetreatView() {
  const { retreat } = drivers;
  return (
    <StepView className="flex flex-col">
      <DriverHeading name={retreat.heading} />
      <div className="relative mt-auto mb-auto">
        <svg aria-hidden viewBox="0 0 1696 10" className="absolute inset-x-0 top-0 h-2.5 w-full -translate-y-1/2 overflow-visible">
          <motion.line x1={0} x2={1696} y1={5} y2={5} stroke="var(--color-ink)" strokeWidth={4} variants={strokeDraw(0.4, 1.4)} />
        </svg>
        <motion.div
          variants={fadeReveal(1.8)}
          className="absolute -top-24 flex flex-col items-center gap-2 text-caption font-bold text-ocean"
          style={{ left: `calc(${((TODAY_AFTER_EVENT + 0.75) / retreat.events.length) * 100}% - 40px)` }}
        >
          {retreat.today}
          <span className="h-16 w-1.5 rounded-full bg-ocean" />
        </motion.div>
        <ol className="grid grid-cols-4 gap-gap-sm">
          {retreat.events.map((event, index) => (
            <TimelineEvent key={event.when} event={event} index={index} />
          ))}
        </ol>
      </div>
    </StepView>
  );
}

const views = [AiView, GlassesView, RetreatView];

export function DriversSlide({ step }: SlideProps) {
  const View = views[step];
  return (
    <AnimatePresence mode="wait">
      <View key={step} />
    </AnimatePresence>
  );
}

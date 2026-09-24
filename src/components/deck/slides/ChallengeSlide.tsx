"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { turnover } from "@/content/content";
import { easeDrawn, easeSweep } from "@/lib/motion";
import { CountUp, MaskedLines, StepView, fadeReveal, useProgress } from "../primitives";
import type { SlideProps } from "../slides";

const MONTHS_PER_YEAR = 12;

const strikeThrough: Variants = {
  enter: { scaleX: 0 },
  present: { scaleX: 1, transition: { duration: 0.6, ease: easeSweep, delay: 1 } },
};
const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const percent = (value: number) => `${Math.round(value)}%`;

function replacedSeats(annualRate: number, seats: number) {
  const replaced = Math.round((annualRate / 100) * seats);
  return new Set(Array.from({ length: replaced }, (_, index) => Math.floor(((index + 0.5) * seats) / replaced)));
}

const PERSON_PATH = "M4 80 V52 a16 16 0 0 1 16 -16 a16 16 0 0 1 16 16 V80 Z";

function Person({ tone }: { tone: "ink" | "ocean" }) {
  const fill = tone === "ocean" ? "var(--color-ocean)" : "var(--color-ink)";
  return (
    <>
      <circle cx={20} cy={16} r={12} fill={fill} />
      <path d={PERSON_PATH} fill={fill} />
    </>
  );
}

function leaves(delay: number): Variants {
  return {
    enter: { opacity: 1, y: 0 },
    present: { opacity: 0, y: 24, transition: { duration: 0.6, ease: easeSweep, delay } },
  };
}

function arrives(delay: number): Variants {
  return {
    enter: { opacity: 0, y: -60 },
    present: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeDrawn, delay: delay + 0.4 } },
  };
}

function Seat({ index, isReplaced, rowDelay }: { index: number; isReplaced: boolean; rowDelay: number }) {
  const delay = rowDelay + index * 0.06;
  return (
    <g transform={`translate(${index * 62} 0)`}>
      {isReplaced ? (
        <>
          <motion.g variants={leaves(delay)}>
            <Person tone="ink" />
          </motion.g>
          <motion.g variants={arrives(delay)} transform="translate(0 0)">
            <Person tone="ocean" />
          </motion.g>
        </>
      ) : (
        <Person tone="ink" />
      )}
    </g>
  );
}

function SectorRow({ name, monthlySeparationRate, rowIndex }: { name: string; monthlySeparationRate: number; rowIndex: number }) {
  const annualRate = monthlySeparationRate * MONTHS_PER_YEAR;
  const rowDelay = 0.8 + rowIndex * 0.5;
  const progress = useProgress(1.8, rowDelay);
  const replaced = replacedSeats(annualRate, turnover.seatsPerRow);
  return (
    <motion.div variants={fadeReveal(rowDelay - 0.3)} className="grid grid-cols-[500px_1fr] items-end gap-gap">
      <div>
        <p className="text-display font-black">
          <CountUp progress={progress} total={annualRate} format={percent} />
        </p>
        <p className="mt-2 text-caption">
          <span className="block font-bold">{name}</span>
          <span className="text-ink-muted">{monthlySeparationRate}% a month × 12 months</span>
        </p>
      </div>
      <svg viewBox={`0 0 ${turnover.seatsPerRow * 62} 84`} className="mb-3 w-full overflow-visible" role="img" aria-label={`${replaced.size} of ${turnover.seatsPerRow} ${name.toLowerCase()} workers replaced in a year`}>
        {Array.from({ length: turnover.seatsPerRow }, (_, index) => (
          <Seat key={index} index={index} isReplaced={replaced.has(index)} rowDelay={rowDelay + 0.4} />
        ))}
      </svg>
    </motion.div>
  );
}

function TurnoverView() {
  return (
    <StepView className="flex flex-col justify-between">
      <h2 className="max-w-[1500px] text-headline font-extrabold">
        <MaskedLines lines={["Every new hire costs owners", "time they don’t have."]} delay={0.1} />
      </h2>
      <div className="flex flex-col gap-10">
        {turnover.sectors.map((sector, rowIndex) => (
          <SectorRow key={sector.name} {...sector} rowIndex={rowIndex} />
        ))}
        <motion.p variants={fadeReveal(2.6)} className="flex items-center gap-4 text-caption text-ink-muted">
          <svg aria-hidden viewBox="0 0 40 84" className="h-9 w-auto">
            <Person tone="ocean" />
          </svg>
          A new hire who has to be trained
        </motion.p>
      </div>
    </StepView>
  );
}

const { replacement, quote } = turnover;
const hiresPerStore = Math.round(replacement.costPerStore / replacement.costPerHire);

function tallySegment(index: number): Variants {
  return {
    enter: { scaleX: 0 },
    present: { scaleX: 1, transition: { duration: 0.35, ease: easeDrawn, delay: 1.2 + index * 0.09 } },
  };
}

function CostTally() {
  const progress = useProgress(hiresPerStore * 0.09 + 0.4, 1.2);
  return (
    <div className="mt-auto">
      <div className="flex items-baseline justify-between">
        <p className="text-caption text-ink-muted figures-tabular">
          {hiresPerStore} replacements × {dollars.format(replacement.costPerHire)}
        </p>
        <p className="text-title font-extrabold">
          <CountUp progress={progress} total={replacement.costPerStore} format={(value) => dollars.format(Math.round(value / 100) * 100)} />
        </p>
      </div>
      <div className="mt-4 flex gap-1.5" role="img" aria-label={`${hiresPerStore} segments of ${dollars.format(replacement.costPerHire)} add up to ${dollars.format(replacement.costPerStore)}`}>
        {Array.from({ length: hiresPerStore }, (_, index) => (
          <motion.span key={index} variants={tallySegment(index)} className="h-16 flex-1 origin-left bg-ocean" />
        ))}
      </div>
      <p className="mt-3 text-right text-caption font-semibold">{replacement.storeCaption}</p>
    </div>
  );
}

function QuoteCard() {
  return (
    <motion.figure variants={fadeReveal(0.9, 30)} className="flex flex-col justify-between rounded-card bg-paper-raised p-12 shadow-lift">
      <blockquote className="text-title font-bold">“{quote.text}”</blockquote>
      <figcaption className="mt-10 text-caption">
        <span className="block font-bold">{quote.speaker}</span>
        <span className="text-ink-muted">{quote.role}</span>
      </figcaption>
    </motion.figure>
  );
}

function CostView() {
  const progress = useProgress(1.4, 0.2);
  return (
    <StepView className="grid grid-cols-[1fr_620px] gap-gap">
      <div className="flex flex-col">
        <p className="text-poster font-black">
          <CountUp progress={progress} total={replacement.costPerHire} format={(value) => dollars.format(Math.round(value / 10) * 10)} />
        </p>
        <motion.p variants={fadeReveal(0.5)} className="mt-4 text-lede font-bold">
          {replacement.caption}
        </motion.p>
        <motion.p variants={fadeReveal(0.7)} className="mt-3 text-caption text-ink-muted">
          {replacement.label}, the most recent industry figure we found
        </motion.p>
        <CostTally />
      </div>
      <QuoteCard />
    </StepView>
  );
}

function ReframeView() {
  const { reframe } = turnover;
  return (
    <StepView className="flex flex-col">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[reframe.heading]} delay={0.1} />
      </h2>
      <div className="mt-auto mb-auto flex flex-col gap-16">
        <motion.div variants={fadeReveal(0.4)}>
          <p className="text-caption font-semibold text-ink-muted">{reframe.industryLabel}</p>
          <p className="relative mt-2 inline-block text-lede text-ink-muted">
            {reframe.industryQuestion}
            <motion.span aria-hidden variants={strikeThrough} className="absolute inset-x-0 top-1/2 h-1 origin-left bg-rival" />
          </p>
        </motion.div>
        <motion.div variants={fadeReveal(1.4, 30)}>
          <p className="text-caption font-semibold text-ocean">{reframe.ourLabel}</p>
          <p className="mt-2 max-w-[1500px] text-headline font-extrabold">{reframe.ourQuestion}</p>
        </motion.div>
      </div>
    </StepView>
  );
}

const RINGS = { cx: 400, cy: 400, center: 120, step: 88 };

function ringAppears(index: number): Variants {
  return {
    enter: { opacity: 0, scale: 0.85 },
    present: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeDrawn, delay: 0.5 + index * 0.3 } },
  };
}

function TierRings() {
  const { tiers, center } = turnover.noncustomers;
  return (
    <svg viewBox="0 0 800 800" className="h-[760px] w-[760px] overflow-visible" role="img" aria-label="Three rings of noncustomers surround today's training market">
      {[...tiers].reverse().map((tier, reversedIndex) => {
        const index = tiers.length - 1 - reversedIndex;
        const radius = RINGS.center + (index + 1) * RINGS.step;
        return (
          <motion.g key={tier.tier} variants={ringAppears(index)} style={{ originX: "400px", originY: "400px" }}>
            <circle cx={RINGS.cx} cy={RINGS.cy} r={radius} fill={index === 1 ? "var(--color-ocean-wash)" : "var(--color-paper-raised)"} stroke="var(--color-paper)" strokeWidth={6} />
            <text x={RINGS.cx} y={RINGS.cy - radius + 54} textAnchor="middle" className="text-caption font-bold" fill={index === 1 ? "var(--color-ocean-deep)" : "var(--color-ink)"}>
              {tier.tier}
            </text>
          </motion.g>
        );
      })}
      <circle cx={RINGS.cx} cy={RINGS.cy} r={RINGS.center} fill="var(--color-ink)" />
      <text x={RINGS.cx} y={RINGS.cy - 8} textAnchor="middle" fill="var(--color-paper)" className="text-caption font-semibold">
        {center.split(" ").slice(0, 2).join(" ")}
      </text>
      <text x={RINGS.cx} y={RINGS.cy + 26} textAnchor="middle" fill="var(--color-paper)" className="text-caption font-semibold">
        {center.split(" ").slice(2).join(" ")}
      </text>
    </svg>
  );
}

function NoncustomerView() {
  const { noncustomers } = turnover;
  return (
    <StepView className="grid grid-cols-[760px_1fr] items-center gap-gap">
      <TierRings />
      <div>
        <h2 className="text-title font-extrabold">
          <MaskedLines lines={[noncustomers.heading]} delay={0.1} />
        </h2>
        <dl className="mt-12 flex flex-col gap-9">
          {noncustomers.tiers.map((tier, index) => (
            <motion.div key={tier.tier} variants={fadeReveal(0.6 + index * 0.3, 20)}>
              <dt className="text-point font-bold">
                {tier.tier} <span className={index === 1 ? "text-ocean" : "text-ink-muted"}>{tier.name}</span>
              </dt>
              <dd className="mt-1 text-body text-ink-muted">{tier.who}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </StepView>
  );
}

const views = [TurnoverView, CostView, ReframeView, NoncustomerView];

export function ChallengeSlide({ step }: SlideProps) {
  const View = views[step];
  return (
    <AnimatePresence mode="wait">
      <View key={step} />
    </AnimatePresence>
  );
}

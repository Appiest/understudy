"use client";

import { ArrowSquareOut } from "@phosphor-icons/react";
import { motion, type Variants } from "motion/react";
import { useState } from "react";
import { team } from "@/content/config";
import { compactDollars, useOfFunds, type FundMilestone, type FundUse } from "@/content/content";
import { easeSweep } from "@/lib/motion";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

const BAR = { width: 1696, height: 96, gap: 6 };
const allocations: FundUse[] = [...useOfFunds.uses, useOfFunds.reserve];
const barWidthWithoutGaps = BAR.width - BAR.gap * (allocations.length - 1);

/** The darkest fills go to the biggest uses, and the reserve is hatched because it stays unspent. */
const segmentFill = ["bg-ocean-deep", "bg-ocean", "bg-ocean-chart", "bg-ocean-wash", "bg-rule", "hatch bg-paper-raised"];
const SEGMENT_DELAY = 0.5;
const SEGMENT_STAGGER = 0.14;

function shareOf(use: FundUse) {
  return use.amount / useOfFunds.raise;
}

function percentOf(use: FundUse) {
  return `${Math.round(shareOf(use) * 100)}%`;
}

const barWipe: Variants = {
  enter: { clipPath: "inset(0 100% 0 0)" },
  present: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.4, ease: easeSweep, delay: SEGMENT_DELAY } },
};

function dimmedUnless(active: number | null, index: number) {
  return active === null || active === index ? "opacity-100" : "opacity-30";
}

type HighlightProps = { active: number | null; onHighlight: (index: number | null) => void };

function AllocationBar({ active, onHighlight }: HighlightProps) {
  return (
    <motion.div
      variants={barWipe}
      className="flex shrink-0"
      style={{ width: BAR.width, height: BAR.height, gap: BAR.gap }}
      role="img"
      aria-label={allocations.map((use) => `${use.name} ${percentOf(use)}`).join(", ")}
      onPointerLeave={() => onHighlight(null)}
    >
      {allocations.map((use, index) => (
        <div
          key={use.name}
          onPointerEnter={() => onHighlight(index)}
          className={`h-full rounded-card transition-opacity duration-300 ${segmentFill[index]} ${dimmedUnless(active, index)}`}
          style={{ width: barWidthWithoutGaps * shareOf(use) }}
        />
      ))}
    </motion.div>
  );
}

function AllocationRow({ use, index, active, onHighlight }: HighlightProps & { use: FundUse; index: number }) {
  return (
    <motion.li variants={fadeReveal(SEGMENT_DELAY + 0.5 + index * SEGMENT_STAGGER, 12)}>
      <button
        type="button"
        onPointerEnter={() => onHighlight(index)}
        onFocus={() => onHighlight(index)}
        onBlur={() => onHighlight(null)}
        className={`flex w-full items-start gap-5 text-left transition-opacity duration-300 ${dimmedUnless(active, index)}`}
      >
        <span aria-hidden className={`mt-1.5 h-8 w-8 shrink-0 rounded-lg ${segmentFill[index]}`} />
        <span className="flex flex-1 flex-col">
          <span className="text-body font-bold">{use.name}</span>
          <span className="text-caption text-pretty text-ink-muted">{use.detail}</span>
        </span>
        <span className="flex flex-col items-end figures-tabular">
          <span className="text-body font-bold">{compactDollars.format(use.amount)}</span>
          <span className="text-caption text-ink-muted">{percentOf(use)}</span>
        </span>
      </button>
    </motion.li>
  );
}

function AllocationList(props: HighlightProps) {
  return (
    <ol className="grid flex-1 grid-flow-col grid-cols-2 grid-rows-3 gap-x-gap gap-y-8" onPointerLeave={() => props.onHighlight(null)}>
      {allocations.map((use, index) => (
        <AllocationRow key={use.name} use={use} index={index} {...props} />
      ))}
    </ol>
  );
}

function Milestone({ milestone }: { milestone: FundMilestone }) {
  return (
    <div>
      <dt className="text-point font-extrabold text-ocean figures-tabular">{milestone.value}</dt>
      <dd className="text-caption text-ink-muted">{milestone.label}</dd>
    </div>
  );
}

function SpreadsheetLink() {
  return (
    <a href={team.proFormaLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 self-start text-caption font-bold text-ocean underline decoration-1 underline-offset-4">
      {useOfFunds.spreadsheetLink}
      <ArrowSquareOut size={24} weight="bold" aria-hidden />
    </a>
  );
}

function Milestones() {
  return (
    <motion.div variants={fadeReveal(1.6, 16)} className="flex w-[520px] shrink-0 flex-col justify-between gap-6 rounded-card bg-paper-raised p-8 shadow-lift">
      <dl className="flex flex-col gap-4">
        {useOfFunds.milestones.map((milestone) => (
          <Milestone key={milestone.value} milestone={milestone} />
        ))}
      </dl>
      <SpreadsheetLink />
    </motion.div>
  );
}

export function UseOfFundsSlide() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <StepView className="flex flex-col gap-12">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[useOfFunds.headline]} delay={0.05} />
      </h2>
      <AllocationBar active={active} onHighlight={setActive} />
      <div className="flex min-h-0 flex-1 items-stretch gap-gap">
        <AllocationList active={active} onHighlight={setActive} />
        <Milestones />
      </div>
    </StepView>
  );
}

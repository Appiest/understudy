"use client";

import { motion, type Variants } from "motion/react";
import { grantFunds } from "@/content/content";
import { easeDrawn, exitTransition } from "@/lib/motion";
import { FillIn } from "../FillIn";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

type LineItem = (typeof grantFunds.lineItems)[number];
type Segment = { key: string; label: string; dollars: number; fill: string };

const SEGMENT_FILLS = ["bg-ocean", "bg-ocean-chart", "bg-ocean-deep", "bg-ocean-wash"];
const UNASSIGNED_FILL = "bg-paper-sunken";
const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const fillFor = (index: number) => SEGMENT_FILLS[index % SEGMENT_FILLS.length];
const assigned = grantFunds.lineItems.reduce((sum, item) => sum + item.amount, 0);
const unassigned = Math.max(grantFunds.amount - assigned, 0);
const barTotal = Math.max(grantFunds.amount, assigned);

const segments: Segment[] = [
  ...grantFunds.lineItems.map((item, index) => ({ key: item.name, label: item.name, dollars: item.amount, fill: fillFor(index) })),
  { key: "unassigned", label: grantFunds.unassignedLabel, dollars: unassigned, fill: UNASSIGNED_FILL },
].filter((segment) => segment.dollars > 0);

const barGrow: Variants = {
  enter: { scaleX: 0 },
  present: { scaleX: 1, transition: { duration: 1.2, ease: easeDrawn, delay: 0.4 } },
  exit: { opacity: 0, transition: exitTransition },
};

function GrantBar() {
  const label = segments.map((segment) => `${segment.label}: ${dollars.format(segment.dollars)}`).join(", ");
  return (
    <div className="flex items-center gap-10">
      <p className="text-display font-black figures-tabular">{dollars.format(grantFunds.amount)}</p>
      <motion.div variants={barGrow} role="img" aria-label={label} className="flex h-24 flex-1 origin-left overflow-hidden rounded-sm">
        {segments.map((segment) => (
          <div key={segment.key} className={segment.fill} style={{ width: `${(segment.dollars / barTotal) * 100}%` }} />
        ))}
      </motion.div>
    </div>
  );
}

function LineItemRow({ item, index }: { item: LineItem; index: number }) {
  return (
    <motion.li variants={fadeReveal(0.8 + index * 0.1, 12)} className="grid grid-cols-[28px_1fr_auto] items-baseline gap-6">
      <span aria-hidden className={`size-6 rounded-sm ${fillFor(index)}`} />
      <p className="text-body font-bold">
        {item.name}
        {"detail" in item && <span className="ml-4 text-caption font-semibold text-ink-muted">{item.detail}</span>}
      </p>
      <p className="text-point font-extrabold figures-tabular">{dollars.format(item.amount)}</p>
    </motion.li>
  );
}

function UnassignedRow() {
  if (unassigned === 0) return null;
  return (
    <li className="grid grid-cols-[28px_1fr_auto] items-baseline gap-6 text-ink-muted">
      <span aria-hidden className={`size-6 rounded-sm ${UNASSIGNED_FILL}`} />
      <p className="text-body font-bold">{grantFunds.unassignedLabel}</p>
      <p className="text-point font-extrabold figures-tabular">{dollars.format(unassigned)}</p>
    </li>
  );
}

function LineItems() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-right text-caption font-semibold text-ink-muted">{grantFunds.estimateLabel}</p>
      <ul className="flex flex-col gap-6">
        {grantFunds.lineItems.map((item, index) => (
          <LineItemRow key={item.name} item={item} index={index} />
        ))}
        <UnassignedRow />
      </ul>
    </div>
  );
}

function OutcomeCard() {
  return (
    <motion.dl variants={fadeReveal(1.2, 20)} className="flex flex-col gap-8 rounded-card bg-paper-raised p-10 shadow-lift">
      <div>
        <dt className="text-caption font-semibold text-ink-muted">{grantFunds.milestoneLabel}</dt>
        <dd className="mt-2 text-body font-bold">
          <FillIn value={grantFunds.milestone} />
        </dd>
      </div>
      <div>
        <dt className="text-caption font-semibold text-ink-muted">{grantFunds.measureLabel}</dt>
        {grantFunds.metrics.map((metric) => (
          <dd key={metric} className="mt-2 text-body font-bold">
            {metric}
          </dd>
        ))}
      </div>
    </motion.dl>
  );
}

export function GrantFundsSlide() {
  return (
    <StepView className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="max-w-[1500px] text-title font-extrabold">
          <MaskedLines lines={[grantFunds.headline]} delay={0.05} />
        </h2>
        <motion.p variants={fadeReveal(0.3)} className="text-lede font-semibold text-ink-muted">
          {grantFunds.goal}
        </motion.p>
      </div>
      <GrantBar />
      <div className="grid flex-1 grid-cols-[1fr_640px] items-start gap-gap">
        <LineItems />
        <OutcomeCard />
      </div>
    </StepView>
  );
}

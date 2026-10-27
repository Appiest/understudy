"use client";

import { motion, type Variants } from "motion/react";
import { team } from "@/content/config";
import { useOfFunds } from "@/content/content";
import { easeDrawn, exitTransition } from "@/lib/motion";
import { DocLink, MaskedLines, StepView, fadeReveal } from "../primitives";

type FundsRow = { name: string; detail: string; fromRaise: number };

const ROW_STAGGER = 0.08;
const LABEL_SPACE = "210px";
const largestShare = Math.max(...useOfFunds.categories.map((category) => category.fromRaise));
const reserveDelay = 0.45 + useOfFunds.categories.length * ROW_STAGGER;
const compactDollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 0 });

function barGrow(delay: number): Variants {
  return {
    enter: { scaleX: 0 },
    present: { scaleX: 1, transition: { duration: 1.1, ease: easeDrawn, delay } },
    exit: { opacity: 0, transition: exitTransition },
  };
}

function shareOfRaise(dollars: number) {
  return `${Math.round((dollars / useOfFunds.raiseAmount) * 100)}%`;
}

function FundsBar({ row, delay, isReserve }: { row: FundsRow; delay: number; isReserve: boolean }) {
  return (
    <div className="flex items-center gap-5">
      <motion.div
        variants={barGrow(delay)}
        className={`h-12 origin-left rounded-r-sm ${isReserve ? "hatch-reserve" : "bg-ocean"}`}
        style={{ width: `calc(${row.fromRaise / largestShare} * (100% - ${LABEL_SPACE}))` }}
      />
      <p className="flex shrink-0 items-baseline gap-3 figures-tabular">
        <span className={`text-point font-extrabold ${isReserve ? "text-ink-muted" : "text-ink"}`}>{compactDollars.format(row.fromRaise)}</span>
        <span className="text-caption font-semibold text-ink-muted">{shareOfRaise(row.fromRaise)}</span>
      </p>
    </div>
  );
}

function FundsRowItem({ row, delay, isReserve = false }: { row: FundsRow; delay: number; isReserve?: boolean }) {
  return (
    <motion.li variants={fadeReveal(delay - 0.1)} className="grid grid-cols-[480px_1fr] items-center gap-8">
      <div>
        <p className="text-body font-bold">{row.name}</p>
        <p className="text-caption text-ink-muted">{row.detail}</p>
      </div>
      <FundsBar row={row} delay={delay} isReserve={isReserve} />
    </motion.li>
  );
}

function FundsChart() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-10">
      <ol className="flex flex-col gap-6" aria-label="Spending from the raise, January 2027 to December 2028">
        {useOfFunds.categories.map((category, index) => (
          <FundsRowItem key={category.name} row={category} delay={0.35 + index * ROW_STAGGER} />
        ))}
      </ol>
      <ul>
        <FundsRowItem row={useOfFunds.reserve} delay={reserveDelay} isReserve />
      </ul>
    </div>
  );
}

function Outcomes() {
  return (
    <motion.div variants={fadeReveal(reserveDelay + 0.2)} className="flex w-[560px] shrink-0 flex-col gap-12 self-start rounded-card bg-paper-raised p-10 shadow-lift">
      <dl className="flex flex-col gap-8">
        {useOfFunds.outcomes.map((outcome) => (
          <div key={outcome.label}>
            <dt className="text-caption text-ink-muted">{outcome.label}</dt>
            <dd className="text-title font-black figures-tabular">{outcome.value}</dd>
            {outcome.detail && <dd className="text-caption text-ink-muted">{outcome.detail}</dd>}
          </div>
        ))}
      </dl>
      <DocLink href={team.proFormaLink}>{useOfFunds.docLink}</DocLink>
    </motion.div>
  );
}

export function UseOfFundsSlide() {
  return (
    <StepView className="flex flex-col gap-14">
      <h2 className="max-w-[1500px] text-title font-extrabold">
        <MaskedLines lines={[useOfFunds.headline]} delay={0.05} />
      </h2>
      <div className="flex min-h-0 flex-1 gap-gap">
        <FundsChart />
        <Outcomes />
      </div>
    </StepView>
  );
}

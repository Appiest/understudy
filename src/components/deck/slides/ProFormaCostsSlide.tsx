"use client";

import { motion, type Variants } from "motion/react";
import { proFormaCosts, type ProFormaYear } from "@/content/content";
import { easeDrawn, exitTransition } from "@/lib/motion";
import { MaskedLines, StepView, fadeReveal } from "../primitives";
import { AssumptionList, compactDollars } from "./AssumptionList";

const PLOT_HEIGHT = 500;
const YEAR_STAGGER = 0.14;
const largestAmount = Math.max(...proFormaCosts.years.flatMap((year) => [year.revenue, year.spending]));

const series = {
  revenue: { label: proFormaCosts.legend.revenue, fill: "bg-ocean" },
  spending: { label: proFormaCosts.legend.spending, fill: "bg-ink-faint" },
};

type SeriesKey = keyof typeof series;

function barRise(delay: number): Variants {
  return {
    enter: { scaleY: 0 },
    present: { scaleY: 1, transition: { duration: 1.1, ease: easeDrawn, delay } },
    exit: { opacity: 0, transition: exitTransition },
  };
}

function AmountBar({ amount, seriesKey, delay }: { amount: number; seriesKey: SeriesKey; delay: number }) {
  return (
    <div className="flex w-[96px] flex-col items-center justify-end">
      <motion.p variants={fadeReveal(delay + 0.5)} className="text-caption font-bold figures-tabular">
        {compactDollars.format(amount)}
      </motion.p>
      <motion.div
        variants={barRise(delay)}
        className={`mt-2 w-full origin-bottom rounded-t-sm ${series[seriesKey].fill}`}
        style={{ height: (amount / largestAmount) * PLOT_HEIGHT }}
      />
    </div>
  );
}

function YearBars({ year, index }: { year: ProFormaYear; index: number }) {
  const delay = 0.4 + index * YEAR_STAGGER;
  return (
    <div className="flex flex-1 items-end justify-center gap-1">
      <AmountBar amount={year.revenue} seriesKey="revenue" delay={delay} />
      <AmountBar amount={year.spending} seriesKey="spending" delay={delay + 0.06} />
    </div>
  );
}

function ProfitFigure({ year }: { year: ProFormaYear }) {
  const isProfit = year.ebitda > 0;
  const label = isProfit ? proFormaCosts.profitLabel : proFormaCosts.lossLabel;
  return (
    <p className={`text-body figures-tabular ${isProfit ? "font-black text-ocean" : "font-semibold text-ink-muted"}`}>
      {compactDollars.format(Math.abs(year.ebitda))} {label}
    </p>
  );
}

function YearLabels() {
  return (
    <div className="flex">
      {proFormaCosts.years.map((year) => (
        <div key={year.year} className="flex flex-1 flex-col items-center pt-4">
          <p className="text-body font-bold figures-tabular">{year.year}</p>
          <ProfitFigure year={year} />
        </div>
      ))}
    </div>
  );
}

function Legend() {
  return (
    <motion.ul variants={fadeReveal(0.3)} className="flex gap-8 text-caption font-semibold">
      {Object.entries(series).map(([key, entry]) => (
        <li key={key} className="flex items-center gap-3">
          <span aria-hidden className={`size-5 rounded-sm ${entry.fill}`} />
          {entry.label}
        </li>
      ))}
    </motion.ul>
  );
}

function RevenueSpendingChart() {
  return (
    <figure className="flex min-w-0 flex-1 flex-col justify-between" aria-label="Revenue and spending each year, 2027 to 2030, with the profit or loss below each year">
      <Legend />
      <div>
        <div className="flex items-end border-b-2 border-ink">
          {proFormaCosts.years.map((year, index) => (
            <YearBars key={year.year} year={year} index={index} />
          ))}
        </div>
        <YearLabels />
      </div>
    </figure>
  );
}

export function ProFormaCostsSlide() {
  return (
    <StepView className="flex flex-col gap-14">
      <h2 className="max-w-[1500px] text-title font-extrabold">
        <MaskedLines lines={[proFormaCosts.headline]} delay={0.05} />
      </h2>
      <div className="flex min-h-0 flex-1 gap-gap">
        <RevenueSpendingChart />
        <AssumptionList assumptions={proFormaCosts.assumptions} delay={1} />
      </div>
    </StepView>
  );
}

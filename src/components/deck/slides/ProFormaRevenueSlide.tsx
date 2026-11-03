"use client";

import { motion, type Variants } from "motion/react";
import { proFormaRevenue, type ProFormaYear } from "@/content/content";
import { easeDrawn, exitTransition } from "@/lib/motion";
import { ReadingDetail } from "../pitchMode";
import { MaskedLines, StepView, fadeReveal } from "../primitives";
import { AssumptionList, compactDollars } from "./AssumptionList";

const PLOT_HEIGHT = 520;
const BAR_STAGGER = 0.14;
const mostStores = Math.max(...proFormaRevenue.years.map((year) => year.payingStores));
const wholeNumber = new Intl.NumberFormat("en-US");

function barRise(delay: number): Variants {
  return {
    enter: { scaleY: 0 },
    present: { scaleY: 1, transition: { duration: 1.1, ease: easeDrawn, delay } },
    exit: { opacity: 0, transition: exitTransition },
  };
}

function SomMarker({ delay }: { delay: number }) {
  return (
    <motion.p variants={fadeReveal(delay)} className="mb-3 rounded-chip bg-ocean px-4 py-1 text-caption font-bold text-paper">
      {proFormaRevenue.somLabel}
    </motion.p>
  );
}

function StoreBar({ year, index }: { year: ProFormaYear; index: number }) {
  const delay = 0.4 + index * BAR_STAGGER;
  const isSomYear = year.year === proFormaRevenue.somYear;
  return (
    <div className="flex flex-1 flex-col items-center justify-end">
      {isSomYear && <SomMarker delay={delay + 0.6} />}
      <motion.p variants={fadeReveal(delay + 0.5)} className="text-title font-black figures-tabular">
        {wholeNumber.format(year.payingStores)}
      </motion.p>
      <motion.div
        variants={barRise(delay)}
        className="mt-3 w-[150px] origin-bottom rounded-t-sm bg-ocean"
        style={{ height: (year.payingStores / mostStores) * PLOT_HEIGHT }}
      />
    </div>
  );
}

function YearLabels() {
  return (
    <div className="flex">
      {proFormaRevenue.years.map((year) => (
        <div key={year.year} className="flex flex-1 flex-col items-center pt-4">
          <p className="text-body font-bold figures-tabular">{year.year}</p>
          <ReadingDetail>
            <p className="text-caption text-ink-muted figures-tabular">{compactDollars.format(year.revenue)} revenue</p>
          </ReadingDetail>
        </div>
      ))}
    </div>
  );
}

function StoresChart() {
  return (
    <figure className="flex min-w-0 flex-1 flex-col justify-end" aria-label="Paying stores at the end of each year, 2027 to 2030">
      <div className="flex items-end border-b-2 border-ink">
        {proFormaRevenue.years.map((year, index) => (
          <StoreBar key={year.year} year={year} index={index} />
        ))}
      </div>
      <YearLabels />
    </figure>
  );
}

export function ProFormaRevenueSlide() {
  return (
    <StepView className="flex flex-col gap-14">
      <h2 className="max-w-[1500px] text-title font-extrabold">
        <MaskedLines lines={[proFormaRevenue.headline]} delay={0.05} />
      </h2>
      <div className="flex min-h-0 flex-1 gap-gap">
        <StoresChart />
        <AssumptionList assumptions={proFormaRevenue.assumptions} delay={1} />
      </div>
    </StepView>
  );
}

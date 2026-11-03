"use client";

import { motion } from "motion/react";
import { team } from "@/content/config";
import type { Assumption } from "@/content/content";
import { ReadingDetail, useIsPitch } from "../pitchMode";
import { DocLink, fadeReveal } from "../primitives";

export const compactDollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumSignificantDigits: 3 });

export function AssumptionList({ assumptions, delay }: { assumptions: Assumption[]; delay: number }) {
  return (
    <motion.div variants={fadeReveal(delay)} className={`flex w-[620px] shrink-0 flex-col gap-10 rounded-card bg-paper-raised p-10 shadow-lift ${useIsPitch() ? "self-center" : "self-stretch"}`}>
      <dl className="flex flex-col gap-7">
        {assumptions.map((assumption) => (
          <div key={assumption.name}>
            <dt className="text-caption font-bold">
              <span className="mr-3 text-point font-black figures-tabular">{assumption.value}</span>
              {assumption.name}
            </dt>
            <ReadingDetail>
              <dd className="text-caption text-ink-muted">{assumption.why}</dd>
            </ReadingDetail>
          </div>
        ))}
      </dl>
      <ReadingDetail>
        <div className="mt-auto">
          <DocLink href={team.proFormaLink}>Open our pro forma spreadsheet</DocLink>
        </div>
      </ReadingDetail>
    </motion.div>
  );
}

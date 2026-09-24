"use client";

import { motion } from "motion/react";
import { appendix } from "@/content/content";
import { sources, type Source } from "@/content/sources";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

const entries: Source[] = Object.values(sources);

export function SourcesSlide() {
  return (
    <StepView className="flex flex-col gap-10">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[appendix.headline]} delay={0.05} />
      </h2>
      <motion.ol variants={fadeReveal(0.3)} className="columns-2 gap-gap text-fineprint">
        {entries.map((source) => (
          <li key={source.title} className="mb-4 break-inside-avoid">
            <p className="font-semibold">{source.title}</p>
            {source.url && (
              <a href={source.url} target="_blank" rel="noreferrer" className="break-words text-ocean underline decoration-1 underline-offset-4">
                {source.url}
              </a>
            )}
          </li>
        ))}
      </motion.ol>
    </StepView>
  );
}

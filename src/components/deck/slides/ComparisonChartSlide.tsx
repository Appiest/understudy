"use client";

import { UsersThree } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { chartCompetitors, chartSources, comparisonChart, comparisonRows, type Competitor, type Verdict } from "@/content/content";
import { CompetitorLogo } from "../CompetitorLogo";
import { MaskedLines, StepView, fadeReveal, footnoteNumbers } from "../primitives";

const LOGO_MAX_WIDTH = 96;
const MARK_RADIUS = 13;

type MarkTone = "ink" | "paper";

const markColors: Record<MarkTone, { fill: string; ring: string }> = {
  ink: { fill: "var(--color-ink)", ring: "var(--color-ink-faint)" },
  paper: { fill: "var(--color-paper)", ring: "var(--color-paper)" },
};

function VerdictMark({ verdict, tone }: { verdict: Verdict; tone: MarkTone }) {
  const { fill, ring } = markColors[tone];
  const size = MARK_RADIUS * 2 + 6;
  const center = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={comparisonChart.legend[verdict]} className="mx-auto block">
      <circle cx={center} cy={center} r={MARK_RADIUS} fill={verdict === "yes" ? fill : "none"} stroke={verdict === "yes" ? fill : ring} strokeWidth={3} />
      {verdict === "partial" && <path d={`M ${center} ${center - MARK_RADIUS} A ${MARK_RADIUS} ${MARK_RADIUS} 0 0 0 ${center} ${center + MARK_RADIUS} Z`} fill={fill} />}
    </svg>
  );
}

function Legend() {
  const verdicts: Verdict[] = ["yes", "partial", "no"];
  return (
    <motion.ul aria-hidden variants={fadeReveal(0.4)} className="flex items-center gap-6 text-caption font-normal text-ink-muted">
      {verdicts.map((verdict) => (
        <li key={verdict} className="flex items-center gap-2">
          <VerdictMark verdict={verdict} tone="ink" />
          {comparisonChart.legend[verdict]}
        </li>
      ))}
    </motion.ul>
  );
}

function ColumnHeader({ competitor }: { competitor: Competitor }) {
  if (competitor.isUs) return <span className="text-caption font-extrabold text-paper">{competitor.name}</span>;
  if (!competitor.logo) {
    return (
      <span className="flex flex-col items-center gap-1 text-fineprint font-bold text-ink-muted">
        <UsersThree size={30} weight="bold" aria-hidden />
        Shadowing
        <span className="font-normal text-ink-faint">{comparisonChart.teamJudgment}</span>
      </span>
    );
  }
  return <CompetitorLogo competitor={competitor} maxWidth={LOGO_MAX_WIDTH} footnote={footnoteNumbers(chartSources, [competitor.source!])[0]} />;
}

function cellClass(competitor: Competitor, isGapRow: boolean) {
  if (competitor.isUs) return "bg-ocean";
  return isGapRow ? "bg-ocean-wash" : "";
}

function HeaderRow() {
  return (
    <tr>
      <th scope="col" className="pl-5 text-left align-middle">
        <span className="sr-only">Feature</span>
        <Legend />
      </th>
      {chartCompetitors.map((competitor) => (
        <th key={competitor.name} scope="col" className={`h-[104px] px-1 align-middle text-caption ${competitor.isUs ? "rounded-t-card bg-ocean" : ""}`}>
          <span className="flex justify-center">
            <ColumnHeader competitor={competitor} />
          </span>
        </th>
      ))}
    </tr>
  );
}

function FeatureRow({ index }: { index: number }) {
  const row = comparisonRows[index];
  const isGapRow = Boolean(row.isGap);
  const isLastRow = index === comparisonRows.length - 1;
  return (
    <motion.tr variants={fadeReveal(0.5 + index * 0.08, 12)}>
      <th scope="row" className={`py-4 pr-6 pl-5 text-left ${isGapRow ? "rounded-l-card bg-ocean-wash" : ""}`}>
        <span className={isGapRow ? "text-body font-extrabold text-ocean-deep" : "text-caption font-semibold"}>{row.feature}</span>
        {row.detail && <span className="block text-caption text-ocean-deep">{row.detail}</span>}
      </th>
      {chartCompetitors.map((competitor) => (
        <td key={competitor.name} className={`py-4 ${cellClass(competitor, isGapRow)} ${competitor.isUs && isLastRow ? "rounded-b-card" : ""} ${isGapRow && competitor === chartCompetitors.at(-1) ? "rounded-r-card" : ""}`}>
          <VerdictMark verdict={competitor.verdicts[index]} tone={competitor.isUs ? "paper" : "ink"} />
        </td>
      ))}
    </motion.tr>
  );
}

export function ComparisonChartSlide() {
  return (
    <StepView className="flex flex-col gap-8">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[comparisonChart.headline]} delay={0.05} />
      </h2>
      <motion.table variants={fadeReveal(0.3)} className="w-full table-fixed border-separate border-spacing-0">
        <colgroup>
          <col className="w-[480px]" />
          {chartCompetitors.map((competitor) => (
            <col key={competitor.name} className={competitor.isUs ? "w-[170px]" : ""} />
          ))}
        </colgroup>
        <caption className="sr-only">How Understudy compares with the ways new hires are trained today</caption>
        <thead>
          <HeaderRow />
        </thead>
        <tbody>
          {comparisonRows.map((row, index) => (
            <FeatureRow key={row.feature} index={index} />
          ))}
        </tbody>
      </motion.table>
    </StepView>
  );
}

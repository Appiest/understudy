"use client";

import { Info } from "@phosphor-icons/react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { canvas, type CanvasPlayer } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { MaskedLines, StepView, fadeReveal, strokeDraw } from "../primitives";
import type { SlideProps } from "../slides";

const CHART = { width: 1696, height: 560, left: 96, right: 330, top: 24, bottom: 520, labelGap: 38 };
const MAX_SCORE = 10;
const plotWidth = CHART.width - CHART.left - CHART.right;
const columnWidth = plotWidth / (canvas.factors.length - 1);

function xForFactor(index: number) {
  return CHART.left + index * columnWidth;
}

function yForScore(score: number) {
  return CHART.bottom - (score / MAX_SCORE) * (CHART.bottom - CHART.top);
}

function curvePath(scores: number[]) {
  return scores.map((score, index) => `${index === 0 ? "M" : "L"} ${xForFactor(index).toFixed(1)} ${yForScore(score).toFixed(1)}`).join(" ");
}

function spreadLabels(players: CanvasPlayer[]) {
  const sorted = players
    .map((player) => ({ name: player.name, y: yForScore(player.scores[player.scores.length - 1]) }))
    .sort((a, b) => a.y - b.y);
  for (let index = 1; index < sorted.length; index += 1) {
    sorted[index].y = Math.max(sorted[index].y, sorted[index - 1].y + CHART.labelGap);
  }
  return new Map(sorted.map((label) => [label.name, label.y]));
}

type Emphasis = "hero" | "normal" | "dimmed" | "hidden";

function emphasisFor(player: CanvasPlayer, focus: string | null, hidden: Set<string>, usRevealed: boolean): Emphasis {
  if (hidden.has(player.name) || (player.isUs && !usRevealed)) return "hidden";
  if (focus) return focus === player.name ? "hero" : "dimmed";
  if (player.isUs) return "hero";
  return usRevealed ? "dimmed" : "normal";
}

const lineStyle: Record<Emphasis, { opacity: number; width: number }> = {
  hero: { opacity: 1, width: 10 },
  normal: { opacity: 0.85, width: 4 },
  dimmed: { opacity: 0.32, width: 3 },
  hidden: { opacity: 0, width: 3 },
};

function Curve({ player, index, emphasis, onFocus }: { player: CanvasPlayer; index: number; emphasis: Emphasis; onFocus: (name: string | null) => void }) {
  const color = player.isUs ? "var(--color-ocean)" : "var(--color-rival)";
  const style = lineStyle[emphasis];
  const width = player.isUs ? Math.max(style.width, 10) : style.width;
  const delay = player.isUs ? 0.2 : 0.5 + index * 0.25;
  return (
    <g
      style={{ opacity: style.opacity }}
      onPointerEnter={() => onFocus(player.name)}
      onPointerLeave={() => onFocus(null)}
      data-interactive
      className="cursor-pointer transition-opacity duration-200"
    >
      <path d={curvePath(player.scores)} fill="none" stroke="transparent" strokeWidth={28} />
      <motion.path d={curvePath(player.scores)} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" variants={strokeDraw(delay, player.isUs ? 1.8 : 1.2)} />
      {player.scores.map((score, factor) => (
        <motion.circle key={factor} cx={xForFactor(factor)} cy={yForScore(score)} r={player.isUs ? 11 : 6} fill={color} variants={fadeReveal(delay + 0.9)} />
      ))}
    </g>
  );
}

function Grid() {
  return (
    <g>
      {canvas.factors.map((factor, index) => (
        <line key={factor} x1={xForFactor(index)} x2={xForFactor(index)} y1={CHART.top} y2={CHART.bottom} stroke="var(--color-rule)" strokeWidth={1.5} />
      ))}
      <line x1={CHART.left} x2={CHART.width - CHART.right} y1={CHART.bottom} y2={CHART.bottom} stroke="var(--color-ink)" strokeWidth={3} />
      <text x={CHART.left - 28} y={CHART.top + 10} textAnchor="end" className="text-caption font-semibold" fill="var(--color-ink-muted)">{canvas.axis.high}</text>
      <text x={CHART.left - 28} y={CHART.bottom} textAnchor="end" className="text-caption font-semibold" fill="var(--color-ink-muted)">{canvas.axis.low}</text>
    </g>
  );
}

function LabelButton({ player, y, emphasis, onToggle, onFocus }: { player: CanvasPlayer; y: number; emphasis: Emphasis; onToggle: () => void; onFocus: (name: string | null) => void }) {
  const isHidden = emphasis === "hidden";
  const tone = player.isUs ? "text-ocean" : "text-rival";
  return (
    <button
      type="button"
      aria-pressed={!isHidden}
      onClick={onToggle}
      onPointerEnter={() => onFocus(player.name)}
      onPointerLeave={() => onFocus(null)}
      className={`absolute flex -translate-y-1/2 items-center gap-3 rounded-full py-1 pr-3 pl-2 text-left whitespace-nowrap transition-[opacity,background-color] duration-150 hover:bg-paper-raised ${isHidden ? "opacity-35" : ""}`}
      style={{ left: CHART.width - CHART.right + 22, top: y }}
    >
      <span aria-hidden className={`h-3.5 w-3.5 shrink-0 rounded-full ${player.isUs ? "bg-ocean" : "bg-rival"} ${isHidden ? "opacity-40" : ""}`} />
      <span className={`leading-none ${player.isUs ? "text-point font-extrabold" : "text-caption font-semibold"} ${isHidden ? "line-through" : tone}`}>{player.name}</span>
    </button>
  );
}

function FactorLabels() {
  return (
    <>
      {canvas.factors.map((factor, index) => (
        <p key={factor} title={canvas.factorDetails[index]} className="absolute w-[150px] -translate-x-1/2 text-center text-caption leading-tight font-semibold" style={{ left: xForFactor(index), top: CHART.bottom + 18 }}>
          {factor}
        </p>
      ))}
    </>
  );
}

function GroupBrackets() {
  const splitX = (xForFactor(canvas.lowerCostFactors - 1) + xForFactor(canvas.lowerCostFactors)) / 2;
  const groups = [
    { label: canvas.groups[0], from: xForFactor(0) - 60, to: splitX - 16, tone: "text-ink-muted" },
    { label: canvas.groups[1], from: splitX + 16, to: xForFactor(canvas.factors.length - 1) + 60, tone: "text-ocean" },
  ];
  return (
    <>
      {groups.map((group) => (
        <motion.div key={group.label} variants={fadeReveal(1.4)} className={`absolute flex flex-col items-center ${group.tone}`} style={{ left: group.from, width: group.to - group.from, top: CHART.bottom + 100 }}>
          <span aria-hidden className="h-3 w-full border-x-[3px] border-b-[3px] border-current" />
          <span className="mt-2 text-caption font-bold">{group.label}</span>
        </motion.div>
      ))}
    </>
  );
}

function StrategyCanvas({ usRevealed }: { usRevealed: boolean }) {
  const [focus, setFocus] = useState<string | null>(null);
  const [hidden, setHidden] = useState<Set<string>>(() => new Set());
  const labelY = spreadLabels(canvas.players);
  const toggle = (name: string) =>
    setHidden((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  const drawn = canvas.players.filter((player) => usRevealed || !player.isUs);

  return (
    <div className="relative" style={{ width: CHART.width, height: CHART.height + 170 }}>
      <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} width={CHART.width} height={CHART.height} className="overflow-visible" role="img" aria-label="Strategy canvas comparing each training option's offering level across ten factors">
        <Grid />
        {drawn.map((player, index) => (
          <Curve key={player.name} player={player} index={index} emphasis={emphasisFor(player, focus, hidden, usRevealed)} onFocus={setFocus} />
        ))}
      </svg>
      {drawn.map((player) => (
        <motion.div key={player.name} variants={fadeReveal(player.isUs ? 1.6 : 1.2)}>
          <LabelButton player={player} y={labelY.get(player.name) ?? 0} emphasis={emphasisFor(player, focus, hidden, usRevealed)} onToggle={() => toggle(player.name)} onFocus={setFocus} />
        </motion.div>
      ))}
      <FactorLabels />
      <GroupBrackets />
    </div>
  );
}

function CanvasView({ usRevealed }: { usRevealed: boolean }) {
  return (
    <StepView className="flex flex-col justify-between">
      <div className="flex items-end justify-between gap-gap">
        <h2 className="text-title font-extrabold">
          <MaskedLines lines={[canvas.headline]} delay={0.1} />
        </h2>
        <motion.p variants={fadeReveal(0.6)} className="flex shrink-0 items-center gap-2 pb-1 text-caption font-semibold text-ink-muted">
          <Info size={28} weight="bold" aria-hidden />
          {canvas.estimateLabel}
        </motion.p>
      </div>
      <StrategyCanvas usRevealed={usRevealed} />
    </StepView>
  );
}

function cellAppears(index: number): Variants {
  return {
    enter: { opacity: 0, y: 30 },
    present: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeDrawn, delay: 0.3 + index * 0.15 } },
  };
}

const LOWERS_COST_ACTIONS = new Set(["Eliminate", "Reduce"]);

function ErrcGrid() {
  const ordered = ["Eliminate", "Raise", "Reduce", "Create"].map((action) => canvas.errc.find((cell) => cell.action === action)!);
  return (
    <div className="grid grid-cols-2 gap-6">
      {ordered.map((cell, index) => {
        const lowersCost = LOWERS_COST_ACTIONS.has(cell.action);
        return (
          <motion.section key={cell.action} variants={cellAppears(index)} className={`rounded-card px-9 py-7 ${lowersCost ? "bg-paper-raised shadow-lift" : "bg-ocean text-paper shadow-float"}`}>
            <h3 className="flex items-baseline justify-between text-lede font-extrabold">
              {cell.action}
              <span className={`text-caption font-semibold ${lowersCost ? "text-ink-muted" : "text-ocean-wash"}`}>{cell.effect}</span>
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {cell.items.map((item) => (
                <li key={item} className="text-body leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>
        );
      })}
    </div>
  );
}

function ErrcView() {
  return (
    <StepView className="flex flex-col gap-8">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[canvas.errcHeading]} delay={0.1} />
      </h2>
      <ErrcGrid />
      <motion.dl variants={fadeReveal(1)} className="grid grid-cols-[auto_1fr_auto_1fr_auto_1.3fr] items-baseline gap-x-5">
        {canvas.characteristics.map((item) => (
          <div key={item.name} className="contents">
            <dt className="text-body font-extrabold text-ocean">{item.name}</dt>
            <dd className="text-body">{item.text}</dd>
          </div>
        ))}
      </motion.dl>
    </StepView>
  );
}

export function CanvasSlide({ step }: SlideProps) {
  return <AnimatePresence mode="wait">{step < 2 ? <CanvasView key="canvas" usRevealed={step >= 1} /> : <ErrcView key="errc" />}</AnimatePresence>;
}

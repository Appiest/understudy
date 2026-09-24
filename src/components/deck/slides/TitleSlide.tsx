"use client";

import { AnimatePresence, motion } from "motion/react";
import { team } from "@/content/config";
import { title } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { GlassesRender } from "../GlassesRender";
import { MaskedLines, fadeReveal, strokeDraw } from "../primitives";
import type { SlideProps } from "../slides";
import { VoiceWave } from "../VoiceWave";

const glassesArrive = {
  enter: { opacity: 0, x: 80, rotate: 3 },
  present: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1.6, ease: easeDrawn, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

function TitleCard() {
  return (
    <motion.div key="title" initial="enter" animate="present" exit="exit" className="stage-gutter absolute inset-0 flex flex-col">
      <h1 className="relative z-0 text-poster font-black">
        <MaskedLines lines={[team.productName]} delay={0.1} />
      </h1>
      <GlassesRender view="hero" alt="" variants={glassesArrive} className="absolute top-[170px] right-[20px] z-10 w-[1220px]" />
      <div className="relative z-20 mt-auto max-w-[900px]">
        <div className="-ml-2 mb-8">
          <VoiceWave width={760} height={90} delay={1.4} fadeTowards="start" />
        </div>
        <p className="text-title font-bold">
          <MaskedLines lines={["Your best employee,", "in every new hire’s ear."]} delay={0.9} />
        </p>
        <motion.p variants={fadeReveal(1.5)} className="mt-6 max-w-[760px] text-caption text-ink-muted">
          {title.subtitle}
        </motion.p>
        <motion.p variants={fadeReveal(1.7)} className="mt-6 text-caption">
          <span className="font-bold">{team.teamName}</span>
          <span className="block text-ink-muted">{team.teamMembers.join(", ")}</span>
        </motion.p>
      </div>
    </motion.div>
  );
}

const PATHS = { left: 30, right: 730, jumpY: 70, ourY: 230, nodeRadius: 16 };

type TrackNode = { label: string; at: number };

const jumpNodes: TrackNode[] = [
  { label: "AI glasses", at: 0 },
  { label: "Build it", at: 1 },
];
const ourNodes: TrackNode[] = [
  { label: "Turnover", at: 0 },
  { label: "Evidence", at: 0.3 },
  { label: "Noncustomers", at: 0.6 },
  { label: team.productName, at: 1 },
];

function nodeX(node: TrackNode) {
  return PATHS.left + node.at * (PATHS.right - PATHS.left);
}

function labelAnchor(index: number, count: number) {
  if (index === 0) return "start";
  return index === count - 1 ? "end" : "middle";
}

function labelX(node: TrackNode, index: number, count: number) {
  const offset = { start: -PATHS.nodeRadius, middle: 0, end: PATHS.nodeRadius }[labelAnchor(index, count)];
  return nodeX(node) + offset;
}

function Track({ nodes, y, tone, delay }: { nodes: TrackNode[]; y: number; tone: "rival" | "ocean"; delay: number }) {
  const color = `var(--color-${tone})`;
  const isOurs = tone === "ocean";
  return (
    <g>
      <motion.path
        d={`M ${PATHS.left} ${y} L ${PATHS.right} ${y}`}
        stroke={color}
        strokeWidth={isOurs ? 8 : 4}
        strokeLinecap="round"
        strokeDasharray={isOurs ? undefined : "4 14"}
        variants={isOurs ? strokeDraw(delay, 1.2) : fadeReveal(delay)}
      />
      {nodes.map((node, index) => (
        <motion.g key={node.label} variants={fadeReveal(delay + (isOurs ? index * 0.3 : 0))}>
          <circle cx={nodeX(node)} cy={y} r={PATHS.nodeRadius} fill="var(--color-paper)" stroke={color} strokeWidth={isOurs ? 8 : 5} />
          <text x={labelX(node, index, nodes.length)} y={y + 58} textAnchor={labelAnchor(index, nodes.length)} className="text-caption font-bold" fill={isOurs ? "var(--color-ink)" : "var(--color-ink-muted)"}>
            {node.label}
          </text>
        </motion.g>
      ))}
    </g>
  );
}

function JumpDiagram() {
  return (
    <svg viewBox="0 0 760 310" className="w-[760px] overflow-visible" role="img" aria-label="A solution jump goes from AI glasses straight to building it. Our path went from turnover to evidence to noncustomers before arriving at Understudy.">
      <motion.text variants={fadeReveal(0.5)} x={PATHS.left - PATHS.nodeRadius} y={PATHS.jumpY - 38} className="text-caption font-semibold" fill="var(--color-rival)">
        Solution jump
      </motion.text>
      <Track nodes={jumpNodes} y={PATHS.jumpY} tone="rival" delay={0.6} />
      <motion.text variants={fadeReveal(1.2)} x={PATHS.left - PATHS.nodeRadius} y={PATHS.ourY - 38} className="text-caption font-semibold" fill="var(--color-ocean)">
        Our path
      </motion.text>
      <Track nodes={ourNodes} y={PATHS.ourY} tone="ocean" delay={1.3} />
    </svg>
  );
}

function RulesCard() {
  return (
    <motion.div key="rules" initial="enter" animate="present" exit="exit" className="stage-gutter absolute inset-0 grid grid-cols-[760px_1fr] gap-gap">
      <div className="flex flex-col justify-between">
        <motion.h2 variants={fadeReveal(0.1, 30)} className="text-headline font-extrabold">
          {title.rulesHeading}
        </motion.h2>
        <JumpDiagram />
      </div>
      <ol className="flex flex-col justify-center gap-9">
        {title.rules.map((item, index) => (
          <motion.li key={item.rule} variants={fadeReveal(0.4 + index * 0.12, 24)} className="grid grid-cols-[56px_1fr] items-baseline">
            <span className="text-lede font-extrabold text-ocean figures-tabular">{index + 1}</span>
            <div>
              <p className="text-point font-bold">{item.rule}</p>
              <p className="mt-1 text-caption text-ink-muted">{item.detail}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

export function TitleSlide({ step }: SlideProps) {
  return <AnimatePresence mode="wait">{step === 0 ? <TitleCard key="title" /> : <RulesCard key="rules" />}</AnimatePresence>;
}

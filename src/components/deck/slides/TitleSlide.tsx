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

const JUMP = { problemX: 60, evidenceX: 380, solutionX: 700, baseY: 250 };

function JumpDiagram() {
  const { problemX, evidenceX, solutionX, baseY } = JUMP;
  const nodes = [
    { x: problemX, label: "Problem" },
    { x: evidenceX, label: "Evidence" },
    { x: solutionX, label: "Solution" },
  ];
  return (
    <svg viewBox="0 0 760 330" className="w-[760px] overflow-visible" role="img" aria-label="Instead of jumping from the problem straight to a solution, we went through evidence first">
      <motion.path
        d={`M ${problemX} ${baseY - 20} C ${problemX + 120} 20, ${solutionX - 120} 20, ${solutionX} ${baseY - 20}`}
        fill="none"
        stroke="var(--color-rival)"
        strokeWidth={4}
        strokeDasharray="4 14"
        strokeLinecap="round"
        variants={fadeReveal(0.6)}
      />
      <motion.g variants={fadeReveal(1.3)} stroke="var(--color-rival)" strokeWidth={6} strokeLinecap="round">
        <line x1={evidenceX - 22} y1={78} x2={evidenceX + 22} y2={122} />
        <line x1={evidenceX + 22} y1={78} x2={evidenceX - 22} y2={122} />
      </motion.g>
      <motion.text variants={fadeReveal(1.3)} x={evidenceX + 44} y={92} fill="var(--color-rival)" className="text-caption font-semibold">
        Solution jump
      </motion.text>
      <motion.path d={`M ${problemX} ${baseY} L ${solutionX} ${baseY}`} stroke="var(--color-ocean)" strokeWidth={8} strokeLinecap="round" variants={strokeDraw(1.5, 1.2)} />
      {nodes.map((node, index) => (
        <motion.g key={node.label} variants={fadeReveal(1.5 + index * 0.35)}>
          <circle cx={node.x} cy={baseY} r={18} fill="var(--color-paper)" stroke="var(--color-ocean)" strokeWidth={8} />
          <text x={node.x} y={baseY + 66} textAnchor="middle" className="text-caption font-bold" fill="var(--color-ink)">
            {node.label}
          </text>
        </motion.g>
      ))}
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

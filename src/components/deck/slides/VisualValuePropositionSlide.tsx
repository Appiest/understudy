"use client";

import { CheckCircle, Circle } from "@phosphor-icons/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { visualValueProposition as vvp, type SceneCallout } from "@/content/content";
import { FootnoteMark, MaskedLines, StepView, fadeReveal } from "../primitives";
import { Counter, Figure, Floor, HEAD_TOP_Y, LeaderLine, SCENE, Shelf } from "../ShiftScene";
import { VoiceWave } from "../VoiceWave";

const RIGHT = SCENE.panelWidth + SCENE.panelGap;
const LABEL_Y = SCENE.floor + 58;

const tones = {
  pain: "var(--color-rival)",
  gain: "var(--color-ocean)",
};

function Panel({ x, label, tone, children }: { x: number; label: string; tone: "pain" | "gain"; children: ReactNode }) {
  return (
    <g>
      <rect x={x} y={0} width={SCENE.panelWidth} height={SCENE.height} rx={20} fill={tone === "gain" ? "var(--color-paper-raised)" : "var(--color-paper-sunken)"} />
      <Floor x={x} />
      {children}
      <text x={x + 32} y={LABEL_Y} className="text-point font-extrabold" fill={tones[tone]}>
        {label}
      </text>
    </g>
  );
}

function TrainingToday() {
  return (
    <Panel x={0} label={vvp.without.label} tone="pain">
      <Counter x={40} />
      <Shelf x={390} width={230} />
      <Figure x={340} shirt="var(--color-rule)" skin="var(--color-skin-deep)" facing={-1} />
      <Figure x={276} shirt="var(--color-ink-faint)" skin="var(--color-skin-light)" facing={-1} />
      <Figure x={452} shirt="var(--color-ocean-wash)" skin="var(--color-skin-light)" pose="point" apron badge />
      <Figure x={568} shirt="var(--color-ocean-wash)" skin="var(--color-skin-deep)" facing={-1} apron />
      <LeaderLine from={[150, 100]} to={[276, HEAD_TOP_Y + 16]} tone="pain" delay={1.4} />
      <LeaderLine from={[400, 120]} to={[452, HEAD_TOP_Y + 16]} tone="pain" delay={1.6} />
    </Panel>
  );
}

function WithUnderstudy() {
  return (
    <Panel x={RIGHT} label={vvp.with.label} tone="gain">
      <Figure x={RIGHT + 140} shirt="var(--color-ocean-wash)" skin="var(--color-skin-light)" pose="counter" apron badge />
      <Counter x={RIGHT + 40} />
      <Figure x={RIGHT + 310} shirt="var(--color-ink-faint)" skin="var(--color-skin-light)" facing={-1} />
      <Shelf x={RIGHT + 410} width={210} />
      <Figure x={RIGHT + 512} shirt="var(--color-ocean-wash)" skin="var(--color-skin-deep)" pose="reach" apron glasses />
      <LeaderLine from={[RIGHT + 120, 126]} to={[RIGHT + 140, HEAD_TOP_Y + 16]} tone="gain" delay={2.4} />
    </Panel>
  );
}

function Callout({ callout, left, width, delay }: { callout: SceneCallout; left: number; width: number; delay: number }) {
  return (
    <motion.p
      variants={fadeReveal(delay, 10)}
      className="absolute top-6 text-caption font-bold"
      style={{ left, width, color: tones[callout.tone] }}
    >
      {callout.text}
    </motion.p>
  );
}

function CoachingBubbles() {
  return (
    <div className="absolute top-4 flex w-[320px] flex-col items-end gap-3" style={{ right: 24 }}>
      <motion.p variants={fadeReveal(2.6, 10)} className="rounded-card bg-paper px-5 py-2 text-caption font-medium whitespace-nowrap text-ink-muted">
        {vvp.with.question}
      </motion.p>
      <motion.div variants={fadeReveal(3.0, 10)} className="flex flex-col gap-2 rounded-card bg-ocean px-5 py-3 text-paper shadow-lift">
        <VoiceWave width={180} height={20} delay={3.1} strokeWidth={3} tone="paper" />
        <p className="text-caption font-bold">{vvp.with.answer}</p>
      </motion.div>
    </div>
  );
}

function Scene() {
  return (
    <motion.div variants={fadeReveal(0.4)} className="relative shrink-0" style={{ width: SCENE.width, height: SCENE.height }}>
      <svg
        viewBox={`0 0 ${SCENE.width} ${SCENE.height}`}
        width={SCENE.width}
        height={SCENE.height}
        role="img"
        aria-label="The same store on two days. Training today: the best employee leaves the register to show a new hire the shelf, and customers wait. With Understudy: the new hire wears the glasses and gets coached by voice at the shelf, and the best employee keeps serving customers."
      >
        <TrainingToday />
        <WithUnderstudy />
      </svg>
      <Callout callout={vvp.without.callouts[1]} left={32} width={280} delay={1.4} />
      <Callout callout={vvp.without.callouts[0]} left={330} width={290} delay={1.6} />
      <Callout callout={vvp.with.callouts[0]} left={RIGHT + 32} width={230} delay={2.4} />
      <div className="absolute inset-y-0" style={{ left: RIGHT, width: SCENE.panelWidth }}>
        <CoachingBubbles />
      </div>
    </motion.div>
  );
}

function ReadinessChecklist() {
  return (
    <motion.section variants={fadeReveal(3.4, 16)} className="rounded-card bg-paper-raised p-8 shadow-lift">
      <h3 className="text-point font-extrabold">{vvp.readiness.heading}</h3>
      <ul className="mt-6 flex flex-col gap-4">
        {vvp.readiness.tasks.map((task) => (
          <li key={task.name} className={`flex items-center gap-3 text-caption font-semibold ${task.ready ? "text-ink" : "text-ink-faint"}`}>
            {task.ready ? <CheckCircle size={32} weight="fill" className="shrink-0 text-ocean" aria-label="Ready" /> : <Circle size={32} weight="bold" className="shrink-0" aria-label="Not ready yet" />}
            {task.name}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

export function VisualValuePropositionSlide() {
  return (
    <StepView className="flex flex-col gap-9">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[vvp.tagline]} delay={0.05} />
      </h2>
      <div className="flex gap-14">
        <div className="flex flex-col gap-7">
          <Scene />
          <motion.p variants={fadeReveal(1.0)} className="max-w-[1180px] text-body text-ink-muted">
            {vvp.description}
          </motion.p>
        </div>
        <aside className="flex flex-1 flex-col pb-2">
          <motion.p variants={fadeReveal(0.3)} className="text-point font-bold text-ink-muted">
            {vvp.audience}
          </motion.p>
          <div className="mt-8">
            <ReadinessChecklist />
          </div>
          <div className="flex-1" />
          <motion.p variants={fadeReveal(3.6)} className="text-caption text-ink-muted">
            {vvp.hardwareNote}
            <FootnoteMark numbers={[1]} />
          </motion.p>
        </aside>
      </div>
    </StepView>
  );
}

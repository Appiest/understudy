"use client";

import { CashRegister, ListChecks, MapTrifold, Play, type Icon } from "@phosphor-icons/react";
import { motion, type Variants } from "motion/react";
import { solution } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { GlassesRender } from "../GlassesRender";
import { fadeReveal, strokeDraw } from "../primitives";
import { Figure } from "../ShiftScene";
import { VoiceWave } from "../VoiceWave";
import { SolutionPanel } from "./SolutionPanel";

const FRONT_RENDER = { width: 1000, aspect: 1000 / 2400 };
const LENS = { top: 0.23, height: 0.6, width: 0.325, leftX: 0.125, rightX: 0.575 };

function lensStyle(leftFraction: number) {
  const height = FRONT_RENDER.width * FRONT_RENDER.aspect;
  return {
    left: FRONT_RENDER.width * leftFraction,
    top: height * LENS.top,
    width: FRONT_RENDER.width * LENS.width,
    height: height * LENS.height,
  };
}

function frameRises(index: number): Variants {
  return {
    enter: { opacity: 0, y: 40 },
    present: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeDrawn, delay: 0.6 + index * 0.25 } },
  };
}

function FootageLens() {
  return (
    <div className="absolute flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[56px] bg-ink/45" style={lensStyle(LENS.leftX)}>
      {[0, 1, 2].map((index) => (
        <motion.div key={index} variants={frameRises(index)} className="flex h-16 w-44 items-center justify-center rounded-lg bg-paper/85">
          <Play size={28} weight="fill" className="text-ink" aria-hidden />
        </motion.div>
      ))}
    </div>
  );
}

const playbookRows: Icon[] = [MapTrifold, CashRegister, ListChecks];

function PlaybookLens() {
  return (
    <div className="absolute flex flex-col justify-center gap-5 overflow-hidden rounded-[56px] bg-ocean-deep/80 px-12" style={lensStyle(LENS.rightX)}>
      {playbookRows.map((RowIcon, index) => (
        <motion.div key={index} variants={fadeReveal(1.9 + index * 0.25, 12)} className="flex items-center gap-4">
          <RowIcon size={44} weight="duotone" className="shrink-0 text-paper" aria-hidden />
          <span className="flex flex-1 flex-col gap-2">
            <span className="h-3 rounded-full bg-paper/80" />
            <span className="h-3 w-2/3 rounded-full bg-paper/45" />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function FootageToPlaybook() {
  const height = FRONT_RENDER.width * FRONT_RENDER.aspect;
  const startX = FRONT_RENDER.width * (LENS.leftX + LENS.width) - 30;
  const endX = FRONT_RENDER.width * LENS.rightX + 30;
  const y = height * 0.12;
  return (
    <svg aria-hidden className="absolute inset-0 overflow-visible" width={FRONT_RENDER.width} height={height}>
      <motion.path
        d={`M ${startX} ${y + 40} Q ${(startX + endX) / 2} ${y - 70} ${endX} ${y + 40}`}
        fill="none"
        stroke="var(--color-ocean)"
        strokeWidth={6}
        strokeLinecap="round"
        variants={strokeDraw(1.3, 0.7)}
      />
    </svg>
  );
}

export function PlaybookPanel() {
  return (
    <SolutionPanel className="flex items-center justify-center">
      <div
        className="relative"
        style={{ width: FRONT_RENDER.width, height: FRONT_RENDER.width * FRONT_RENDER.aspect }}
        role="img"
        aria-label={`Inside the glasses, recorded footage becomes a playbook for the store: ${solution.playbookTopics.join(", ")}`}
      >
        <GlassesRender view="front" className="absolute inset-0 w-full" />
        <FootageLens />
        <PlaybookLens />
        <FootageToPlaybook />
      </div>
    </SolutionPanel>
  );
}

const COACH_SCENE = { width: 1000, height: 560, fridgeX: 640, fridgeWidth: 280, fridgeTop: 150, hireX: 470 };

function FridgeShelves() {
  const { fridgeX, fridgeWidth, fridgeTop } = COACH_SCENE;
  const shelfYs = [290, 370, 450];
  const bottleColors = ["var(--color-ocean-wash)", "var(--color-paper)", "var(--color-rival-wash)", "var(--color-paper)"];
  return (
    <g>
      <rect x={fridgeX} y={fridgeTop} width={fridgeWidth} height={510 - fridgeTop} rx={14} fill="var(--color-ink-muted)" />
      <rect x={fridgeX + 18} y={fridgeTop + 70} width={fridgeWidth - 36} height={510 - fridgeTop - 88} rx={8} fill="var(--color-shelf)" />
      {shelfYs.map((shelfY) => (
        <g key={shelfY}>
          {bottleColors.map((fill, index) => (
            <rect key={index} x={fridgeX + 34 + index * 58} y={shelfY - 52} width={40} height={52} rx={8} fill={fill} />
          ))}
          <rect x={fridgeX + 18} y={shelfY} width={fridgeWidth - 36} height={6} fill="var(--color-ink-faint)" />
        </g>
      ))}
    </g>
  );
}

const flagPulse: Variants = {
  enter: { scale: 0, opacity: 0 },
  present: { scale: [0, 1.25, 1], opacity: 1, transition: { duration: 0.6, ease: easeDrawn, delay: 1.8 } },
};

function MissedTemperatureFlag() {
  const { fridgeX, fridgeTop } = COACH_SCENE;
  const thermometerX = fridgeX + 60;
  const flagX = thermometerX + 52;
  const flagY = fridgeTop + 22;
  return (
    <g>
      <rect x={thermometerX - 9} y={fridgeTop + 12} width={18} height={40} rx={9} fill="var(--color-paper)" />
      <circle cx={thermometerX} cy={fridgeTop + 54} r={13} fill="var(--color-rival)" />
      <motion.g variants={flagPulse} style={{ originX: `${flagX}px`, originY: `${flagY}px` }}>
        <circle cx={flagX} cy={flagY} r={24} fill="var(--color-rival)" />
        <rect x={flagX - 3.5} y={flagY - 13} width={7} height={16} rx={3.5} fill="var(--color-paper)" />
        <circle cx={flagX} cy={flagY + 10} r={4} fill="var(--color-paper)" />
      </motion.g>
    </g>
  );
}

function CoachScene() {
  return (
    <div className="relative" style={{ width: COACH_SCENE.width, height: COACH_SCENE.height }}>
      <svg viewBox={`0 0 ${COACH_SCENE.width} ${COACH_SCENE.height}`} width={COACH_SCENE.width} height={COACH_SCENE.height} role="img" aria-label="A new hire wearing the glasses gets coached by voice at the fridge, and the glasses flag a fridge temperature nobody logged">
        <rect x={0} y={0} width={COACH_SCENE.width} height={COACH_SCENE.height} rx={20} fill="var(--color-paper-raised)" />
        <rect x={0} y={510} width={COACH_SCENE.width} height={6} fill="var(--color-rule)" />
        <FridgeShelves />
        <MissedTemperatureFlag />
        <Figure x={COACH_SCENE.hireX} shirt="var(--color-ocean-wash)" skin="var(--color-skin-deep)" pose="reach" apron glasses variants={fadeReveal(0.3)} />
      </svg>
      <motion.div variants={fadeReveal(0.9, 12)} className="absolute top-[36px] left-[150px] rounded-card bg-ocean px-8 py-6 shadow-float">
        <VoiceWave width={300} height={60} delay={1} strokeWidth={6} tone="paper" />
      </motion.div>
    </div>
  );
}

function GlassesPrice() {
  return (
    <motion.div variants={fadeReveal(2.6, 16)} className="flex items-center gap-10">
      <GlassesRender view="side" className="w-[380px]" />
      <p className="text-headline font-black figures-tabular">{solution.glassesPrice}</p>
    </motion.div>
  );
}

export function CoachPitchPanel() {
  return (
    <SolutionPanel className="flex flex-col justify-between">
      <CoachScene />
      <GlassesPrice />
    </SolutionPanel>
  );
}

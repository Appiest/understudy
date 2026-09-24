"use client";

import { ArrowSquareOut } from "@phosphor-icons/react";
import { motion, type Variants } from "motion/react";
import { isPlaceholder, team } from "@/content/config";
import { mindMap } from "@/content/content";
import { asset } from "@/lib/asset";
import { easeDrawn } from "@/lib/motion";
import { MaskedLines, StepView, fadeReveal, strokeDraw } from "../primitives";
import { VoiceWave } from "../VoiceWave";

const MAP = { width: 1696, height: 640, rx: 640, ry: 250, centerRadius: 150 };
const center = { x: MAP.width / 2, y: MAP.height / 2 };

function branchPosition(index: number) {
  const angle = ((index * 360) / mindMap.branches.length - 67.5) * (Math.PI / 180);
  return { x: center.x + Math.cos(angle) * MAP.rx, y: center.y + Math.sin(angle) * MAP.ry };
}

function branchAppears(index: number): Variants {
  return {
    enter: { opacity: 0, scale: 0.8 },
    present: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeDrawn, delay: 0.9 + index * 0.12 } },
  };
}

function DrawnMindMap() {
  return (
    <div className="relative" style={{ width: MAP.width, height: MAP.height }} role="img" aria-label={`Mind map centered on ${mindMap.center}`}>
      <svg aria-hidden viewBox={`0 0 ${MAP.width} ${MAP.height}`} className="absolute inset-0 overflow-visible">
        {mindMap.branches.map((branch, index) => {
          const position = branchPosition(index);
          return <motion.line key={branch.name} x1={center.x} y1={center.y} x2={position.x} y2={position.y} stroke="var(--color-ocean)" strokeWidth={4} variants={strokeDraw(0.5 + index * 0.08, 0.8)} />;
        })}
        <motion.circle cx={center.x} cy={center.y} r={MAP.centerRadius} fill="var(--color-ink)" variants={fadeReveal(0.3)} />
      </svg>
      <motion.p variants={fadeReveal(0.4)} className="absolute w-[250px] -translate-x-1/2 -translate-y-1/2 text-center text-body leading-tight font-bold text-paper" style={{ left: center.x, top: center.y }}>
        {mindMap.center}
      </motion.p>
      {mindMap.branches.map((branch, index) => {
        const position = branchPosition(index);
        return (
          <motion.div key={branch.name} variants={branchAppears(index)} className="absolute w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-card bg-paper-raised px-6 py-4 shadow-lift" style={{ left: position.x, top: position.y }}>
            <p className="text-caption font-extrabold text-ocean">{branch.name}</p>
            <p className="mt-1 text-fineprint leading-snug">{branch.leaves.join(", ")}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function MindMapImage() {
  return (
    <motion.img variants={fadeReveal(0.3)} src={asset(team.mindMapImage)} alt={`Mind map centered on ${mindMap.center}`} className="max-h-[640px] w-full object-contain" />
  );
}

function FigmaButton() {
  const hasLink = !isPlaceholder(team.figmaBoardLink);
  const content = (
    <>
      {mindMap.figmaButton}
      <ArrowSquareOut size={30} weight="bold" aria-hidden />
    </>
  );
  const className = "flex shrink-0 items-center gap-3 rounded-full px-8 py-4 text-body font-bold";
  if (!hasLink) {
    return (
      <span aria-disabled className={`${className} bg-paper-sunken text-ink-faint`} title="Add the Figma link in src/content/config.ts">
        {content}
      </span>
    );
  }
  return (
    <a href={team.figmaBoardLink} target="_blank" rel="noreferrer" className={`${className} bg-ink text-paper shadow-lift transition-[scale] duration-150 active:scale-[0.96]`}>
      {content}
    </a>
  );
}

export function MindMapSlide() {
  return (
    <StepView className="flex flex-col justify-between">
      <div className="flex items-center justify-between gap-gap">
        <h2 className="text-title font-extrabold">
          <MaskedLines lines={[mindMap.headline]} delay={0.1} />
        </h2>
        <motion.div variants={fadeReveal(0.5)}>
          <FigmaButton />
        </motion.div>
      </div>
      {team.mindMapImage ? <MindMapImage /> : <DrawnMindMap />}
      <motion.div variants={fadeReveal(2)} className="flex items-center gap-8">
        <VoiceWave width={220} height={60} delay={2.2} fadeTowards="end" />
        <p className="text-lede font-bold">{mindMap.next}</p>
      </motion.div>
    </StepView>
  );
}

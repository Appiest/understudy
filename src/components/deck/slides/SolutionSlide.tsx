"use client";

import { Eyeglasses, Warning } from "@phosphor-icons/react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { team } from "@/content/config";
import { solution } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { GlassesRender } from "../GlassesRender";
import { useHeadlineOverride } from "../headlineOverride";
import { ReadingDetail, useIsPitch } from "../pitchMode";
import { MaskedLines, fadeReveal } from "../primitives";
import type { SlideProps } from "../slides";
import { VoiceWave } from "../VoiceWave";
import { SolutionPanel } from "./SolutionPanel";
import { CoachPitchPanel, PlaybookPanel } from "./SolutionPitchPanels";

const SCOPE_STEP = solution.stages.length;

function stageTone(stageIndex: number, step: number) {
  if (step >= SCOPE_STEP || stageIndex < step) return { title: "text-ink", dot: "bg-ink", summary: "hidden" };
  if (stageIndex === step) return { title: "text-ink", dot: "bg-ocean", summary: "block" };
  return { title: "text-ink-faint", dot: "bg-paper-sunken", summary: "hidden" };
}

function StageRail({ step, showSummaries }: { step: number; showSummaries: boolean }) {
  return (
    <ol className="flex flex-col gap-8">
      {solution.stages.map((stage, index) => {
        const tone = stageTone(index, step);
        return (
          <li key={stage.name} aria-current={index === step ? "step" : undefined} className="grid grid-cols-[40px_1fr] gap-5">
            <span className={`mt-4 h-6 w-6 rounded-full transition-colors duration-300 ${tone.dot}`} />
            <div>
              <p className={`text-title font-extrabold transition-colors duration-300 ${tone.title}`}>{stage.name}</p>
              <ReadingDetail>
                <motion.p key={`${stage.name}-${step}`} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} className={`mt-3 max-w-[560px] text-body text-ink-muted ${showSummaries ? tone.summary : "hidden"}`}>
                  {stage.summary}
                </motion.p>
              </ReadingDetail>
            </div>
          </li>
        );
      })}
    </ol>
  );
}


function dayFills(index: number): Variants {
  return {
    enter: { scaleY: 0 },
    present: { scaleY: 1, transition: { duration: 0.6, ease: easeDrawn, delay: 0.5 + index * 0.14 } },
  };
}

function CapturePanel() {
  return (
    <SolutionPanel className="flex flex-col justify-between">
      <GlassesRender view="side" className="w-full" />
      <div>
        <div className="flex h-56 items-end gap-4" role="img" aria-label="A week of normal shifts recorded, Monday to Sunday">
          {solution.captureDays.map((day, index) => (
            <div key={day} className="flex h-full flex-1 flex-col justify-end">
              <div className="relative flex-1 overflow-hidden rounded-t-lg bg-paper-sunken">
                <motion.div variants={dayFills(index)} className="absolute inset-x-0 bottom-0 h-[70%] origin-bottom bg-ocean" />
              </div>
              <p className="mt-3 text-center text-caption font-semibold">{day}</p>
            </div>
          ))}
        </div>
      </div>
    </SolutionPanel>
  );
}

function LearnPanel() {
  return (
    <SolutionPanel className="flex items-center">
      <div className="w-full rounded-card bg-paper-raised p-12 shadow-float">
        <p className="text-lede font-extrabold">Your store’s playbook</p>
        <ol className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6">
          {solution.playbook.map((entry, index) => (
            <motion.li key={entry} variants={fadeReveal(0.4 + index * 0.18, 16)} className="flex items-baseline gap-4 text-body font-semibold">
              <span className="text-ocean figures-tabular">{index + 1}</span>
              {entry}
            </motion.li>
          ))}
        </ol>
      </div>
    </SolutionPanel>
  );
}

function CoachExchange() {
  const { coaching } = solution;
  return (
    <div className="flex flex-col gap-5">
      <motion.div variants={fadeReveal(0.3, 16)} className="self-start rounded-card bg-paper-raised px-8 py-5 shadow-lift">
        <ReadingDetail>
          <p className="text-caption font-semibold text-ink-muted">New hire</p>
        </ReadingDetail>
        <p className="text-point font-semibold">{coaching.question}</p>
      </motion.div>
      <motion.div variants={fadeReveal(0.9, 16)} className="ml-24 rounded-card bg-ocean px-8 py-6 text-paper shadow-float">
        <p className="flex items-center gap-3 text-caption font-semibold text-ocean-wash">
          <Eyeglasses size={30} weight="bold" aria-hidden />
          {team.productName}
        </p>
        <p className="mt-1 text-point font-semibold">{coaching.answer}</p>
      </motion.div>
      <motion.p variants={fadeReveal(1.5, 16)} className="flex items-center gap-3 self-end text-body font-semibold text-rival">
        <Warning size={34} weight="fill" aria-hidden />
        {coaching.flag}
      </motion.p>
    </div>
  );
}

const PLAYBOOK_SIZE = solution.playbook.length;

function Readiness() {
  return (
    <motion.dl variants={fadeReveal(1.9, 16)} className="grid grid-cols-[140px_1fr_120px] items-center gap-x-6 gap-y-4 rounded-card bg-paper-raised p-8 shadow-lift">
      <ReadingDetail>
        <dt className="col-span-3 text-caption font-semibold text-ink-muted">Owner dashboard: tasks each new hire can do alone</dt>
      </ReadingDetail>
      {solution.readiness.map((hire) => (
        <div key={hire.person} className="contents">
          <dt className="text-body font-bold">{hire.person}</dt>
          <dd className="h-5 overflow-hidden rounded-full bg-paper-sunken">
            <motion.div
              className="h-full origin-left rounded-full bg-ocean"
              variants={{ enter: { scaleX: 0 }, present: { scaleX: hire.ready / PLAYBOOK_SIZE, transition: { duration: 1, ease: easeDrawn, delay: 2.2 } } }}
            />
          </dd>
          <dd className="text-right text-body font-semibold figures-tabular">
            {hire.ready} of {PLAYBOOK_SIZE}
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}

function CoachPanel() {
  return (
    <SolutionPanel className="flex flex-col justify-between">
      <div className="-mt-4 mb-2">
        <VoiceWave width={1000} height={70} delay={0.6} fadeTowards="end" />
      </div>
      <CoachExchange />
      <Readiness />
    </SolutionPanel>
  );
}

function ScopePanel() {
  return (
    <SolutionPanel className="flex flex-col justify-center gap-12">
      <div>
        <p className="text-lede font-extrabold">{solution.scope.heading}</p>
        <dl className="mt-6 grid grid-cols-[260px_1fr] gap-x-8 gap-y-5">
          {solution.scope.items.map((item, index) => (
            <motion.div key={item.key} variants={fadeReveal(0.3 + index * 0.15)} className="contents">
              <dt className="text-body font-bold">{item.key}</dt>
              <dd className="text-body text-ink-muted">{item.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </SolutionPanel>
  );
}

const panels = [CapturePanel, LearnPanel, CoachPanel, ScopePanel];
const pitchPanels = [CapturePanel, PlaybookPanel, CoachPitchPanel, ScopePanel];

function SolutionHeading() {
  const override = useHeadlineOverride();
  if (override) {
    return (
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={override} delay={0.05} />
      </h2>
    );
  }
  return (
    <>
      <h2 className="text-headline font-black">
        <MaskedLines lines={[`${team.productName}:`]} delay={0.05} />
      </h2>
      <p className="text-title font-extrabold text-ocean">
        <MaskedLines lines={[solution.headline]} delay={0.2} />
      </p>
    </>
  );
}

export function SolutionSlide({ step }: SlideProps) {
  const ActivePanel = (useIsPitch() ? pitchPanels : panels)[step];
  const hasOverride = useHeadlineOverride() !== undefined;
  return (
    <div className="stage-gutter absolute inset-0 grid grid-cols-[620px_1fr] gap-gap">
      <div className="flex flex-col">
        <SolutionHeading />
        <div className="mt-auto">
          <StageRail step={step} showSummaries={!hasOverride} />
        </div>
      </div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <ActivePanel key={step} />
        </AnimatePresence>
      </div>
    </div>
  );
}

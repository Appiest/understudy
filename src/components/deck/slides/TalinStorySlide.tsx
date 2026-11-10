"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { ignite, talinStory } from "@/content/content";
import { easeDrawn, easeSweep } from "@/lib/motion";
import { HiddenHeadline, useHeadline, useHeadlineSize } from "../headlineOverride";
import { CountUp, MaskedLines, StepView, fadeReveal, useProgress } from "../primitives";
import { PERSON_GLYPH, PersonGlyph } from "../PersonGlyph";
import { useIsBrief } from "../pitchMode";
import { Counter, Figure, Floor, SCENE, Shelf } from "../ShiftScene";
import type { SlideProps } from "../slides";

const REGISTER_X = 140;
const SHELF_SPOT_X = 452;
const WALK_DELAY = 1.1;

const walksToShelf: Variants = {
  enter: { x: REGISTER_X - SHELF_SPOT_X },
  present: { x: 0, transition: { duration: 1.4, ease: easeSweep, delay: WALK_DELAY } },
};

function EmptySpot() {
  const headY = SCENE.floor - 236;
  return (
    <motion.g variants={fadeReveal(WALK_DELAY + 0.8)} fill="none" stroke="var(--color-rival)" strokeWidth={4} strokeDasharray="6 10" strokeLinecap="round">
      <circle cx={REGISTER_X} cy={headY} r={34} />
      <rect x={REGISTER_X - 38} y={headY + 44} width={76} height={118} rx={28} />
    </motion.g>
  );
}

function WalkTrail() {
  const y = SCENE.floor - 20;
  return (
    <motion.path
      d={`M ${REGISTER_X + 40} ${y} L ${SHELF_SPOT_X - 50} ${y}`}
      stroke="var(--color-rival)"
      strokeWidth={4}
      strokeDasharray="2 12"
      strokeLinecap="round"
      variants={fadeReveal(WALK_DELAY + 0.6)}
    />
  );
}

function StoreScene() {
  return (
    <motion.svg
      variants={fadeReveal(0.4)}
      viewBox={`0 0 ${SCENE.panelWidth} ${SCENE.height}`}
      className="w-full"
      role="img"
      aria-label="At Talin Market, the best employee leaves the register to show a new hire the shelf. Customers wait at an empty register."
    >
      <rect x={0} y={0} width={SCENE.panelWidth} height={SCENE.height} rx={20} fill="var(--color-paper-sunken)" />
      <Floor x={0} />
      <Shelf x={390} width={230} />
      <EmptySpot />
      <Counter x={40} />
      <Figure x={568} shirt="var(--color-ocean-wash)" skin="var(--color-skin-deep)" facing={-1} apron />
      <motion.g variants={walksToShelf}>
        <Figure x={SHELF_SPOT_X} shirt="var(--color-ocean-wash)" skin="var(--color-skin-light)" pose="point" apron badge />
      </motion.g>
      <WalkTrail />
      <motion.g variants={fadeReveal(WALK_DELAY + 1.2, 20)}>
        <Figure x={276} shirt="var(--color-ink-faint)" skin="var(--color-skin-light)" facing={-1} />
        <Figure x={340} shirt="var(--color-rule)" skin="var(--color-skin-deep)" facing={-1} />
      </motion.g>
    </motion.svg>
  );
}

const HIRES_PER_ROW = 12;

function hireArrives(index: number): Variants {
  return {
    enter: { opacity: 0, y: -24 },
    present: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeDrawn, delay: 1.6 + index * 0.08 } },
  };
}

function HireFigures({ count }: { count: number }) {
  const rows = Math.ceil(count / HIRES_PER_ROW);
  const pitch = PERSON_GLYPH.width + 14;
  return (
    <svg viewBox={`0 0 ${HIRES_PER_ROW * pitch} ${rows * (PERSON_GLYPH.height + 16)}`} className="w-[640px]" role="img" aria-label={`${count} new hires last year`}>
      {Array.from({ length: count }, (_, index) => (
        <motion.g key={index} variants={hireArrives(index)}>
          <g transform={`translate(${(index % HIRES_PER_ROW) * pitch} ${Math.floor(index / HIRES_PER_ROW) * (PERSON_GLYPH.height + 16)})`}>
            <PersonGlyph tone="ocean" />
          </g>
        </motion.g>
      ))}
    </svg>
  );
}

function HiresLastYear() {
  const { count, caption } = talinStory.hires;
  const hires = Number(count);
  if (!Number.isInteger(hires)) {
    return (
      <motion.p variants={fadeReveal(1.4)} className="text-lede font-bold text-ink-faint">
        {count}
      </motion.p>
    );
  }
  return (
    <motion.div variants={fadeReveal(1.4)} className="flex flex-col gap-6">
      <p className="text-lede font-bold">
        <span className="mr-4 text-display font-black text-ocean figures-tabular">{hires}</span>
        {caption}
      </p>
      <HireFigures count={hires} />
    </motion.div>
  );
}

/** The grant deck is read without a presenter, so it says on the slide who runs Talin. */
function BriefSubtitle() {
  if (!useIsBrief()) return null;
  return (
    <motion.p variants={fadeReveal(0.6)} className="mt-6 text-lede font-bold text-ink-muted">
      {ignite.brief.talinSubtitle}
    </motion.p>
  );
}

function StoryView() {
  const headlineSize = useHeadlineSize("text-headline");
  return (
    <StepView className="grid grid-cols-[1fr_820px] gap-gap">
      <div className="flex flex-col justify-between gap-12">
        <div>
          <h2 className={`${headlineSize} font-extrabold`}>
            <MaskedLines lines={useHeadline(talinStory.headline)} delay={0.1} />
          </h2>
          <BriefSubtitle />
        </div>
        <HiresLastYear />
      </div>
      <div className="self-center">
        <StoreScene />
      </div>
    </StepView>
  );
}

const GRID = { columns: 10, cell: 56, gap: 10 };
const TALIN_INDEX = 0;

function cellPosition(index: number) {
  const pitch = GRID.cell + GRID.gap;
  return { x: (index % GRID.columns) * pitch, y: Math.floor(index / GRID.columns) * pitch };
}

function distanceFromTalin(index: number) {
  const { x, y } = cellPosition(index);
  const talin = cellPosition(TALIN_INDEX);
  return Math.hypot(x - talin.x, y - talin.y) / (GRID.cell + GRID.gap);
}

function cellAppears(index: number): Variants {
  return {
    enter: { opacity: 0, scale: 0.6 },
    present: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeDrawn, delay: 0.9 + distanceFromTalin(index) * 0.12 } },
  };
}

function EmployerGrid() {
  const { value, marker } = talinStory.scale;
  const size = GRID.columns * (GRID.cell + GRID.gap) - GRID.gap;
  const talin = cellPosition(TALIN_INDEX);
  return (
    <svg viewBox={`0 -90 ${size} ${size + 90}`} className="w-[700px] overflow-visible" role="img" aria-label={`${value} of every 100 small employers train new hires by shadowing, and Talin Market is one of them`}>
      {Array.from({ length: GRID.columns * GRID.columns }, (_, index) => {
        const { x, y } = cellPosition(index);
        return (
          <motion.rect
            key={index}
            x={x}
            y={y}
            width={GRID.cell}
            height={GRID.cell}
            rx={10}
            fill={index < value ? "var(--color-ocean)" : "var(--color-paper-sunken)"}
            style={{ originX: `${x + GRID.cell / 2}px`, originY: `${y + GRID.cell / 2}px` }}
            variants={cellAppears(index)}
          />
        );
      })}
      <motion.g variants={fadeReveal(0.5)}>
        <rect x={talin.x - 8} y={talin.y - 8} width={GRID.cell + 16} height={GRID.cell + 16} rx={16} fill="none" stroke="var(--color-ink)" strokeWidth={5} />
        <text x={talin.x - 8} y={talin.y - 34} className="text-caption font-bold" fill="var(--color-ink)">
          {marker}
        </text>
      </motion.g>
    </svg>
  );
}

function ScaleView() {
  const { scale } = talinStory;
  const progress = useProgress(1.6, 0.9);
  return (
    <StepView className="grid grid-cols-[1fr_700px] items-center gap-gap">
      <div>
        <HiddenHeadline lines={scale.headline} className="mb-12 text-title font-extrabold" />
        <div>
          <p className="text-poster font-black text-ocean figures-tabular">
            <CountUp progress={progress} total={scale.value} format={(current) => `${Math.round(current)}%`} />
          </p>
          <motion.p variants={fadeReveal(1.2)} className="mt-6 max-w-[900px] text-lede font-bold">
            {scale.caption}
          </motion.p>
        </div>
      </div>
      <EmployerGrid />
    </StepView>
  );
}

const views = [StoryView, ScaleView];

export function TalinStorySlide({ step }: SlideProps) {
  const View = views[step];
  return (
    <AnimatePresence mode="wait">
      <View key={step} />
    </AnimatePresence>
  );
}

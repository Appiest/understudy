"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { talinStory } from "@/content/content";
import { easeDrawn, easeSweep } from "@/lib/motion";
import { CountUp, MaskedLines, StepView, fadeReveal, useProgress } from "../primitives";
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

function StoreFacts() {
  return (
    <dl className="grid grid-cols-2 gap-x-gap gap-y-10">
      {talinStory.facts.map((fact, index) => (
        <motion.div key={fact.name} variants={fadeReveal(0.6 + index * 0.12, 16)}>
          <dt className="text-caption text-ink-muted">{fact.name}</dt>
          <dd className="mt-1 text-lede font-bold">{fact.value}</dd>
        </motion.div>
      ))}
    </dl>
  );
}

function OwnerQuote() {
  const { quote } = talinStory;
  return (
    <motion.figure variants={fadeReveal(2.8, 20)} className="rounded-card bg-paper-raised p-8 shadow-lift">
      <blockquote className="text-point font-bold">“{quote.text}”</blockquote>
      <figcaption className="mt-5 text-caption">
        <span className="font-bold">{quote.speaker}</span>
        <span className="block text-ink-muted">{quote.role}</span>
      </figcaption>
    </motion.figure>
  );
}

function StoryView() {
  return (
    <StepView className="grid grid-cols-[1fr_640px] gap-gap">
      <div className="flex flex-col justify-between">
        <h2 className="text-headline font-extrabold">
          <MaskedLines lines={talinStory.headline} delay={0.1} />
        </h2>
        <motion.div variants={fadeReveal(0.4)}>
          <p className="text-lede font-extrabold">{talinStory.store}</p>
          <p className="mt-2 text-body text-ink-muted">{talinStory.storeDetail}</p>
        </motion.div>
        <StoreFacts />
      </div>
      <div className="flex flex-col gap-8">
        <StoreScene />
        <OwnerQuote />
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
      <div className="flex h-full flex-col justify-between">
        <h2 className="text-headline font-extrabold">
          <MaskedLines lines={scale.headline} delay={0.1} />
        </h2>
        <div>
          <p className="text-poster font-black text-ocean figures-tabular">
            <CountUp progress={progress} total={scale.value} format={(current) => `${Math.round(current)}%`} />
          </p>
          <motion.p variants={fadeReveal(1.2)} className="mt-6 max-w-[900px] text-lede font-bold">
            {scale.caption}
          </motion.p>
          <motion.p variants={fadeReveal(1.4)} className="mt-3 text-caption text-ink-muted">
            {scale.note}
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

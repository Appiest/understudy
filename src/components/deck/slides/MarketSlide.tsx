"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { market, revenueFormatter, yearlyRevenue, type MarketRing } from "@/content/content";
import { easeDrawn } from "@/lib/motion";
import { CountUp, MaskedLines, StepView, fadeReveal, strokeDraw, useProgress } from "../primitives";

const DIAGRAM_SIZE = 640;
const CENTER = DIAGRAM_SIZE / 2;
const LABEL_INSET = 20;
const HALO_GAP = 12;
const revealAt = { total: 0.4, serviceable: 1.3, firstMarket: 2.1, obtainable: 2.8, priceNote: 3.5 };
const wholeNumber = new Intl.NumberFormat("en-US");
const roundedNumber = new Intl.NumberFormat("en-US", { notation: "compact", maximumSignificantDigits: 3 });

const [total, serviceable, obtainable] = market.rings;
const { firstMarket } = market;

type Square = { name: string; locations: number; fill: string; delay: number };

const squares = {
  total: { name: total.acronym, locations: total.locations, fill: "var(--color-paper-raised)", delay: revealAt.total },
  serviceable: { name: serviceable.acronym, locations: serviceable.locations, fill: "var(--color-ocean-wash)", delay: revealAt.serviceable },
  firstMarket: { name: firstMarket.name, locations: firstMarket.smallBusinessLocations, fill: "var(--color-ocean-chart)", delay: revealAt.firstMarket },
  obtainable: { name: obtainable.acronym, locations: obtainable.locations, fill: "var(--color-ocean-deep)", delay: revealAt.obtainable },
} satisfies Record<string, Square>;

const rowStyles = [
  { delay: revealAt.total, value: "text-headline text-ink-muted" },
  { delay: revealAt.serviceable, value: "text-headline text-ink" },
  { delay: revealAt.obtainable, value: "text-title text-ink" },
];

function formatLocations(locations: number) {
  const figure = locations >= 10_000 ? roundedNumber.format(locations) : wholeNumber.format(locations);
  return `${figure} ${market.locationsUnit}`;
}

function sideFor(locations: number) {
  return DIAGRAM_SIZE * Math.sqrt(locations / total.locations);
}

function edgeOf(square: Square) {
  return CENTER - sideFor(square.locations) / 2;
}

function growsFromCenter(delay: number): Variants {
  return {
    enter: { scale: 0 },
    present: { scale: 1, transition: { duration: 0.9, ease: easeDrawn, delay } },
  };
}

function appears(delay: number): Variants {
  return {
    enter: { opacity: 0 },
    present: { opacity: 1, transition: { duration: 0.5, delay } },
  };
}

function ripples(delay: number): Variants {
  return {
    enter: { scale: 1, opacity: 0 },
    present: { scale: [1, 2.4], opacity: [0.9, 0], transition: { duration: 1.4, ease: "easeOut", delay, repeat: 2 } },
  };
}

type LabelProps = { square: Square; x: number; y: number; anchor?: "start" | "middle"; tone: string };

function SquareLabel({ square, x, y, anchor = "start", tone }: LabelProps) {
  return (
    <motion.text x={x} y={y} textAnchor={anchor} className="text-caption" fill={tone} variants={appears(square.delay + 0.5)}>
      <tspan className="font-bold">{square.name}</tspan>
      <tspan dx={10} className="font-medium">
        {formatLocations(square.locations)}
      </tspan>
    </motion.text>
  );
}

function CenteredSquare({ square }: { square: Square }) {
  const side = sideFor(square.locations);
  return (
    <motion.rect
      x={CENTER - side / 2}
      y={CENTER - side / 2}
      width={side}
      height={side}
      fill={square.fill}
      variants={growsFromCenter(square.delay)}
      style={{ originX: 0.5, originY: 0.5, transformBox: "fill-box" }}
    />
  );
}

function ObtainableMark() {
  const reduceMotion = useReducedMotion();
  const square = squares.obtainable;
  const side = sideFor(square.locations);
  const halo = side + HALO_GAP * 2;
  const haloEdge = CENTER - halo / 2;
  const labelY = CENTER + sideFor(firstMarket.smallBusinessLocations) / 2 + 48;
  return (
    <>
      <CenteredSquare square={square} />
      <motion.rect x={haloEdge} y={haloEdge} width={halo} height={halo} fill="none" stroke="var(--color-paper)" strokeWidth={2} variants={appears(square.delay + 0.5)} />
      {!reduceMotion && (
        <motion.rect
          x={haloEdge}
          y={haloEdge}
          width={halo}
          height={halo}
          fill="none"
          stroke="var(--color-paper)"
          strokeWidth={2}
          variants={ripples(square.delay + 0.8)}
          style={{ originX: 0.5, originY: 0.5, transformBox: "fill-box" }}
        />
      )}
      <motion.line x1={CENTER} y1={haloEdge + halo} x2={CENTER} y2={labelY - 30} stroke="var(--color-ink)" strokeWidth={2} variants={strokeDraw(square.delay + 0.5, 0.5)} />
      <SquareLabel square={square} x={CENTER} y={labelY} anchor="middle" tone="var(--color-ink)" />
    </>
  );
}

function percentOf(part: number, whole: number) {
  return `${Math.round((part / whole) * 100)}%`;
}

const scaleDescription = [
  `Concentric squares drawn to scale by area.`,
  `${serviceable.acronym} is ${percentOf(serviceable.locations, total.locations)} of ${total.acronym},`,
  `${firstMarket.name} is ${percentOf(firstMarket.smallBusinessLocations, serviceable.locations)} of ${serviceable.acronym},`,
  `and ${obtainable.acronym} is ${percentOf(obtainable.locations, firstMarket.smallBusinessLocations)} of ${firstMarket.name}.`,
].join(" ");

function MarketDiagram() {
  const serviceableEdge = edgeOf(squares.serviceable);
  const firstMarketEdge = edgeOf(squares.firstMarket);
  return (
    <svg viewBox={`0 0 ${DIAGRAM_SIZE} ${DIAGRAM_SIZE}`} className="shrink-0 overflow-visible" style={{ width: DIAGRAM_SIZE, height: DIAGRAM_SIZE }} role="img" aria-label={scaleDescription}>
      <motion.rect x={0} y={0} width={DIAGRAM_SIZE} height={DIAGRAM_SIZE} fill={squares.total.fill} variants={appears(revealAt.total)} />
      <SquareLabel square={squares.total} x={LABEL_INSET} y={serviceableEdge / 2 + 9} tone="var(--color-ink)" />
      <CenteredSquare square={squares.serviceable} />
      <SquareLabel square={squares.serviceable} x={serviceableEdge + LABEL_INSET} y={serviceableEdge + 44} tone="var(--color-ocean-deep)" />
      <CenteredSquare square={squares.firstMarket} />
      <SquareLabel square={squares.firstMarket} x={CENTER} y={firstMarketEdge - 18} anchor="middle" tone="var(--color-ocean-deep)" />
      <ObtainableMark />
      <motion.rect x={1} y={1} width={DIAGRAM_SIZE - 2} height={DIAGRAM_SIZE - 2} fill="none" stroke="var(--color-ink-faint)" strokeWidth={2} variants={strokeDraw(revealAt.total, 1)} />
    </svg>
  );
}

function RingRow({ ring, index }: { ring: MarketRing; index: number }) {
  const style = rowStyles[index];
  const progress = useProgress(1.2, style.delay);
  const revenue = yearlyRevenue(ring.locations);
  return (
    <motion.div variants={fadeReveal(style.delay, 16)}>
      <dt className="flex items-baseline gap-3 text-caption">
        <abbr title={ring.name} className="font-bold no-underline">
          {ring.acronym}
        </abbr>
        <span>{ring.covers}</span>
      </dt>
      <dd className="mt-1 flex items-baseline gap-4">
        <span className={`font-black ${style.value}`}>
          <CountUp progress={progress} total={revenue} format={revenueFormatter(revenue)} />
        </span>
        <span className="text-lede font-bold text-ink-muted">a year</span>
      </dd>
    </motion.div>
  );
}

export function MarketSlide() {
  return (
    <StepView className="flex flex-col gap-14">
      <h2 className="text-title font-extrabold">
        <MaskedLines lines={[market.headline]} delay={0.05} />
      </h2>
      <div className="flex items-end justify-between gap-gap">
        <div className="flex flex-col gap-12" style={{ height: DIAGRAM_SIZE }}>
          <dl className="flex flex-1 flex-col justify-between">
            {market.rings.map((ring, index) => (
              <RingRow key={ring.acronym} ring={ring} index={index} />
            ))}
          </dl>
          <motion.p variants={fadeReveal(revealAt.priceNote)} className="text-caption text-ink-muted">
            {market.priceNote}
          </motion.p>
        </div>
        <MarketDiagram />
      </div>
    </StepView>
  );
}

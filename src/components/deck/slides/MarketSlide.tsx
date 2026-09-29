"use client";

import { market, revenueFormatter, yearlyRevenue, type MarketRing } from "@/content/content";
import { MaskedLines, StepView } from "../primitives";

const DIAGRAM_SIZE = 640;
const CENTER = DIAGRAM_SIZE / 2;
const wholeNumber = new Intl.NumberFormat("en-US");
const roundedNumber = new Intl.NumberFormat("en-US", { notation: "compact", maximumSignificantDigits: 3 });

type Circle = { radius: number; fill: string; text: string; labelY: number };

const circles: Circle[] = [
  { radius: 320, fill: "var(--color-paper-sunken)", text: "var(--color-ink)", labelY: 48 },
  { radius: 220, fill: "var(--color-ocean-wash)", text: "var(--color-ocean-deep)", labelY: 148 },
  { radius: 120, fill: "var(--color-ocean)", text: "var(--color-paper)", labelY: 314 },
];

const rowValueStyles = ["text-headline text-ink-muted", "text-headline text-ink", "text-title text-ink"];

function formatLocations(locations: number) {
  const figure = locations >= 10_000 ? roundedNumber.format(locations) : wholeNumber.format(locations);
  return `${figure} ${market.locationsUnit}`;
}

function CircleLabel({ ring, circle }: { ring: MarketRing; circle: Circle }) {
  return (
    <text x={CENTER} y={circle.labelY} textAnchor="middle" fill={circle.text}>
      <tspan className="text-point font-extrabold">{ring.acronym}</tspan>
      <tspan x={CENTER} dy={34} className="text-caption font-medium">
        {formatLocations(ring.locations)}
      </tspan>
    </text>
  );
}

function MarketCircles() {
  return (
    <svg
      viewBox={`0 0 ${DIAGRAM_SIZE} ${DIAGRAM_SIZE}`}
      className="shrink-0"
      style={{ width: DIAGRAM_SIZE, height: DIAGRAM_SIZE }}
      role="img"
      aria-label="Three nested circles: SOM inside SAM inside TAM. They show which market sits inside which, not relative size."
    >
      {circles.map((circle) => (
        <circle key={circle.radius} cx={CENTER} cy={CENTER} r={circle.radius} fill={circle.fill} />
      ))}
      {market.rings.map((ring, index) => (
        <CircleLabel key={ring.acronym} ring={ring} circle={circles[index]} />
      ))}
    </svg>
  );
}

function RingRow({ ring, index }: { ring: MarketRing; index: number }) {
  const revenue = yearlyRevenue(ring.locations);
  return (
    <div>
      <dt className="flex items-baseline gap-3 text-caption">
        <abbr title={ring.name} className="font-bold no-underline">
          {ring.acronym}
        </abbr>
        <span>{ring.covers}</span>
      </dt>
      <dd className="mt-1 flex items-baseline gap-4">
        <span className={`font-black ${rowValueStyles[index]}`}>{revenueFormatter(revenue)(revenue)}</span>
        <span className="text-lede font-bold text-ink-muted">a year</span>
      </dd>
    </div>
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
          <p className="text-caption text-ink-muted">{market.priceNote}</p>
        </div>
        <MarketCircles />
      </div>
    </StepView>
  );
}

"use client";

import { Briefcase, SmileySad, TrendUp, type Icon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { customerProfile, type ProfileArea } from "@/content/content";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

const SIZE = 760;
const RENDERED_SIZE = 680;
const RADIUS = SIZE / 2;
const SECTOR_GAP = 10;
const LABEL_DISTANCE = RADIUS * 0.52;
const LABEL_HEIGHT = 260;

type SectorStyle = { startAngle: number; endAngle: number; fill: string; icon: Icon; labelWidth: number };

const sectorStyles: Record<string, SectorStyle> = {
  Gains: { startAngle: 150, endAngle: 270, fill: "var(--color-ocean-wash)", icon: TrendUp, labelWidth: 290 },
  Jobs: { startAngle: 270, endAngle: 390, fill: "var(--color-paper-raised)", icon: Briefcase, labelWidth: 290 },
  Pains: { startAngle: 30, endAngle: 150, fill: "var(--color-paper-sunken)", icon: SmileySad, labelWidth: 400 },
};

function pointOnCircle(angle: number, distance = RADIUS) {
  const radians = (angle * Math.PI) / 180;
  return { x: RADIUS + distance * Math.cos(radians), y: RADIUS + distance * Math.sin(radians) };
}

function labelCenter({ startAngle, endAngle }: SectorStyle) {
  return pointOnCircle((startAngle + endAngle) / 2, LABEL_DISTANCE);
}

function sectorPath({ startAngle, endAngle }: SectorStyle) {
  const start = pointOnCircle(startAngle);
  const end = pointOnCircle(endAngle);
  return `M ${RADIUS} ${RADIUS} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y} Z`;
}

function SectorText({ area, style }: { area: ProfileArea; style: SectorStyle }) {
  const AreaIcon = style.icon;
  const center = labelCenter(style);
  return (
    <foreignObject x={center.x - style.labelWidth / 2} y={center.y - LABEL_HEIGHT / 2} width={style.labelWidth} height={LABEL_HEIGHT}>
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="flex items-center gap-3 text-point font-extrabold">
          <AreaIcon size={36} weight="bold" aria-hidden />
          {area.name}
        </p>
        <ul className="flex flex-col gap-2 text-caption font-medium">
          {area.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </foreignObject>
  );
}

function ProfileCircle() {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="shrink-0" style={{ width: RENDERED_SIZE, height: RENDERED_SIZE }} role="img" aria-label="Customer profile circle split into the owner’s jobs, pains and gains">
      {customerProfile.areas.map((area, index) => {
        const style = sectorStyles[area.name];
        return (
          <motion.g key={area.name} variants={fadeReveal(0.5 + index * 0.25)}>
            <path d={sectorPath(style)} fill={style.fill} stroke="var(--color-paper)" strokeWidth={SECTOR_GAP} strokeLinejoin="round" />
            <SectorText area={area} style={style} />
          </motion.g>
        );
      })}
    </svg>
  );
}

function OwnerSummary() {
  const { stat } = customerProfile;
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-10">
        <h2 className="text-title font-extrabold">
          <MaskedLines lines={[customerProfile.headline]} delay={0.05} />
        </h2>
        <motion.div variants={fadeReveal(0.3)}>
          <p className="text-lede font-bold">{customerProfile.who}</p>
          <p className="mt-3 text-body text-ink-muted">{customerProfile.size}</p>
        </motion.div>
      </div>
      <motion.div variants={fadeReveal(1.3)}>
        <p className="text-display font-black text-ocean figures-tabular">{stat.value}</p>
        <p className="mt-3 text-body font-semibold">{stat.caption}</p>
        <p className="mt-1 text-caption text-ink-muted">{stat.note}</p>
      </motion.div>
    </div>
  );
}

export function CustomerProfileSlide() {
  return (
    <StepView className="grid grid-cols-[1fr_680px] gap-gap">
      <OwnerSummary />
      <div className="self-center">
        <ProfileCircle />
      </div>
    </StepView>
  );
}

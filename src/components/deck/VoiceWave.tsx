"use client";

import { motion, useTime, useTransform } from "motion/react";
import { strokeDraw } from "./primitives";

type VoiceWaveProps = {
  width: number;
  height: number;
  delay?: number;
  strokeWidth?: number;
  tone?: "ocean" | "ink" | "rival";
  fadeTowards?: "start" | "end" | "none";
};

const SAMPLE_COUNT = 180;
const toneColor = { ocean: "var(--color-ocean)", ink: "var(--color-ink)", rival: "var(--color-rival)" };

function speechEnvelope(position: number, seconds: number) {
  const syllables = 0.55 + 0.45 * Math.sin(position * 9 - seconds * 2.1) * Math.sin(position * 3.7 + seconds * 0.8);
  return Math.max(0.12, syllables);
}

function wavePath(width: number, height: number, seconds: number, fadeTowards: VoiceWaveProps["fadeTowards"]) {
  const middle = height / 2;
  const points: string[] = [];
  for (let sample = 0; sample <= SAMPLE_COUNT; sample += 1) {
    const position = sample / SAMPLE_COUNT;
    const taper = { start: position, end: 1 - position, none: 1 }[fadeTowards ?? "none"];
    const carrier = Math.sin(position * 64 - seconds * 7) * 0.7 + Math.sin(position * 23 + seconds * 3) * 0.3;
    const y = middle + carrier * speechEnvelope(position, seconds) * Math.sqrt(taper) * middle * 0.92;
    points.push(`${(position * width).toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M ${points.join(" L ")}`;
}

export function VoiceWave({ width, height, delay = 0, strokeWidth = 5, tone = "ocean", fadeTowards = "none" }: VoiceWaveProps) {
  const time = useTime();
  const d = useTransform(time, (milliseconds) => wavePath(width, height, milliseconds / 1000, fadeTowards));
  return (
    <svg aria-hidden viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="overflow-visible">
      <motion.path
        d={d}
        fill="none"
        stroke={toneColor[tone]}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={strokeDraw(delay, 1.6)}
      />
    </svg>
  );
}

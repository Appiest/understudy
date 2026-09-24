"use client";

import { motion, type Variants } from "motion/react";
import { useState } from "react";
import { landscape, type LandscapePlayer } from "@/content/content";
import { sources } from "@/content/sources";
import { easeDrawn } from "@/lib/motion";
import { MaskedLines, StepView, fadeReveal } from "../primitives";

const MAP = { width: 1060, height: 640 };
const headlineLines = landscape.headline.split(/(?<=\.) /);
const players: LandscapePlayer[] = landscape.players;
const us = players.find((player) => player.kind === "us")!;

function positionOf(player: LandscapePlayer) {
  return { left: player.offToOn * MAP.width, top: (1 - player.industrialToRetail) * MAP.height };
}

const markerClass: Record<LandscapePlayer["kind"], string> = {
  rival: "h-7 w-7 rounded-full bg-rival",
  us: "h-12 w-12 rounded-full bg-ocean shadow-[0_0_0_10px_var(--color-ocean-wash)]",
  platform: "h-7 w-7 border-[5px] border-ink bg-paper",
};

const labelClass: Record<LandscapePlayer["kind"], string> = {
  rival: "text-caption font-semibold text-ink",
  us: "text-lede font-extrabold text-ocean",
  platform: "text-caption font-semibold text-ink-muted",
};

function markerAppears(index: number): Variants {
  return {
    enter: { opacity: 0, scale: 0.4 },
    present: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeDrawn, delay: 0.8 + index * 0.12 } },
  };
}

function labelSide(player: LandscapePlayer) {
  return player.offToOn > 0.85 ? "flex-row-reverse" : "flex-row";
}

function Marker({ player, index, selected, onSelect }: { player: LandscapePlayer; index: number; selected: boolean; onSelect: (name: string) => void }) {
  const position = positionOf(player);
  return (
    <motion.button
      type="button"
      variants={markerAppears(player.kind === "us" ? players.length : index)}
      aria-pressed={selected}
      onClick={() => onSelect(player.name)}
      onPointerEnter={() => onSelect(player.name)}
      className={`group absolute flex -translate-y-1/2 items-center gap-4 rounded-full p-2 ${labelSide(player)} ${selected ? "bg-paper-raised shadow-lift" : ""}`}
      style={{ left: position.left, top: position.top, translateX: player.offToOn > 0.85 ? "calc(-100% + 28px)" : "-28px" }}
    >
      <span aria-hidden className={`shrink-0 ${markerClass[player.kind]}`} />
      <span className={`whitespace-nowrap pr-2 ${labelClass[player.kind]}`}>{player.name}</span>
    </motion.button>
  );
}

function Axes() {
  return (
    <>
      <div aria-hidden className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 bg-ink" />
      <div aria-hidden className="absolute top-0 left-1/2 h-full w-[3px] -translate-x-1/2 bg-ink" />
      <p className="absolute top-1/2 left-0 mt-4 text-caption font-semibold text-ink-muted">{landscape.axes.x[0]}</p>
      <p className="absolute top-1/2 right-0 mt-4 text-right text-caption font-semibold text-ink-muted">{landscape.axes.x[1]}</p>
      <p className="absolute top-0 left-1/2 ml-5 text-caption font-semibold text-ink-muted">{landscape.axes.y[1]}</p>
      <p className="absolute right-1/2 bottom-0 mr-5 text-right text-caption font-semibold text-ink-muted">{landscape.axes.y[0]}</p>
    </>
  );
}

function OpenQuadrant() {
  return (
    <motion.div
      aria-hidden
      variants={{ enter: { opacity: 0 }, present: { opacity: 1, transition: { duration: 1, delay: 2.2 } } }}
      className="hatch absolute top-0 right-0 h-1/2 w-1/2"
    />
  );
}

function Detail({ player }: { player: LandscapePlayer }) {
  const source = player.source ? sources[player.source] : null;
  return (
    <motion.div key={player.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} aria-live="polite">
      <p className={`text-title font-extrabold ${player.kind === "us" ? "text-ocean" : ""}`}>{player.name}</p>
      <p className="mt-5 text-body">{player.description}</p>
      {source && <p className="mt-5 text-fineprint text-ink-muted">{source.cite}</p>}
    </motion.div>
  );
}

export function LandscapeSlide() {
  const [selected, setSelected] = useState(us.name);
  const selectedPlayer = players.find((player) => player.name === selected) ?? us;
  return (
    <StepView className="grid grid-cols-[1fr_520px] gap-gap">
      <div className="flex flex-col gap-10">
        <h2 className="text-title font-extrabold">
          <MaskedLines lines={headlineLines} delay={0.1} />
        </h2>
        <motion.div variants={fadeReveal(0.4)} className="relative" style={{ width: MAP.width, height: MAP.height }}>
          <OpenQuadrant />
          <Axes />
          {players.map((player, index) => (
            <Marker key={player.name} player={player} index={index} selected={player.name === selected} onSelect={setSelected} />
          ))}
        </motion.div>
      </div>
      <motion.aside variants={fadeReveal(1.2)} className="flex flex-col justify-end rounded-card bg-paper-raised p-12 shadow-lift">
        <Detail player={selectedPlayer} />
      </motion.aside>
    </StepView>
  );
}

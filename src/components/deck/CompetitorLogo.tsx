import { motion } from "motion/react";
import type { Competitor } from "@/content/content";
import { asset } from "@/lib/asset";
import { FootnoteMark } from "./primitives";

type CompetitorLogoProps = { competitor: Competitor; footnote?: number; maxWidth?: number };

export function CompetitorLogo({ competitor, footnote, maxWidth }: CompetitorLogoProps) {
  if (!competitor.logo || !competitor.url) return null;
  return (
    <a
      href={competitor.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-start"
      aria-label={`${competitor.name} website`}
    >
      <motion.img
        src={asset(competitor.logo.file)}
        alt={competitor.name}
        draggable={false}
        className="logo-ink block object-contain"
        style={{ height: competitor.logo.height, maxWidth }}
      />
      {footnote ? <FootnoteMark numbers={[footnote]} /> : null}
    </a>
  );
}

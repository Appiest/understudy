const PERSON_PATH = "M4 80 V52 a16 16 0 0 1 16 -16 a16 16 0 0 1 16 16 V80 Z";

export const PERSON_GLYPH = { width: 40, height: 84 };

export function PersonGlyph({ tone }: { tone: "ink" | "ocean" }) {
  const fill = tone === "ocean" ? "var(--color-ocean)" : "var(--color-ink)";
  return (
    <>
      <circle cx={20} cy={16} r={12} fill={fill} />
      <path d={PERSON_PATH} fill={fill} />
    </>
  );
}

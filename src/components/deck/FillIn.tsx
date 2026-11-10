import { isPlaceholder } from "@/content/config";

/** Shows a config value, and marks it as unfinished while it's still a bracketed placeholder. */
export function FillIn({ value, className = "" }: { value: number | string; className?: string }) {
  const text = String(value);
  if (!isPlaceholder(text)) return <span className={className}>{text}</span>;
  return <span className={`rounded-sm bg-paper-sunken px-2 text-ink-muted ${className}`}>{text}</span>;
}

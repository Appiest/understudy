"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useEffect, type ReactNode } from "react";

const linkClass = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold hover:bg-paper-sunken";

type PageNavProps = {
  label: string;
  slideNumber: number;
  slideCount: number;
  hashFor: (slideNumber: number) => string;
  widthClass: string;
  children?: ReactNode;
};

export function PageNav({ label, slideNumber, slideCount, hashFor, widthClass, children }: PageNavProps) {
  const previous = slideNumber > 1 ? slideNumber - 1 : null;
  const next = slideNumber < slideCount ? slideNumber + 1 : null;
  return (
    <nav aria-label={label} className="sticky top-0 z-10 bg-paper/90 backdrop-blur">
      <div className={`mx-auto flex ${widthClass} flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 md:px-8`}>
        <div className="flex flex-wrap items-center gap-1">
          <a href={`#${slideNumber}`} className={`${linkClass} bg-ink text-paper hover:bg-ink`}>
            <ArrowLeft size={16} weight="bold" aria-hidden />
            Back to slide {slideNumber}
          </a>
          {children}
        </div>
        <div className="flex items-center gap-1">
          {previous && (
            <a href={hashFor(previous)} className={linkClass}>
              <ArrowLeft size={16} weight="bold" aria-hidden />
              Slide {previous}
            </a>
          )}
          {next && (
            <a href={hashFor(next)} className={linkClass}>
              Slide {next}
              <ArrowRight size={16} weight="bold" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export function PageNavLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a href={href} className={`${linkClass} text-ink-muted hover:text-ink`}>
      {icon}
      {children}
    </a>
  );
}

export function useEscapeBackToSlide(slideNumber: number) {
  useEffect(() => {
    window.scrollTo(0, 0);
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      window.location.hash = `#${slideNumber}`;
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideNumber]);
}

export function clampSlideNumber(slideNumber: number, slideCount: number) {
  return Math.min(Math.max(slideNumber, 1), slideCount);
}

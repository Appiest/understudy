"use client";

import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import { exitTransition } from "@/lib/motion";
import { NotesPanel } from "./NotesPanel";
import { SlideFooter } from "./SlideFooter";
import { slides } from "./slides";
import { useDeckNavigation } from "./useDeckNavigation";
import { useIdleCursor, usePresenterKeys, useStageScale } from "./usePresenterKeys";

const slideStepCounts = slides.map((slide) => slide.steps);

const slideFrame: Variants = {
  exit: { opacity: 0, transition: exitTransition },
};

export function Deck() {
  const { index, step, ready, handlePointerDown, handlePointerUp, handleContextMenu } = useDeckNavigation(slideStepCounts);
  const { notesOpen, toggleNotes } = usePresenterKeys();
  const cursorIsIdle = useIdleCursor();
  const scale = useStageScale();
  const slide = slides[index];

  return (
    <MotionConfig reducedMotion="user">
      <main
        className={`fixed inset-0 flex items-center justify-center overflow-hidden bg-paper select-none ${cursorIsIdle && !notesOpen ? "cursor-none" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onContextMenu={handleContextMenu}
      >
        <div className="stage relative shrink-0 overflow-hidden bg-paper" style={{ scale: scale ?? 1, opacity: scale === null || !ready ? 0 : 1 }}>
          <AnimatePresence mode="wait">
            {ready && (
              <motion.section
                key={slide.id}
                aria-label={`Slide ${index + 1} of ${slides.length}: ${slide.name}`}
                className="absolute inset-0"
                variants={slideFrame}
                initial="enter"
                animate="present"
                exit="exit"
              >
                <slide.Content step={step} />
              </motion.section>
            )}
          </AnimatePresence>
          <SlideFooter slide={slide} step={step} slideNumber={index + 1} />
          <div aria-hidden className="paper-grain pointer-events-none absolute inset-0" />
        </div>
        <NotesPanel open={notesOpen} slide={slide} onClose={toggleNotes} />
      </main>
    </MotionConfig>
  );
}

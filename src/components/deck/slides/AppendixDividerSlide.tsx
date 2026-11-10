"use client";

import { igniteAppendix } from "@/content/content";
import { MaskedLines, StepView } from "../primitives";

export function AppendixDividerSlide() {
  return (
    <StepView className="flex flex-col justify-center">
      <h2 className="text-poster font-black">
        <MaskedLines lines={[igniteAppendix.heading]} delay={0.05} />
      </h2>
    </StepView>
  );
}

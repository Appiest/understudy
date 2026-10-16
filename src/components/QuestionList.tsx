import { ArrowRight } from "@phosphor-icons/react";
import type { Question } from "@/content/facts";

export function QuestionList({ questions }: { questions: Question[] }) {
  return (
    <div className="mt-6 flex flex-col gap-3">
      {questions.map((item) => (
        <details key={item.question} className="group rounded-2xl bg-paper-raised shadow-lift open:pb-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-semibold">
            {item.question}
            <ArrowRight size={18} weight="bold" aria-hidden className="shrink-0 transition-[rotate] duration-150 group-open:rotate-90" />
          </summary>
          <p className="max-w-prose px-6 pb-4 text-base leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

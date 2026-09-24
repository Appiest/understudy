import { canvas, type CanvasPlayer } from "@/content/content";
import { canvasMethod, canvasRationale } from "@/content/facts";

const MAX_SCORE = 10;
const players: CanvasPlayer[] = canvas.players;

function ScoreCell({ score, isUs }: { score: number; isUs?: boolean }) {
  return (
    <td className={`px-3 py-2.5 text-right ${isUs ? "bg-ocean-wash font-bold text-ocean-deep" : ""}`}>
      <span className="inline-flex items-center justify-end gap-2">
        <span aria-hidden className="hidden h-1.5 w-10 overflow-hidden rounded-full bg-paper-sunken sm:block">
          <span className={`block h-full rounded-full ${isUs ? "bg-ocean" : "bg-rival"}`} style={{ width: `${(score / MAX_SCORE) * 100}%` }} />
        </span>
        <span className="figures-tabular">{score}</span>
      </span>
    </td>
  );
}

export function CanvasScores() {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-extrabold">How the value curves are drawn</h2>
      <div className="mt-4 max-w-prose space-y-3 text-base leading-relaxed">
        {canvasMethod.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl bg-paper-raised shadow-lift">
        <table className="w-full min-w-[760px] text-sm">
          <caption className="px-4 pt-4 text-left text-base font-semibold">Scores from 0 (none) to 10 (the most in the market)</caption>
          <thead>
            <tr className="text-left">
              <th scope="col" className="px-4 py-3 font-semibold">Factor</th>
              {players.map((player) => (
                <th key={player.name} scope="col" className={`px-3 py-3 text-right font-semibold ${player.isUs ? "text-ocean" : ""}`}>
                  {player.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {canvas.factorDetails.map((factor, factorIndex) => (
              <tr key={factor} className="odd:bg-paper/60">
                <th scope="row" className="px-4 py-2.5 text-left font-medium">{factor}</th>
                {players.map((player) => (
                  <ScoreCell key={player.name} score={player.scores[factorIndex]} isUs={player.isUs} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-10 text-xl font-extrabold">Why each factor scores the way it does</h3>
      <dl className="mt-4 flex flex-col gap-5">
        {canvasRationale.map((item) => (
          <div key={item.factor} className="max-w-prose">
            <dt className="text-base font-bold">{item.factor}</dt>
            <dd className="mt-1 text-base leading-relaxed text-ink-muted">{item.why}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

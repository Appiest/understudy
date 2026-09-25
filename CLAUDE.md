# Understudy

A web slide deck for our USC Iovine and Young Academy Blue Ocean Strategy project. The deck pitches AI smart glasses that learn a store's best employee's know-how and coach new hires during real shifts.

`claude-code-prompt-blue-ocean-presentation.md` is the master brief. It sets the slide content, the rubric items (b) through (g), the statistics and their sources, and the placeholders. When the brief and this file disagree on design or tooling, this file wins. When they disagree on content or rubric coverage, the brief wins.

## Stack

- Next.js (App Router, static export) with TypeScript and Tailwind CSS v4
- `motion` for animation
- Phosphor Icons (`@phosphor-icons/react`), not lucide and not emojis. This overrides the brief.
- All slide copy, stats, sources and canvas scores live in one content file. All team placeholders (`[PRODUCT NAME]`, `[TEAM NAME]` and so on) live in one config file.

The visual reference is the Standard Physics deck: one full-bleed stage, huge display type, drawn SVG diagrams that animate in, paper grain, a neutral palette with one accent, and fine-print sources.

Keep the slides clean: no progress bar, dots, slide counter or rubric labels. This overrides the brief, which asks for them. Each slide's footer carries its sources on the left and a small, faint "Slide x, beat y" label on the right, which the team uses to coordinate during rehearsal. Pressing B shows or hides the label, the browser remembers the choice, and the print version always leaves it out.

## Content rules from our reviews

- **Back up every number.** Every figure on a slide has an entry in `src/content/facts.ts` with its source, a short quote and a status (matches the source, corrected, team estimate or illustration). It shows on that slide's fact page at `#x/data`. Check a figure against the source itself, not someone's summary of it, and when a number can't be traced to an original report, say so. If you change a number on a slide, update its fact entry in the same pull request.
- **Every beat has to make sense on its own.** Headings state the point literally ("Driver 1: AI can now turn a recorded shift into step-by-step instructions"), never a metaphor the slide doesn't explain ("Two curves just crossed").
- **Say what a number counts, right beside it.** "46%" alone is meaningless. "46% of retail jobs turned over in 2025" isn't.
- **Keep on-slide text short enough to read at a glance.** Questions fit on one line or two. When a slide lists parallel items, give each its own card with the name large and one short line of detail instead of full sentences.
- **Charts need enough data to show a trend.** Two data points don't persuade anyone, so find a longer series. Mark missing data in the chart rather than hiding it.
- **Don't raise a doubt the slide doesn't answer.** For example, "big companies left enterprise headsets" invites "why?", so the slide shows the answer: they're moving to glasses.
- **Don't split one idea across beats that don't need it.** Stage the reveal with animation inside a single beat instead.
- **Battery life isn't something we raise or solve right now.** Don't mention it on slides or fact pages.
- **Our answer on competition:** bigger players will go after large enterprises first, so we start with a scrappier product for small businesses and grow from there.

## General

- Don't write summary markdown files or make copies of files (`.backup`, `.old`). We use Git.
- Use tools to understand a problem before changing code. Never make up data or statistics. Every number on a slide needs a source.
- Code should explain itself through clear names. Comment only tricky logic.
- Passing the lint and cyclomatic complexity checks is a hard requirement, the same as a type error or a failing test. Pull branchy logic into named functions, replace nested conditionals with early returns or a lookup, and split a function that does more than one job.
- Never use em dashes anywhere: slide text, notes, code or comments. Use commas, colons, periods or parentheses.

## Design standards

- Make professional, well-designed UI with no blurple. It should look good and still be easy to skim.
- Write copy in approachable, human, conversational terms.
- Never use gradient text (`bg-clip-text` with `text-transparent` or similar).
- Never put a visible colored border on an element with rounded corners, because the border anti-aliases unevenly at the corners. Use a shadow, ring or fill instead, and keep visible borders for sharp-cornered elements. Thin neutral borders on rounded form inputs are the one exception.

### Typography

- Never use Lora or similar bracketed, moderate-contrast "blog default" serifs for display or headings.
- Never use high-contrast italic display serifs anywhere (Instrument Serif, Playfair Display, DM Serif Display, Cormorant, Fraunces italic, Libre Caslon Display, Bodoni Moda, Italiana).
- Research Google Fonts before picking type. Check the weights, optical sizes and whether a variable version exists.
- Never set text in all caps unless the content is really uppercase (acronyms, codes, ticker symbols). That includes labels, buttons, nav and emphasis.
- Don't change letter-spacing. If type looks wrong at a size, the size or the family is wrong.
- The letter-spaced uppercase micro-label is banned, even when a library or reference recommends it. Small labels stay in sentence case at a readable size.
- Use monospace only for real code, data or figures aligned in a column. Never use it to make headings, captions or labels feel technical.
- Use the type scale (`text-sm`, not `text-[9px]`). Arbitrary values need a reason.

### Define it once

Anything that appears more than once gets one definition that everything else references:

- **Type:** text styles defined in the theme, not per-element font declarations.
- **Color:** semantic tokens (`--surface`, `--text-muted`, `--accent`) defined in one place, never raw hex or Tailwind colors scattered through components.
- **Elements:** a button is one `Button` component with variants. The same goes for cards, badges, tiles and slide primitives.
- **Spacing, radii, shadows and motion:** scales and easing curves live in the theme.

If a design change means touching many files, the abstraction is missing. Extend the existing theme and components before starting new ones.

### Layout

- No eyebrows (the small label floating above a heading).
- No short decorative horizontal rules.
- No decorative section numbers. Number things only when the reader needs the number to find or cite them, and set it in the heading's own font.
- No middot metadata strips (`Thing · Category · Person · Year`). Important facts get a key/value block or a real sentence, and the rest gets cut.
- No reflexive rows of three (three cards, three stats, three steps). Show as many things as there really are.
- Avoid colored icons on pastel rounded squares as a layout device.
- No mystery controls. A button or link says what it does before it's clicked ("Open our Figma board", not "Figma").
- A hot, saturated accent is for glow, motion and small marks, not for filling primary buttons or chips. Controls stay neutral with one calm accent.
- Text is the last resort. Before writing a label or caption, ask whether size, weight, color, position, a container, an icon or a small diagram could carry the same fact.
- Give each section one heading that names the thing, with no comma and no supporting paragraph that restates it.
- Prefer a diagram, table or marked-up state over prose that says the same thing. Put details that don't fit into presenter notes or behind a disclosure.
- Hierarchy: make the most important element dominant through size, color and contrast, and demote everything else.
- Show grouping with proximity, shared containers and alignment, not with headings that announce the group.
- Every meaningful state gets a visible change (shape, color, position, motion or contrast), not a text label.

These rules target reflexes, not accessibility. Accessible names, alt text and screen reader labels are never the thing being cut.

### Ambition

The deck should look like a design textbook or a designer's portfolio. Take on the big version of the task.

- Use real imagery: generated images, or models built in Blender or Inkscape. No stock photos of people in headsets and no real company logos.
- Use animation and interactivity, and check animations frame by frame instead of assuming the CSS is right.
- Carry detail all the way through: grain, texture, edge treatment and weight.
- Repeat one motif across the whole deck, the way strong writers and photographers repeat an image.

## Writing

- No paraprosdokians (a sentence that turns on its second half for a wink).
- No rising tricolons and no three-beat rhythms.
- No fragments punctuated as sentences for drama. Every sentence needs a subject and a verb.
- Explain, don't evoke. A metaphor can sit beside a definition but never replace it.
- Length isn't the enemy, vagueness is. Name each new term where it first appears, show a concrete example and give the reason a thing works.
- Split the work between pictures and text. Before writing a third paragraph, ask whether a diagram, worked example or before/after pair would say it better.
- No trailing phrases that rename what came before without a verb of their own, whether attached with a dash, colon or comma.
- No evaluative tags ("...and that's the point", "...which is important").
- Don't hang the point of a sentence off its end. If the key fact sits in a trailing clause, promote it to a main clause or split the sentence.
- A caption, tooltip or helper line must carry a fact the reader can't get from what it sits beside. Cover the image or control: if the words still say something specific, keep them.

## Interface skills

If your Claude Code setup has the `better-*` skills (`better-ui`, `better-typography`, `better-colors`, `better-layout`, `better-accessibility`, `better-writing`, `better-interface`), load the relevant ones before writing UI. Where a skill conflicts with this file, this file wins.

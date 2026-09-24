# Prompt for Claude Code: Blue Ocean Strategy Web App Presentation

Copy everything below this line into Claude Code.

---

## Your task

Build a polished, compelling **web app slide presentation** for a university team project (USC Iovine and Young Academy). It will be presented live in class and submitted to Brightspace. The presentation introduces a new business idea: **AI smart glasses that capture an expert employee's know-how and then coach new hires on the job**, targeted at high-turnover businesses like independent grocery stores, retail shops, and restaurants.

Build it as a single-page web app (Vite + React + TypeScript is fine, or plain HTML/CSS/JS if simpler) with:

- 7 main slides plus an optional appendix/sources slide
- Keyboard navigation (left/right arrows, space), a progress indicator, and slide numbers
- Presenter notes toggle (press `N`) showing the speaker script for each slide
- Full-screen friendly at 16:9, readable from the back of a classroom, and still usable on a laptop screen
- Tasteful animations (value curve lines drawing in, stats counting up), nothing gimmicky
- Deployable as a static site (e.g., `npm run build` output works on Vercel or GitHub Pages)

## Writing rules (important)

- **Never use em dashes (—) anywhere in the slide text, notes, or code comments.** Use commas, colons, periods, or parentheses instead.
- Keep slide text short and punchy. Details go in presenter notes.
- Every statistic on a slide needs a small source citation (source + year) in the footer of that slide.
- Mark estimates and dated figures honestly (for example "2017 estimate", "team estimate").
- Use placeholders for things I will fill in: `[PRODUCT NAME]`, `[TEAM NAME]`, `[TEAM MEMBERS]`, `[FIGMA BOARD LINK]`, `[MIND MAP IMAGE]`. Put all placeholders in one config file (e.g., `src/config.ts`) so I can edit them in one place.

## Assignment requirements (the rubric this must hit)

Goal: a multi-week team project to identify and develop a new business idea using fundamental business planning tools, starting with Blue Ocean Strategy idea generation. The team must write a **5 to 7 slide presentation** that covers all of the following. Each one must be clearly visible:

- **(b)** Remind each other of our tips to avoid "Solution Jumping"
- **(c)** Define the challenge and the evidence that supports it as a focus (market opportunity)
- **(d)** Identify the exponential driver(s) we leverage
- **(e)** Introduce the proposed solution and business/product idea
- **(f)** Create a **Blue Ocean value map** (strategy canvas) comparing our idea to current solutions in the space
- **(g)** Include a **Mind Map of the problem space** (an image plus a link out to our Figma board)

The framework comes from W. Chan Kim and Renée Mauborgne, "Blue Ocean Strategy: From Theory to Practice," *California Management Review* 47(3), Spring 2005. Use its vocabulary correctly: red ocean, blue ocean, value innovation, strategy canvas, value curve, Four Actions Framework, Eliminate-Reduce-Raise-Create (ERRC) grid, noncustomers, alternatives, and the three characteristics of a good strategy (focus, divergence, compelling tagline).

## Key Blue Ocean concepts to reflect (from the article)

- **Red oceans** are existing industries where companies fight over existing demand. **Blue oceans** are uncontested market space created by expanding industry boundaries.
- **Value innovation:** raise buyer value AND lower cost at the same time, breaking the differentiation vs. low cost trade-off.
- Look to **alternatives** (not just direct competitors) and **noncustomers** (not just current customers).
- **Four Actions:** Eliminate and Reduce lower cost. Raise and Create lift buyer value.
- **Strategy canvas:** the horizontal axis lists the factors the industry competes on. The vertical axis shows the offering level (low to high). Each player's line is its **value curve**. Existing players tend to have value curves with the same shape ("different in the same way"). A blue ocean value curve diverges.
- The famous example is Casella Wines' **[yellow tail]**: it reframed wine from "sophisticated wine for special occasions" into "a fun, easy wine for every day," eliminated wine jargon, aging, and heavy marketing, and created easy drinking, ease of selection, and fun. The article's canvas puts eliminated/reduced factors on the left and new factors on the right. Mirror that layout.

## Slide by slide content

### Slide 1: Title + how we avoided Solution Jumping (rubric b)

- Title: `[PRODUCT NAME]`
- Tagline: **"Your best employee, in every new hire's ear."**
- Subtitle: A Blue Ocean approach to frontline training in high-turnover businesses
- `[TEAM NAME]` and `[TEAM MEMBERS]`
- A compact "Our rules against Solution Jumping" panel (the team can edit these):
  1. Fall in love with the problem, not the technology. We started from turnover, not from "let's use AR glasses."
  2. Talk to noncustomers first: owners who have no training department and no budget for VR.
  3. Write the problem as the buyer's struggle, not as a missing feature.
  4. Check alternatives outside our industry before designing anything.
  5. Every claim needs evidence before it goes on a slide.
- Presenter note: explain that our first instinct was a solution (glasses), so we deliberately reframed around the problem and validated it with data before committing.

### Slide 2: The challenge and the evidence (rubric c)

Headline: **"Every new hire costs owners time they don't have."**

Big stat tiles (animate the numbers):

- **~45% per year**: retail workers leaving their jobs. BLS JOLTS shows the retail total separations rate averaged **3.8% per month in 2025** (about 45% annualized). Source: BLS JOLTS Table 20, 2025.
- **~65% per year**: accommodation and food services, **5.5% per month in 2025**. Source: BLS JOLTS Table 20, 2025.
- **$4,200**: estimated cost to replace one part-time grocery employee; about **$67,200 per store per year** in turnover cost. Source: Coca-Cola Retailing Research Council via Grocery Dive, 2017 estimate (label it as dated).
- A quote tile: "Previously, we had to send three to four people to the store to train associates." (Andy Trainor, Walmart VP of US Learning, via Strivr case study)

Problem framing (reframe like [yellow tail]):

- Industry question today: "How do we build better training content?"
- Our question: **"How does a new hire do the job right on day 3, with an expert over their shoulder, without the expert being there?"**

Noncustomers (three tiers, from the Blue Ocean Strategy book):

- Tier 1 (soon-to-be): chains that ran VR or app pilots and dropped them
- Tier 2 (refusing): independent grocers, franchisees, and local restaurants with no L&D team and no budget
- Tier 3 (unexplored): small service businesses where training is purely "shadow someone"

Presenter note: our target customers are the noncustomers that today's training industry ignores, just like Casella targeted beer and cocktail drinkers.

### Slide 3: Exponential drivers (rubric d)

Headline: **"Two curves just crossed."**

- **Driver 1: Multimodal AI** that understands first-person video and speech can now turn recorded work into step-by-step procedures and answer questions in real time.
- **Driver 2: Cheap, socially acceptable AI glasses.**
  - Glasses were **84.6% of all XR shipments in Q2 2026** (headsets fell to 15.4%, from 27.1% a year earlier). Source: IDC via Mixed News, Sept 2026.
  - Meta and EssilorLuxottica sold **about 7 million** smart glasses in 2025, more than triple 2024. Source: EssilorLuxottica Q4 2025 earnings via UploadVR.
  - Google and Samsung launch Android XR glasses with Warby Parker and Gentle Monster in fall 2026. Source: Google blog, May 2026.
- **The enterprise gap:** incumbents are retreating from headsets.
  - Microsoft discontinued HoloLens 2 (security updates end Dec 31, 2027). Source: Road to VR.
  - Meta stopped selling Quest for Business and Horizon managed services as of Feb 20, 2026.
  - Meta's Reality Labs lost **$4.6B in Q2 2026** and is pivoting to AI glasses. Source: TechSpot / CNBC, July 2026.
- Visual idea: a simple chart showing glasses share rising vs. headset share falling (72.9% to 84.6% glasses, Q2 2025 to Q2 2026).

### Slide 4: The solution (rubric e)

Headline: `[PRODUCT NAME]`: **"Clone your best worker."**

How it works (3 step animated flow):

1. **Capture:** the owner or the store's best employee wears the glasses for about a week of normal shifts. Nothing extra to do.
2. **Learn:** AI turns the footage and audio into a store-specific playbook: procedures, layout, POS steps, house rules, judgment calls.
3. **Coach:** new hires wear the glasses. The AI guides them through tasks by audio, answers "where does this go?" questions, and flags mistakes on key tasks (stocking to planogram, food safety steps, register close). The owner gets a dashboard showing who is ready for what.

Be honest about scope (put in presenter notes and a small "Realistic v1" callout):

- v1 = procedure library + audio guidance + Q&A.
- Mistake detection only on a few well-defined tasks at first (the approach Retrocausal uses in factories).
- Hardware: off-the-shelf AI glasses (~$300 class) or open platforms like Mentra's SDK, not custom hardware.
- Risks to name: customer privacy and recording consent, battery life (for example VITURE Helix quotes about 60 minutes while charging), and bigger players moving into retail.

Business model placeholder: per-store monthly subscription plus glasses. Mark as "to be developed in later weeks."

### Slide 5: Blue Ocean value map / strategy canvas (rubric f, the centerpiece)

Build an **interactive line chart strategy canvas** (SVG or a chart library). Hovering a line highlights it; a legend lets you toggle players. Our curve should be visually dominant (bold, accent color); competitors should be muted.

Factors (x-axis, left to right, mirroring the article's layout with eliminated/reduced factors first and new factors last):

1. Cost per store
2. Senior staff time pulled off the floor
3. Custom content production needed
4. Hardware cost and complexity
5. Time spent training away from the job
6. Store-specific knowledge
7. Learning during real shifts
8. Live hands-free correction
9. Owner visibility into readiness
10. Expert knowledge capture

Scores (0 to 10, higher = more of that factor; these are **team estimates for illustration**, label them that way on the slide):

| Player | 1 Cost | 2 Staff time | 3 Content | 4 Hardware | 5 Off-job | 6 Store-specific | 7 On-shift | 8 Live correction | 9 Owner visibility | 10 Knowledge capture |
|---|---|---|---|---|---|---|---|---|---|---|
| Shadowing a coworker | 5 | 9 | 1 | 0 | 2 | 8 | 8 | 5 | 2 | 3 |
| Paper binder / manual | 2 | 3 | 5 | 0 | 6 | 5 | 2 | 0 | 1 | 4 |
| Phone microlearning (YOOBIC, Axonify) | 4 | 2 | 6 | 2 | 7 | 3 | 2 | 0 | 7 | 2 |
| VR training (Strivr) | 9 | 3 | 10 | 9 | 10 | 2 | 0 | 3 | 7 | 2 |
| Industrial AI glasses (VITURE Helix, Augmentir) | 8 | 3 | 6 | 7 | 2 | 6 | 8 | 7 | 8 | 7 |
| **[PRODUCT NAME]** | 3 | 1 | 1 | 3 | 1 | 10 | 10 | 8 | 9 | 10 |

Next to or below the canvas, show the **ERRC grid** as a 2x2:

- **Eliminate:** pulling a senior employee off the floor to train; custom content production (VR scenarios, videos); separate training sessions
- **Reduce:** hardware cost (~$300 glasses, not $3,500 headsets); time until a new hire is productive; owner setup effort
- **Raise:** learning during real shifts; store-specific knowledge (your layout, your POS, your rules); owner visibility into who is ready
- **Create:** "clone your best worker" knowledge capture; live, hands-free correction in the moment; training that improves with every shift recorded

Add a small "Three characteristics check" strip:

- **Focus:** we don't compete on immersion or content volume
- **Divergence:** our curve is the mirror image of VR training
- **Tagline:** "Your best employee, in every new hire's ear."

Optional second view (a toggle): the **[yellow tail] analogy**, showing that Ray-Ban Meta did to headsets what [yellow tail] did to wine (eliminated the immersive display and controllers, reduced weight and price, created style, all-day wear, and an AI that sees what you see).

### Slide 6: Competitive landscape (supports c, e, f)

Headline: **"Live coaching exists for factories. Retail still trains off the floor."**

A 2x2 positioning map:

- X-axis: **Off-the-job training** to **On-the-job guidance**
- Y-axis: **Industrial / enterprise** to **Retail / small business**
- Plot:
  - Strivr: retail-leaning (Walmart), off-the-job VR. Walmart trained 2.2M+ associates across 4,700+ stores; Pickup Tower training cut from 8 hours to 15 minutes.
  - YOOBIC, Axonify: retail, off-the-job phone microlearning
  - VITURE Helix: industrial, on-the-job AI safety glasses (announced June 2026, ships Q1 2027, from $599)
  - Retrocausal: industrial, on-the-job, fixed cameras, set up from a single recorded example
  - Airwave: field service, on-the-job, captures technician know-how
  - Augmentir: industrial, AI turns documents and video into work instructions
  - **[PRODUCT NAME]: retail / small business + on-the-job (the empty quadrant, highlighted)**
- Include a one-line description of each on hover or click.
- Mentra: show as an "enabling platform" (open-source AI glasses SDK), not a competitor.

### Slide 7: Mind map of the problem space (rubric g)

- Display `[MIND MAP IMAGE]` large, with a clear button: **"Open our Figma board"** linking to `[FIGMA BOARD LINK]`.
- Until the image is added, render a placeholder mind map in SVG with these branches so the slide still works:
  - **Center:** Constant retraining in high-turnover businesses
  - **Causes of turnover:** low pay, scheduling, poor onboarding, burnout
  - **Cost of training:** senior staff time, lost productivity, mistakes and waste, customer experience
  - **What new hires struggle with:** store layout, POS, policies, judgment calls, fear of asking
  - **Tacit knowledge:** what the owner and best employees know that isn't written down
  - **Noncustomers:** independent grocers, franchisees, local restaurants
  - **Alternatives:** shadowing, binders, phone apps, VR, industrial AI glasses
  - **Enabling tech:** multimodal AI, AI glasses, open SDKs
  - **Risks:** privacy and consent, battery life, adoption by older owners, big players entering
- End with a closing line: "Next: interview 5 owners, test capture on one real shift, refine the canvas."

### Appendix: Sources

List all sources with links:

- Kim, W.C. and Mauborgne, R. (2005). "Blue Ocean Strategy: From Theory to Practice." *California Management Review* 47(3).
- BLS JOLTS Table 20, annual average total separations rates: https://www.bls.gov/news.release/jolts.t20.htm
- Grocery Dive, $67K annual turnover cost per store (2017): https://www.grocerydive.com/news/grocery--a-grocery-stores-average-annual-turnover-cost-is-67k-says-consultant/534692/
- Strivr x Walmart case study: https://www.strivr.com/customers/walmart
- IDC Q2 2026 XR shipments (Mixed News): https://mixed-news.com/en/idc-smart-glasses-shipments-q2-2026-vr-headsets-decline/
- UploadVR, 7M Meta glasses sold in 2025: https://www.uploadvr.com/meta-essilorluxottica-sold-7-million-smart-glasses-in-2025/
- Google Android XR glasses (May 2026): https://blog.google/products-and-platforms/platforms/android/android-xr-io-2026/
- Road to VR, HoloLens 2 discontinued: https://roadtovr.com/microsoft-hololens-2-discontinued-support-2027-hololens-3/
- Meta Quest for Business ending (Skillsive): https://www.skillsive.com/blog/meta-quest-for-business-ends-what-it-means-for-vr-training
- TechSpot, Reality Labs Q2 2026 loss: https://www.techspot.com/news/113304-meta-reality-labs-division-lost-46-billion-q2.html
- VITURE Helix announcement: https://www.viture.com/blog/viture-unveils-helix-the-first-ai-safety-glasses-built-on-nvidia-s-xr-ai-solution-at-awe-2026
- Retrocausal Live Worker Guidance: https://retrocausal.ai/live-worker-guidance/
- Airwave: https://www.airwave.us/why-airwave
- Mentra: https://mentraglass.com/
- Augmentir: https://www.augmentir.ai/
- YOOBIC retail training platforms 2026: https://yoobic.com/blog/top-10-retail-training-platforms-for-frontline-employees-2026/

## Design direction

- Feel: confident startup pitch meets strategy class. Clean, modern, lots of whitespace.
- Color: a deep ocean blue as the primary accent (blue ocean), a muted red for "red ocean" competitors on charts, neutral grays for everything else. Support dark mode if easy, but default to a light theme that projects well.
- Typography: one strong sans-serif (e.g., Inter or similar from Google Fonts), large headlines (48px+ on 1080p), body text no smaller than 24px on slides.
- Charts: our line thick and saturated; competitors thin and muted; direct labels on lines instead of relying only on a legend.
- Use icons sparingly (lucide-react is fine). No stock photos of people wearing headsets; simple illustrations or diagrams instead.
- Do not use any real company logos. Refer to companies by name in text only.

## Technical notes

- Put all slide content (text, stats, sources, scores) in a single data file (e.g., `src/content.ts`) so the team can edit copy without touching components.
- Canvas scores live in that data file too, so we can adjust them after owner interviews.
- Add a "print / export to PDF" stylesheet so each slide prints on its own landscape page (useful for the Brightspace submission).
- Include a short README with run, build, and deploy steps and a list of placeholders to fill in.

## Before you finish, verify

1. All six rubric items (b through g) are clearly visible, and each slide's header or a small tag says which rubric item it covers.
2. There are no em dashes anywhere in the project (search the codebase for "—" and replace any you find).
3. Every stat has a source citation on its slide.
4. The strategy canvas renders correctly, our value curve clearly diverges, and the "team estimates" label is visible.
5. Keyboard navigation, presenter notes, and print-to-PDF all work.
6. The presentation stays within 7 main slides (the sources appendix doesn't count).

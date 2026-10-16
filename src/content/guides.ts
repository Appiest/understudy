import { market, revenueFormatter, yearlyRevenue } from "./content";
import type { Question } from "./facts";

export type GuidePart = {
  name: string;
  /** Where the pin sits, as a percentage of the slide's width and height. */
  at: { x: number; y: number };
  explanation: string;
};

export type RubricCheck = { requirement: string; howWeMeetIt: string };

export type SlideGuide = {
  purpose: string;
  parts: GuidePart[];
  rubric: RubricCheck[];
  vcQuestions: Question[];
  professorQuestions: Question[];
};

export const professorName = "Kanazawa";

const [, serviceableRing, obtainableRing] = market.rings;
const count = (value: number) => new Intl.NumberFormat("en-US").format(value);
const yearly = (locations: number) => revenueFormatter(yearlyRevenue(locations))(yearlyRevenue(locations));

const definitionGuide: SlideGuide = {
  purpose:
    "This slide says what Understudy is before any comparison starts, and every later slide points back to it. Kanazawa wants what the product is, who it’s for and what problem it solves.",
  parts: [
    {
      name: "Product name",
      at: { x: 3, y: 15 },
      explanation:
        "In theater, an understudy is the actor who learns the lead’s part in case they need to step in. Our glasses learn the best employee’s part the same way.",
    },
    {
      name: "What it is",
      at: { x: 3, y: 62 },
      explanation:
        "This is the one-sentence definition. Other companies make the glasses (Meta sells them for $249 to $449). We build the software. It watches the best employee for about a week of normal shifts, turns that into a playbook for the store, then talks each new hire through their tasks by voice.",
    },
    {
      name: "Who it’s for",
      at: { x: 3, y: 80 },
      explanation:
        "Our customers are independent grocers, franchisees and local restaurants. The 46% comes from the Bureau of Labor Statistics: in 2025, the number of people who left US retail jobs equaled about 46% of all retail jobs. Because one job that turns over twice counts twice, don’t say “46% of workers quit.”",
    },
    {
      name: "Glasses render",
      at: { x: 66, y: 24 },
      explanation:
        "This is a 3D render of generic glasses, not a photo of a real product. Kanazawa’s tip asks for one or two sentences plus a visual, and the render is the visual.",
    },
    {
      name: "Coaching exchange",
      at: { x: 95.5, y: 73 },
      explanation:
        "This made-up exchange shows what coaching sounds like. A new hire asks a question out loud. The glasses answer with where things are in this particular store. The same oat milk exchange comes back on the visual value proposition.",
    },
  ],
  rubric: [
    { requirement: "Says what the product is", howWeMeetIt: "AI glasses that learn from the best employee and coach new hires by voice." },
    { requirement: "Says who it’s for", howWeMeetIt: "Independent grocers, franchisees and local restaurants." },
    { requirement: "Says what problem it solves", howWeMeetIt: "With 46% turnover, these stores are always retraining someone." },
    { requirement: "One or two sentences plus a visual", howWeMeetIt: "Two sentences, the glasses render and the coaching exchange." },
  ],
  vcQuestions: [
    {
      question: "Is this a hardware company?",
      answer: `No. Stores buy off-the-shelf AI glasses (Meta’s cost $249 to $449). We sell the software as a monthly subscription for each store. Our estimated price is $${market.pricePerMonth} a month per location, and we never have to make hardware.`,
    },
    {
      question: "Who pays, and who uses it?",
      answer:
        "The owner pays. The new hire wears the glasses day to day. The best employee wears them for the first week of normal shifts while the AI learns the store.",
    },
    {
      question: "How big is the market?",
      answer: `The Census Bureau counts ${count(serviceableRing.locations)} US stores, restaurants and bars owned by businesses with fewer than 100 employees. At $${market.pricePerMonth} a month each, that’s about ${yearly(serviceableRing.locations)} a year. Our three-year goal is 1% of California’s small locations, which is ${count(obtainableRing.locations)} stores and about ${yearly(obtainableRing.locations)} a year. The location counts are real. The price and the 1% are our estimates.`,
    },
    {
      question: "Why now?",
      answer:
        "AI glasses now cost a few hundred dollars instead of the $3,500 HoloLens 2 headset. Meta also opened its glasses’ camera and audio to outside developers, which lets an app like ours see what the wearer sees. IDC expects 13.6 million display-less smart glasses to ship in 2026. One caveat: as of late September 2026, Meta still hadn’t opened public publishing for these apps.",
    },
  ],
  professorQuestions: [
    {
      question: "What problem does it solve, in one sentence?",
      answer: "Every new hire pulls the store’s best employee off the floor to train them. With turnover this high, that happens all the time.",
    },
    {
      question: "Why these customers and not big chains?",
      answer:
        "Big chains have training departments. They buy enterprise tools like Strivr or build their own, like Walmart did. Independent stores can do neither, and Training Magazine’s industry survey doesn’t even count businesses under 100 employees. That gap is our blue ocean.",
    },
    {
      question: "What does the 46% count?",
      answer:
        "It counts separations, meaning everyone who left a retail job in 2025 for any reason (quitting, layoffs and firings). BLS reports a 3.8% average monthly rate. Multiplied by 12 months, that’s about 46% of all retail jobs.",
    },
  ],
};

const swotGuide: SlideGuide = {
  purpose:
    "A SWOT sorts what helps and hurts us into four boxes. Kanazawa checks that each item fits the lecture’s definitions, and that internal items (our product and team) stay apart from external ones (the market, rivals and laws).",
  parts: [
    {
      name: "Row labels",
      at: { x: 3, y: 47 },
      explanation:
        "The top row is internal: things about our product and team that we control. The bottom row is external: things in the world we don’t control. The labels sit right on the slide because mixing these up is the most common SWOT mistake.",
    },
    {
      name: "Strengths",
      at: { x: 49.4, y: 10.6 },
      explanation:
        "Strengths give us an advantage over rivals. The biggest one is that the AI copies the store’s best worker. A study of 5,179 customer support agents found that an AI assistant raised output 34% for new and low-skilled agents, probably by spreading the best workers’ habits. The other strengths are that owners write no training content, the glasses cost hundreds instead of thousands, and the rivals with glasses sell only to big companies.",
    },
    {
      name: "Weaknesses",
      at: { x: 92.6, y: 10.6 },
      explanation:
        "Weaknesses put us behind rivals. AI still misreads first-person video: on the EgoIllusion benchmark, top models answered only 59% of questions correctly. We also have no product or pilot store, version one checks only a few tasks for mistakes, and 72% of Americans in one survey worry about being secretly recorded by camera wearables.",
    },
    {
      name: "Opportunities",
      at: { x: 49.4, y: 50.6 },
      explanation:
        "Opportunities are outside conditions we can use. Constant turnover keeps owners retraining. Training Magazine’s survey of the training industry leaves out businesses under 100 employees. Meta opened its glasses’ camera and audio to outside apps, and IDC expects 13.6 million display-less glasses to ship in 2026.",
    },
    {
      name: "Threats",
      at: { x: 92.6, y: 50.6 },
      explanation:
        "Threats are outside conditions that could hurt us. Meta can end a developer’s license at any time. Strivr already coaches retail workers by voice through smart glasses, in early access. Walmart built its own assistant, which has more than 900,000 weekly users. California’s No Robo Bosses Act, starting July 2027, bans firing workers based only on software decisions.",
    },
    {
      name: "Footnotes",
      at: { x: 3.5, y: 93 },
      explanation: "Each small number on the slide matches a numbered source in the footer. Every source links to the original report or company page.",
    },
  ],
  rubric: [
    { requirement: "All four quadrants", howWeMeetIt: "Strengths, weaknesses, opportunities and threats, with four items each." },
    { requirement: "The lecture’s definitions", howWeMeetIt: "Advantages, disadvantages, things to exploit and trouble from the environment." },
    { requirement: "Internal and external kept apart", howWeMeetIt: "Row labels mark the top row internal and the bottom row external." },
    { requirement: "Sources as footnotes", howWeMeetIt: "Thirteen numbered, linked sources in the footer." },
  ],
  vcQuestions: [
    {
      question: "What’s your moat if Strivr or Meta comes after small stores?",
      answer:
        "Honestly, we don’t have a permanent one today. Our edge is focus. Strivr’s own team captures footage and trains a model for each customer, which only pays off for big companies. We’re building a self-serve product that a single store can set up alone. Our bet is that a store’s playbook keeps improving the longer it uses Understudy. If that’s true, leaving means starting over.",
    },
    {
      question: "Meta can cut you off. Why build on its glasses?",
      answer:
        "Meta’s glasses are cheap and already on sale, which lets us start without making hardware. Mentra’s open-source SDK is our fallback if Meta changes its terms.",
    },
    {
      question: "The AI only gets 59% right. Why would an owner trust it?",
      answer:
        "The 59% comes from EgoIllusion, a benchmark built to trip models up with hard questions about first-person video. Routine store tasks should go better, but we haven’t tested that. Version one sticks to a procedure library, voice guidance and answering questions. It checks for mistakes on only a few well-defined tasks.",
    },
    {
      question: "Will employees agree to wear a camera?",
      answer:
        "That’s a real risk, which is why it’s listed as a weakness. In one survey, 72% of Americans worried about secret recording by camera wearables. California also requires everyone’s consent to record a private conversation. We still need to design a consent process for the capture week and for new hires.",
    },
    {
      question: "Walmart built its own. Doesn’t that hurt you?",
      answer:
        "It shows big retailers want this, since Walmart’s assistant has more than 900,000 weekly users. A chain that size can build its own tools. An independent store can’t, and that’s who we sell to.",
    },
  ],
  professorQuestions: [
    {
      question: "Why is depending on Meta a threat and not a weakness?",
      answer:
        "Choosing to build on someone else’s hardware is our decision, which would be internal. What Meta does with its developer terms is outside our control, and that’s the risk on the slide. Our answer to it is Mentra’s open-source platform.",
    },
    {
      question: "Is having no product really a weakness?",
      answer:
        "Yes. The lecture defines a weakness as a disadvantage relative to others. Every rival on the slide has a live product and paying customers, and we have a concept.",
    },
    {
      question: "Where’s your primary research?",
      answer:
        "Every footnote on this slide is secondary research: government data, studies, analyst forecasts and company pages. Kanazawa’s process also calls for primary research, like interviews or surveys. If the team has talked to store owners, say so here. If not, say that interviewing owners is our next step.",
    },
    {
      question: "Did you try Porter’s Five Forces?",
      answer:
        "It isn’t on the slides because it’s optional. If he asks, here’s a quick reading. Supplier power is high because Meta controls the glasses. Substitutes are strong because shadowing costs nothing up front. New entrants are a real threat because the glasses platform is open to any developer. Buyers are small and price-sensitive. Rivalry is low for on-the-job coaching in small stores and high for phone training apps.",
    },
  ],
};

const competitorMapGuide: SlideGuide = {
  purpose:
    "A competitive landscape tells a story with two axes. We chose the two axes that show where we’re different. The empty top-right corner is our opportunity, and that’s where Understudy sits.",
  parts: [
    {
      name: "Left to right",
      at: { x: 3.5, y: 50.2 },
      explanation:
        "The horizontal axis runs from training that happens away from the job (a phone course or a VR session) to coaching during the real task.",
    },
    {
      name: "Bottom to top",
      at: { x: 48, y: 19.5 },
      explanation:
        "The vertical axis runs from tools sold to large enterprises at the bottom to tools sold to small businesses at the top. We placed each company by who its own website says it sells to.",
    },
    {
      name: "Understudy",
      at: { x: 71, y: 25 },
      explanation:
        "Understudy sits alone in the top right, which stands for on-the-job coaching for small businesses. The hatching and the “Open today” label mark that quadrant as empty.",
    },
    {
      name: "Apps for small teams",
      at: { x: 3.5, y: 19.5 },
      explanation:
        "Trainual and Connecteam sell to small teams, but they train people on a phone, away from the task. This is what a small store can buy today.",
    },
    {
      name: "Apps for big chains",
      at: { x: 3.5, y: 75.6 },
      explanation:
        "Axonify and YOOBIC train big chains’ frontline workers away from the task. Opus sits higher because it sells per location to multi-unit restaurant and retail brands.",
    },
    {
      name: "AI coaching for big companies",
      at: { x: 96.3, y: 75.6 },
      explanation:
        "On-the-job AI coaching already exists here. Strivr coaches retail workers through smart glasses. Augmentir, Retrocausal and VITURE Helix guide workers in factories and labs. All of them sell to large companies.",
    },
    {
      name: "Strivr’s move",
      at: { x: 13.2, y: 57 },
      explanation:
        "The curved line shows Strivr moving from VR training to smart glasses. It answers the obvious question of why the best-known training company isn’t in our corner: Strivr moved toward on-the-job coaching but stayed with big customers.",
    },
    {
      name: "Footnotes",
      at: { x: 3.5, y: 94.5 },
      explanation: "Every logo links to the company’s website. Each footnote links to the page we used to place that company.",
    },
  ],
  rubric: [
    { requirement: "Tells a story of opportunity", howWeMeetIt: "The headline says only big companies get on-the-job AI coaching, and the open corner shows the gap." },
    { requirement: "Our own axes, not generic ones", howWeMeetIt: "On the job versus off it, and small businesses versus large ones. Both are where we differ." },
    { requirement: "Our company in the top right", howWeMeetIt: "Understudy is the only mark in that quadrant." },
    { requirement: "Visual hierarchy", howWeMeetIt: "Understudy is the one blue mark. Rivals are small grey logos." },
    { requirement: "Logos, links and footnotes", howWeMeetIt: "Nine linked competitor logos and nine numbered sources." },
  ],
  vcQuestions: [
    {
      question: "If that corner is empty, maybe there’s no demand?",
      answer:
        "Small stores already train on the job. They do it by shadowing, which uses a person instead of a product. Two barriers kept products out of that corner. Enterprise tools needed custom setup for each customer, and the hardware cost thousands of dollars. Glasses at $249 to $449 remove the second barrier, and AI that builds a playbook from a week of footage removes the first. We still need a pilot store to prove owners will pay.",
    },
    {
      question: "Why won’t Strivr just move into small stores?",
      answer:
        "It might. Today Strivr says its platform is “built for enterprise operations,” and its setup work only pays off for big customers. A self-serve product for one store is a different business. Our plan is to get there first and grow from small businesses up.",
    },
    {
      question: "How did you decide where each company goes?",
      answer:
        "We read each company’s own website in October 2026. Left to right reflects how close the product gets to the real task. Bottom to top reflects who the company says it sells to. The positions are our judgment, not measured data.",
    },
    {
      question: "Why isn’t Meta on the map?",
      answer:
        "Meta makes the glasses we build on. Its assistant answers general questions, but it doesn’t know a store’s procedures or track new hires. We list Meta’s control of the platform as a threat on the SWOT.",
    },
  ],
  professorQuestions: [
    {
      question: "Why these axes?",
      answer:
        "The rubric asks for axes that show our difference, not generic ones like price versus quality. Coaching on the job and serving small businesses are the two things that set us apart. The same two ideas come back in the value proposition’s “Unlike” line.",
    },
    {
      question: "Does this match your Blue Ocean story?",
      answer:
        "Yes. In the pitch deck, our noncustomers are businesses under 100 employees, the ones the training industry doesn’t measure. The open corner is that same group getting on-the-job coaching for the first time.",
    },
    {
      question: "Can an investor get the story at a glance?",
      answer:
        "The headline states the point. Understudy is the only blue mark, sitting in the only hatched quadrant. Rival logos stay small and grey.",
    },
  ],
};

const comparisonGuide: SlideGuide = {
  purpose:
    "A comparison chart lines us up against each alternative, feature by feature. Kanazawa wants circles instead of paragraphs, a column for us that stands out and at least one row where everyone else fails and we succeed.",
  parts: [
    {
      name: "Legend",
      at: { x: 5.2, y: 22.6 },
      explanation: "A full circle means yes, a half circle means partly and an empty circle means no.",
    },
    {
      name: "Understudy column",
      at: { x: 35.25, y: 88.5 },
      explanation: "Our column is dark blue, so it reads first. It describes the product we plan to build, not one that exists yet.",
    },
    {
      name: "The gap row",
      at: { x: 5.2, y: 33.5 },
      explanation:
        "Only Understudy fills the highlighted top row: hands-free coaching for small stores with no coworker standing by. It combines two rows below it. Strivr and the factory tools are hands-free but don’t sell to small stores. Shadowing works in small stores but needs a coworker beside the new hire.",
    },
    {
      name: "Feature rows",
      at: { x: 5.2, y: 45 },
      explanation:
        "Each row is something a small-store owner would want, from learning the best employee’s methods to setting it up without a sales call.",
    },
    {
      name: "Shadowing column",
      at: { x: 42.7, y: 88.5 },
      explanation:
        "Shadowing a coworker is how most small stores train today. Because it isn’t a product, its scores are our team’s judgment rather than a company’s website. It does well on most rows. Its cost is the best employee’s time, which is what the top row captures.",
    },
    {
      name: "Competitor columns",
      at: { x: 70, y: 88.5 },
      explanation:
        "The other eight columns are Strivr, YOOBIC, Opus, Trainual, Connecteam, Augmentir, Retrocausal and VITURE Helix. Each logo links to the company’s site, and each score comes from what that site says.",
    },
    {
      name: "Our half circle",
      at: { x: 38, y: 66.5 },
      explanation:
        "We gave ourselves only a half circle on catching mistakes, because version one checks just a few well-defined tasks. Admitting one gap makes the rest of our column easier to believe.",
    },
    {
      name: "Footnotes",
      at: { x: 3.5, y: 96.2 },
      explanation: "Each number above a logo matches a source in the footer, which links to the page we scored from.",
    },
  ],
  rubric: [
    { requirement: "Rows that show our difference", howWeMeetIt: "Eight rows we chose, all about training in a small store." },
    { requirement: "Our column stands out", howWeMeetIt: "A dark blue column right after the feature names." },
    { requirement: "Circles, not paragraphs", howWeMeetIt: "Full, half and empty circles for yes, partly and no." },
    { requirement: "A row where every rival fails", howWeMeetIt: "The top row, where only Understudy has a full circle." },
    { requirement: "Logos, links and footnotes", howWeMeetIt: "Every logo links to its site, with eight numbered sources." },
  ],
  vcQuestions: [
    {
      question: "Your column is a plan. Isn’t that unfair to companies with real products?",
      answer:
        "It is a plan, and the chart’s fact page says so. That’s also why we gave ourselves a half circle on catching mistakes. A pilot store would let us replace the plan with evidence.",
    },
    {
      question: "Strivr beats you on catching mistakes. Why pick you?",
      answer:
        "A small store can’t buy Strivr. It scores “no” on self-serve for one small store, and its platform is built for enterprise operations. For a small owner, the real choice is between us, a phone app and shadowing.",
    },
    {
      question: "How do you compare on price?",
      answer: `Connecteam is free for up to 10 users, and Opus is priced per location. We estimate $${market.pricePerMonth} a month per store, plus glasses at $249 to $449. That’s more than a phone app. What the extra money buys is the best employee’s time back.`,
    },
    {
      question: "Which row matters most to buyers?",
      answer:
        "We think it’s the top row, because it names the cost owners feel when their best employee stops working to train. We haven’t tested that with owners yet. It’s the first thing a pilot or owner interviews should check.",
    },
  ],
  professorQuestions: [
    {
      question: "Is there a row where every competitor fails?",
      answer: "Yes, the top row. Only Understudy has a full circle there.",
    },
    {
      question: "Why is Axonify on the map but not the chart?",
      answer:
        "Its column would look almost exactly like YOOBIC’s. The two differ only on catching mistakes. We left it off to keep the chart readable, and it still appears on the landscape.",
    },
    {
      question: "Why count shadowing as a competitor?",
      answer:
        "Shadowing is what small stores do instead of buying anything. Moore’s template asks for the primary competitive alternative, and for our customers that’s shadowing.",
    },
  ],
};

const valuePropositionGuide: SlideGuide = {
  purpose:
    "Geoffrey Moore’s template from Crossing the Chasm fits positioning into two sentences: “For [customer] who [need], [product] is a [category] that [benefit]. Unlike [alternative], our product [difference].” Kanazawa defines a value proposition as “a single, clear, compelling message that states why you are different and worth it.”",
  parts: [
    {
      name: "Template words",
      at: { x: 3, y: 26.3 },
      explanation: "The grey words on the left are Moore’s template. Reading down the left column gives you the bare template, and reading across fills it in.",
    },
    {
      name: "Customer and need",
      at: { x: 96.5, y: 30 },
      explanation:
        "These two rows name the customer and their need. The owner is the customer because the owner pays. The need is getting the best employee’s time back, not training for its own sake.",
    },
    {
      name: "Category",
      at: { x: 96.5, y: 41 },
      explanation:
        "The category is the shelf a customer mentally puts us on. We say “AI coaching glasses” because glasses are what the owner sees, even though our product is the software.",
    },
    {
      name: "Benefit",
      at: { x: 96.5, y: 51.8 },
      explanation:
        "This is the reason to buy. It’s large and blue because it matters most. It names a benefit rather than a feature: new hires get trained while the best employee keeps working.",
    },
    {
      name: "Alternative",
      at: { x: 96.5, y: 62.8 },
      explanation: "Shadowing a coworker and phone training apps are the alternatives a small owner actually uses. Both are columns on the comparison chart.",
    },
    {
      name: "Difference",
      at: { x: 96.5, y: 76 },
      explanation:
        "This line says what sets us apart, using the landscape’s two axes. “Learns each store from its own best employee” is the small-business side. “Coaches new hires hands-free on the floor” is the on-the-job side.",
    },
  ],
  rubric: [
    { requirement: "Follows Moore’s template", howWeMeetIt: "Every slot is filled, with the template words shown beside them." },
    { requirement: "Kanazawa’s definition", howWeMeetIt: "The benefit line says why we’re worth it. The “Unlike” line says why we’re different." },
    { requirement: "Benefits before features", howWeMeetIt: "The benefit comes first. Hands-free shows up only in the last line." },
    { requirement: "One story across the slides", howWeMeetIt: "The alternative comes from the comparison chart and the difference from the landscape axes." },
  ],
  vcQuestions: [
    {
      question: "Say it in one sentence.",
      answer: "Understudy trains every new hire on the job while your best employee keeps working.",
    },
    {
      question: "Why not name Strivr as the alternative?",
      answer: "Small stores don’t buy Strivr. Their real options are shadowing and phone apps like Trainual and Connecteam, and those are what we name.",
    },
    {
      question: "Is “hands-free” a benefit?",
      answer: "No, it’s a feature. The benefit is that the best employee keeps working. That’s why the benefit line comes first and hands-free appears only as the difference.",
    },
    {
      question: "How would you prove the best employee keeps working?",
      answer:
        "We can’t yet. In a pilot, we’d measure the hours the best employee spends training a new hire, first with shadowing and then with Understudy. That number would be the center of our sales pitch.",
    },
  ],
  professorQuestions: [
    {
      question: "Does it lead with benefits?",
      answer:
        "Yes. The first large line is the benefit: new hires get trained on the job while the best employee keeps working. Features appear only in the last line, as the reason we can deliver it.",
    },
    {
      question: "How does this tie to the rest of your slides?",
      answer:
        "The “Unlike” line names shadowing, which is a column on our comparison chart. The difference line matches the landscape’s two axes: coaching on the job and serving small businesses.",
    },
    {
      question: "Why “AI coaching glasses” and not “AI training software”?",
      answer: "The category is how the customer files us in their head. An owner sees glasses on a new hire, not software. Saying glasses also separates us from the phone apps.",
    },
  ],
};

const visualValuePropositionGuide: SlideGuide = {
  purpose:
    "A visual value proposition shows the same message as a picture that works in 1/20 of a second. At a glance it should answer what the product does, who it’s for, how it helps and why it’s different. Kanazawa asks for Librande’s one-page design template.",
  parts: [
    {
      name: "Tagline",
      at: { x: 3, y: 11 },
      explanation: "The tagline states the whole idea in one line: the new hire hears the best employee’s know-how without the best employee being there.",
    },
    {
      name: "Training today",
      at: { x: 4, y: 45 },
      explanation:
        "The left panel shows the problem. The best employee leaves the register to train the new hire while customers wait. The red callouts mark those two costs.",
    },
    {
      name: "With Understudy",
      at: { x: 39.9, y: 68.6 },
      explanation:
        "The right panel is the same store with Understudy. The best employee stays on the register. The new hire wears the glasses and gets answers by voice.",
    },
    {
      name: "Coaching bubble",
      at: { x: 73.7, y: 21.3 },
      explanation: "This is the oat milk exchange from the product definition. It shows how the coaching works without a sentence of explanation.",
    },
    {
      name: "Description",
      at: { x: 3.5, y: 81 },
      explanation:
        "Librande’s template puts a short description under the central illustration. Ours says how it works: the best employee wears the glasses for a week, then every new hire gets coached.",
    },
    {
      name: "Audience",
      at: { x: 96.5, y: 21.7 },
      explanation: "The top of the sidebar answers who it’s for: small stores and restaurants.",
    },
    {
      name: "Maya’s checklist",
      at: { x: 96.5, y: 40 },
      explanation:
        "Librande uses sidebars for checklists. This one shows what the owner would see: which tasks a new hire named Maya can already do alone in her first week. Maya is an illustration, not a real person.",
    },
    {
      name: "Hardware note",
      at: { x: 96.5, y: 81.8 },
      explanation: "This note says the glasses are off the shelf and cost $249 to $449. It answers “do I need special hardware?” before anyone asks.",
    },
  ],
  rubric: [
    { requirement: "What it does", howWeMeetIt: "In the right panel, the glasses answer a new hire’s question by voice." },
    { requirement: "Who it’s for", howWeMeetIt: "A small store in both panels, plus the sidebar." },
    { requirement: "How it helps", howWeMeetIt: "The best employee goes from training back to the register." },
    { requirement: "Why it’s different", howWeMeetIt: "Hands-free coaching that knows this store, shown in the bubble." },
    { requirement: "Librande’s one-page template", howWeMeetIt: "A central illustration with a description under it, callouts, a note and a sidebar checklist." },
    { requirement: "Your own creativity", howWeMeetIt: "A drawn before-and-after of one store instead of stock photos." },
  ],
  vcQuestions: [
    {
      question: "What does the owner actually get?",
      answer: "A playbook of their store’s procedures, voice coaching for every new hire and a view of which tasks each hire can do alone, like Maya’s checklist.",
    },
    {
      question: "How fast does a new hire get useful?",
      answer:
        "We don’t have data on that yet, and Maya’s checklist is an illustration. A pilot would measure how many days a new hire takes to do each task alone, with and without Understudy.",
    },
    {
      question: "What happens during the capture week?",
      answer:
        "The best employee wears the glasses through about a week of normal shifts and doesn’t do anything extra. The AI turns the footage and audio into the store’s playbook. We still need a consent plan for recording coworkers and customers.",
    },
  ],
  professorQuestions: [
    {
      question: "Does it work in 1/20 of a second?",
      answer:
        "The two panels carry it. Both show the same store, with red callouts on the left and blue on the right. Before reading a word, you see a store that runs worse and one that runs better.",
    },
    {
      question: "Where’s the creativity?",
      answer: "We drew the store as a custom illustration instead of using stock photos. The before-and-after layout lets one picture tell the whole story.",
    },
    {
      question: "Which Librande elements did you use?",
      answer:
        "We used a central illustration (the two panels), a description under it, callouts for detail, a note about the hardware and a sidebar checklist. Whitespace keeps them apart, and the tagline and panels are the biggest things on the page.",
    },
  ],
};

const guidesBySlide: Record<string, SlideGuide> = {
  definition: definitionGuide,
  swot: swotGuide,
  "competitor-map": competitorMapGuide,
  comparison: comparisonGuide,
  "value-proposition": valuePropositionGuide,
  "visual-value-proposition": visualValuePropositionGuide,
};

export function guideFor(slideId: string): SlideGuide | undefined {
  return guidesBySlide[slideId];
}

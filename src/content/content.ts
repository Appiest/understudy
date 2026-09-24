import type { SourceId } from "./sources";
import { team } from "./config";

export const title = {
  tagline: "Your best employee, in every new hire’s ear.",
  subtitle: "A Blue Ocean approach to frontline training in high-turnover businesses",
  rulesHeading: "Avoiding Solution Jumping",
  rules: [
    { rule: "Fall in love with the problem, not the technology.", detail: "We started from turnover, not from “let’s use AR glasses.”" },
    { rule: "Talk to noncustomers first.", detail: "Owners with no training department and no budget for VR." },
    { rule: "Write the problem as the buyer’s struggle.", detail: "A missing feature is not a problem statement." },
    { rule: "Check alternatives outside our industry.", detail: "Factories and field service solved parts of this already." },
    { rule: "Every claim needs evidence before it goes on a slide.", detail: "Estimates are labeled as estimates." },
  ],
  notes: [
    "Our first instinct was a solution: smart glasses. That is exactly the solution jumping the course warns about, so we stopped and rebuilt the idea around the problem.",
    "The problem is constant retraining in businesses where people leave all the time. We validated that with labor data and cost estimates before committing to any product.",
    "These five rules kept us honest. Each later slide shows the evidence we gathered before we put the glasses back on the table.",
  ],
};

export const turnover = {
  headline: "Every new hire costs owners time they don’t have.",
  sectors: [
    { name: "Retail", caption: "of retail jobs turned over in 2025", monthlySeparationRate: 3.8 },
    { name: "Restaurants and hotels", caption: "of restaurant and hotel jobs turned over in 2025", monthlySeparationRate: 5.5 },
  ],
  seatsPerRow: 20,
  legend: { stayed: "Same person all year", replaced: "Someone left, so a new hire needs training" },
  source: "blsJolts" as SourceId,
  replacement: {
    costPerHire: 4200,
    costPerStore: 67200,
    caption: "to replace one part-time grocery employee",
    storeCaption: "per store, per year",
    label: "2017 estimate for independent grocers",
    source: "groceryDive" as SourceId,
  },
  quote: {
    text: "Previously, we had to send three to four people to the store to train associates.",
    speaker: "Andy Trainor",
    role: "Walmart VP of US Learning",
    source: "strivrWalmart" as SourceId,
  },
  reframe: {
    heading: "We changed the question",
    industryLabel: "The training industry asks",
    ourLabel: "We ask",
    industryQuestion: "How do we build better training content?",
    ourQuestion: "How can a new hire learn from the expert without the expert being there?",
  },
  noncustomers: {
    heading: "Our buyers are today’s noncustomers",
    center: "Today’s training market",
    tiers: [
      { tier: "Tier 1", name: "Soon-to-be", who: "Chains that ran VR or app pilots and dropped them" },
      { tier: "Tier 2", name: "Refusing", who: "Independent grocers, franchisees and local restaurants with no training team or budget" },
      { tier: "Tier 3", name: "Unexplored", who: "Small service businesses where training means “shadow someone”" },
    ],
  },
  notes: [
    "In 2025, retail separations averaged 3.8 percent of the workforce every month, and restaurants and hotels averaged 5.5 percent. Over a year, that adds up to separations equal to about 46 percent of retail jobs and 66 percent of restaurant and hotel jobs. These are Bureau of Labor Statistics numbers.",
    "Every one of those departures means training someone new. A 2017 estimate for independent grocers put the cost of replacing one part-time worker at about 4,200 dollars. With 16 part-timers leaving a typical store each year, that adds up to about 67 thousand dollars per store. The figure is dated, so we label it that way.",
    "Walmart has a whole learning department and still had to send three or four people to a store to train associates. A corner grocer has nobody to send.",
    "Like Casella did with [yellow tail], we reframed the question. The industry asks how to make better training content. We ask how a new hire can learn from the store’s expert without the expert being there.",
    "Our customers are the noncustomers today’s training industry ignores, the way Casella went after beer and cocktail drinkers instead of wine connoisseurs.",
  ],
};

export const drivers = {
  ai: {
    heading: "Driver 1: AI can now turn a recorded shift into step-by-step instructions",
    recordedLabel: "What the glasses record",
    writtenLabel: "What the AI writes",
    proof: "Meta’s Live AI already does part of this on Ray-Ban glasses: it sees what the wearer sees and talks about it as it happens.",
    frames: ["Unloads the dairy delivery", "Checks dates, oldest to the front", "Faces the oat milk left of almond"],
    steps: ["Receive dairy delivery", "Rotate stock by date", "Shelve to the planogram"],
  },
  glasses: {
    heading: "Driver 2: AI glasses now outsell headsets",
    share: {
      periods: ["Q2 2025", "Q2 2026"],
      glasses: [72.9, 84.6],
      headsets: [27.1, 15.4],
      caption: "Share of all XR shipments. Glasses include audio and camera glasses without a display.",
      source: "idcShipments" as SourceId,
    },
    soldIn2025: { value: 7, unit: "million", caption: "Ray-Ban Meta and Oakley Meta AI glasses sold in 2025", source: "essilorResults" as SourceId },
  },
  retreat: {
    heading: "Why now: big players are leaving enterprise headsets",
    today: "Today",
    events: [
      { when: "Feb 20, 2026", what: "Meta stopped selling Quest for Business and Horizon managed services", source: "metaForWork" as SourceId },
      { when: "Q2 2026", what: "Reality Labs lost $4.6B as Meta pivots to AI glasses", source: "techSpot" as SourceId },
      { when: "Fall 2026", what: "Google and Samsung launch Android XR audio glasses with Warby Parker and Gentle Monster", source: "googleXr" as SourceId },
      { when: "Dec 31, 2027", what: "HoloLens 2 security updates end after Microsoft discontinued it", source: "roadToVr" as SourceId },
    ],
  },
  notes: [
    "Two things changed at the same time. First, multimodal AI can now watch first-person video, listen to what someone says, and turn it into procedures. A week of recorded shifts becomes a playbook without anyone writing it.",
    "Second, glasses won. In one year, glasses went from 72.9 to 84.6 percent of XR shipments while headsets fell from 27 to about 15 percent. Most of those glasses have a camera and speakers but no display, which is exactly what voice coaching needs. EssilorLuxottica reported more than 7 million Ray-Ban Meta and Oakley Meta glasses sold in 2025.",
    "Meanwhile the enterprise headset players are retreating. HoloLens 2 is discontinued, Quest for Business is gone, and Reality Labs lost 4.6 billion dollars last quarter while pivoting to AI glasses. That leaves a gap for affordable, glasses-based training.",
  ],
};

export const solution = {
  headline: "Clone your best worker.",
  stages: [
    {
      name: "Capture",
      summary: "Your best employee wears the glasses for about a week of normal shifts. There is nothing extra to do.",
    },
    {
      name: "Learn",
      summary: "AI turns the footage and audio into a playbook for your store: procedures, layout, register steps, house rules and judgment calls.",
    },
    {
      name: "Coach",
      summary: "New hires wear the glasses. The AI guides them by voice, answers “where does this go?” and flags mistakes on key tasks.",
    },
  ],
  captureDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  playbook: ["Open the register", "Receive a delivery", "Stock to the planogram", "Log fridge temperatures", "Handle a return", "Close out the drawer"],
  coaching: {
    question: "Where does the oat milk go?",
    answer: "Second shelf in the dairy case, left of the almond milk. Oldest dates to the front.",
    flag: "Fridge temperature not logged yet",
  },
  readiness: [
    { person: "Maya", ready: 5 },
    { person: "Jordan", ready: 3 },
    { person: "Luis", ready: 1 },
  ],
  scope: {
    heading: "Realistic v1",
    items: [
      { key: "Ships first", value: "Procedure library, voice guidance and Q&A" },
      { key: "Mistake checks", value: "A few well-defined tasks at first, the approach Retrocausal uses in factories" },
      { key: "Hardware", value: "Off-the-shelf AI glasses ($249 to $449 from Meta), or open platforms like Mentra’s SDK" },
      { key: "Business model", value: "Per-store monthly subscription plus glasses, developed in later weeks" },
    ],
  },
  risks: ["Customer privacy and recording consent", "Battery life (VITURE Helix quotes 60+ minutes, charging while in use)", "Bigger players moving into retail"],
  notes: [
    "Here is how it works. In capture, the owner or the store’s best employee wears the glasses through about a week of normal shifts. They do not have to do anything extra.",
    "In learn, AI turns that footage and audio into a playbook for this specific store: where things go, how the register works, the house rules, and the judgment calls.",
    "In coach, the new hire wears the glasses. The AI talks them through tasks, answers questions like where does this go, and flags mistakes on a few key tasks such as stocking to the planogram, food safety steps, and closing the register. The owner sees who is ready for what.",
    "We are honest about scope. Version one is the procedure library, voice guidance and Q&A. Mistake detection starts with a few well-defined tasks. We use off-the-shelf glasses, not custom hardware. The risks we will have to solve are privacy and consent, battery life, and bigger players entering retail.",
  ],
};

export type CanvasPlayer = {
  name: string;
  detail?: string;
  isUs?: boolean;
  scores: number[];
};

export const canvas = {
  headline: "Our value curve diverges from every alternative",
  estimateLabel: "Scores are team estimates for illustration",
  factors: [
    "Cost per store",
    "Senior staff time",
    "Custom content",
    "Hardware cost",
    "Time off the job",
    "Store knowledge",
    "Learning on shift",
    "Live correction",
    "Owner visibility",
    "Knowledge capture",
  ],
  factorDetails: [
    "Cost per store",
    "Senior staff time pulled off the floor",
    "Custom content production needed",
    "Hardware cost and complexity",
    "Time spent training away from the job",
    "Store-specific knowledge",
    "Learning during real shifts",
    "Live hands-free correction",
    "Owner visibility into readiness",
    "Expert knowledge capture",
  ],
  lowerCostFactors: 5,
  groups: ["Eliminate and reduce: lowers our cost", "Raise and create: lifts buyer value"],
  axis: { high: "High", low: "Low", name: "Offering level" },
  errcHeading: "The four actions behind our curve",
  players: [
    { name: "Shadowing a coworker", scores: [5, 9, 1, 0, 2, 8, 8, 5, 2, 3] },
    { name: "Paper binder", scores: [2, 3, 5, 0, 6, 5, 2, 0, 1, 4] },
    { name: "Phone microlearning", detail: "YOOBIC, Axonify", scores: [4, 2, 6, 2, 7, 3, 2, 0, 7, 2] },
    { name: "VR training", detail: "Strivr", scores: [9, 3, 10, 9, 10, 2, 0, 3, 7, 2] },
    { name: "Industrial AI glasses", detail: "VITURE Helix, Augmentir", scores: [8, 3, 6, 7, 2, 6, 8, 7, 8, 7] },
    { name: team.productName, isUs: true, scores: [3, 1, 1, 3, 1, 10, 10, 8, 9, 10] },
  ] satisfies CanvasPlayer[],
  errc: [
    { action: "Eliminate", effect: "lowers cost", items: ["Pulling a senior employee off the floor to train", "Custom content production like VR scenarios and videos", "Separate training sessions"] },
    { action: "Reduce", effect: "lowers cost", items: ["Hardware cost: $249 to $449 glasses, not a $3,500 headset", "Time until a new hire is productive", "Owner setup effort"] },
    { action: "Raise", effect: "lifts value", items: ["Learning during real shifts", "Store-specific knowledge: your layout, your register, your rules", "Owner visibility into who is ready"] },
    { action: "Create", effect: "lifts value", items: ["Knowledge capture that clones your best worker", "Live, hands-free correction in the moment", "Training that improves with every recorded shift"] },
  ],
  characteristics: [
    { name: "Focus", text: "We don’t compete on immersion or content volume." },
    { name: "Divergence", text: "Our curve is the mirror image of VR training." },
    { name: "Tagline", text: "“Your best employee, in every new hire’s ear.”" },
  ],
  notes: [
    "This is our strategy canvas. Across the bottom are the ten factors frontline training competes on. Following the Kim and Mauborgne article, the factors we eliminate or reduce sit on the left and the factors we raise or create sit on the right.",
    "Look at the alternatives first. Shadowing, binders, phone apps, VR and industrial glasses all trade the same things against each other. VR is the extreme: expensive, content-heavy, and completely off the job.",
    "Our curve is the mirror image. We are low on cost, staff time, content and time off the job, and high on store-specific knowledge, learning on shift, live correction, owner visibility and knowledge capture. The scores are our team’s estimates and we will adjust them after owner interviews.",
    "The ERRC grid spells out the four actions. Eliminate and reduce lower our cost. Raise and create lift what the buyer gets. That is value innovation: more value and lower cost at the same time.",
    "It passes the three-characteristics test. We have focus, a divergent curve, and a tagline people remember: your best employee, in every new hire’s ear.",
  ],
};

export type LandscapePlayer = {
  name: string;
  offToOn: number;
  industrialToRetail: number;
  description: string;
  kind: "rival" | "us" | "platform";
  source?: SourceId;
};

export const landscape = {
  headline: "Live coaching exists for factories. Retail still trains off the floor.",
  axes: {
    x: ["Off-the-job training", "On-the-job guidance"],
    y: ["Industrial and enterprise", "Retail and small business"],
  },
  players: [
    { name: "Strivr", offToOn: 0.16, industrialToRetail: 0.7, kind: "rival", source: "strivrWalmart", description: "VR training. Walmart put 17,000 headsets in its US stores and cut Pickup Tower training from 8 hours to 15 minutes." },
    { name: "YOOBIC", offToOn: 0.3, industrialToRetail: 0.88, kind: "rival", source: "yoobic", description: "Phone microlearning and task apps for retail teams, used away from the work itself." },
    { name: "Axonify", offToOn: 0.12, industrialToRetail: 0.9, kind: "rival", source: "yoobic", description: "Short daily phone lessons and quizzes for frontline retail staff." },
    { name: "VITURE Helix", offToOn: 0.84, industrialToRetail: 0.24, kind: "rival", source: "viture", description: "AI safety glasses for industrial, lab and clinical work. Announced June 2026, ships Q1 2027, from $599." },
    { name: "Retrocausal", offToOn: 0.92, industrialToRetail: 0.07, kind: "rival", source: "retrocausal", description: "Standard cameras on factory lines that set up live guidance from a single recorded example." },
    { name: "Airwave", offToOn: 0.7, industrialToRetail: 0.38, kind: "rival", source: "airwave", description: "Captures field technicians’ fixes and judgment calls, then answers their questions on the job." },
    { name: "Augmentir", offToOn: 0.56, industrialToRetail: 0.2, kind: "rival", source: "augmentir", description: "AI turns documents and video into work instructions for industrial crews." },
    { name: "Mentra", offToOn: 0.94, industrialToRetail: 0.58, kind: "platform", source: "mentra", description: "An open-source AI glasses SDK. It is a platform we can build on, not a competitor." },
    { name: team.productName, offToOn: 0.8, industrialToRetail: 0.84, kind: "us", description: "Retail and small business, on the job. This corner is empty today." },
  ] satisfies LandscapePlayer[],
  notes: [
    "Here is the landscape. Left to right goes from training away from the job to guidance during the job. Bottom to top goes from industrial to retail and small business.",
    "Live, on-the-job coaching already exists, but it is built for factories and field service: VITURE Helix, Retrocausal, Airwave and Augmentir. Retail tools like Strivr, YOOBIC and Axonify all train people away from the floor.",
    "The top right corner, retail and small business with on-the-job guidance, is empty. That is where we sit. Mentra is not a competitor. It is an open glasses platform we could build on.",
  ],
};

export type MindMapBranch = { name: string; leaves: string[] };

export const mindMap = {
  headline: "Mind map of the problem space",
  center: "Constant retraining in high-turnover businesses",
  branches: [
    { name: "Causes of turnover", leaves: ["Low pay", "Scheduling", "Poor onboarding", "Burnout"] },
    { name: "Cost of training", leaves: ["Senior staff time", "Lost productivity", "Mistakes and waste", "Customer experience"] },
    { name: "New hires struggle with", leaves: ["Store layout", "Register", "Policies", "Judgment calls", "Fear of asking"] },
    { name: "Tacit knowledge", leaves: ["What the owner knows", "What the best employees know", "Nothing written down"] },
    { name: "Noncustomers", leaves: ["Independent grocers", "Franchisees", "Local restaurants"] },
    { name: "Alternatives", leaves: ["Shadowing", "Binders", "Phone apps", "VR", "Industrial AI glasses"] },
    { name: "Enabling tech", leaves: ["Multimodal AI", "AI glasses", "Open SDKs"] },
    { name: "Risks", leaves: ["Privacy and consent", "Battery life", "Adoption by older owners", "Big players entering"] },
  ] satisfies MindMapBranch[],
  figmaButton: "Open our Figma board",
  next: "Next: interview 5 owners, test capture on one real shift, then refine the canvas.",
  notes: [
    "This is the mind map of the problem space we built in Figma. At the center is constant retraining in high-turnover businesses.",
    "Around it are the causes of turnover, the cost of training, what new hires struggle with, the tacit knowledge that never gets written down, our noncustomers, the alternatives, the enabling technology, and the risks.",
    "Next we will interview five owners, test capture on one real shift, and refine the strategy canvas with what we learn.",
  ],
};

export const appendix = {
  headline: "Sources",
  notes: ["Every statistic in the deck links back to one of these sources."],
};

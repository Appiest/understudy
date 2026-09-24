import type { SourceId } from "./sources";

export type FactStatus = "verified" | "adjusted" | "estimate" | "illustrative" | "unconfirmed";

export type Fact = {
  figure: string;
  claim: string;
  status: FactStatus;
  derivation?: string;
  source?: SourceId;
  quote?: string;
  caveat?: string;
};

export type Question = { question: string; answer: string };

export type SlideFacts = { summary: string; facts: Fact[]; background?: Fact[]; questions: Question[] };

export const factsCheckedOn = "September 24, 2026";

export const canvasMethod = [
  "Each line is one way a store can train a new hire today, plus ours. For every factor along the bottom, each option gets a score from 0 to 10, where a higher score means the option offers more of that factor. The chart plots those scores and connects them from left to right, which is how Kim and Mauborgne draw a strategy canvas.",
  "The scores are our team’s judgment, not survey data. They were set in our project brief from what we know about how each option works. If someone asks, say that plainly first, then walk through the reasoning for the factor they’re asking about.",
  "On the left five factors, a high score means the buyer carries more of that burden: more cost, more staff time, more content to make, more hardware and more time off the floor. That’s why a low score is good there, and why our curve sits low. On the right five factors, a high score means the buyer gets more of that benefit.",
  "We plan to replace the estimates with evidence. In the five owner interviews, we’ll ask each owner to score the options they’ve actually used on the same ten factors, then redraw the canvas from their average scores.",
];

export const canvasRationale = [
  {
    factor: "Cost per store",
    why: "VR training scores highest (9) because a store pays for headsets, custom 3D content and a platform license. Industrial AI glasses score 8 because each pair of specialty hardware costs several hundred dollars before the enterprise software. Shadowing sits in the middle (5) because the cost is hidden in the wages of the coworker doing the training. Phone apps (4) are a per-seat subscription on phones people already own, and a binder (2) costs little beyond someone’s time to write it. We score ourselves 3, not 0, because a store still buys one pair of consumer AI glasses and a monthly subscription.",
  },
  {
    factor: "Senior staff time pulled off the floor",
    why: "Shadowing scores 9 because the whole method is your best employee training someone instead of working. The other options all score 2 or 3 because someone still has to set up the tool, run sessions or answer questions. We score 1 because the expert’s only job is to wear the glasses during a normal week of shifts.",
  },
  {
    factor: "Custom content production needed",
    why: "VR scores 10 because every scenario has to be built as a 3D simulation. Phone microlearning and industrial glasses score 6 because someone writes the lessons or work instructions, and a binder scores 5 for the same reason. Shadowing and Understudy both score 1: shadowing needs no content, and our playbook is generated from recorded shifts rather than written by hand.",
  },
  {
    factor: "Hardware cost and complexity",
    why: "VR scores 9 because headsets need charging, cleaning, storage and floor space. Industrial AI glasses score 7 as specialty safety hardware. Phone apps score 2 because they run on phones staff already carry, and shadowing and binders need no hardware. We score 3 because one pair of consumer glasses still has to be bought and charged.",
  },
  {
    factor: "Time spent training away from the job",
    why: "VR scores 10 because training happens inside a headset, off the floor. Phone lessons (7) and binders (6) are done between or before shifts. Shadowing and industrial glasses score 2 because learning happens during real work. We score 1 because there is no separate training session at all.",
  },
  {
    factor: "Store-specific knowledge",
    why: "We score 10 because the playbook is learned from this store’s own layout, register and rules. Shadowing scores 8 because the coworker knows the store, but what they pass on varies by person. Industrial glasses score 6 because site instructions can be specific but someone has to author them. A binder scores 5 if the owner wrote it, and phone apps (3) and VR (2) mostly teach generic, corporate content.",
  },
  {
    factor: "Learning during real shifts",
    why: "We score 10 and shadowing and industrial glasses score 8 because the new hire learns while doing real work. Binders and phone apps score 2 because they’re read or watched separately, and VR scores 0 because it is a simulation by design.",
  },
  {
    factor: "Live hands-free correction",
    why: "We score 8 rather than 10 because version one only checks a few well-defined tasks. Industrial glasses score 7 because they already guide factory workers live. Shadowing scores 5 because the coworker only corrects mistakes they happen to see. VR scores 3 because feedback happens inside the simulation, not on the real task, and binders and phone apps can’t correct anyone, so they score 0.",
  },
  {
    factor: "Owner visibility into readiness",
    why: "We score 9 because the owner sees which tasks each new hire can do alone. Industrial glasses (8), phone apps (7) and VR (7) have completion dashboards, but they track lessons finished rather than tasks done on the floor. Shadowing (2) and binders (1) leave the owner guessing.",
  },
  {
    factor: "Expert knowledge capture",
    why: "We score 10 because capturing the best employee’s know-how is the product. Industrial glasses score 7 because they turn documents and video into instructions. A binder scores 4 because someone has to sit down and write what they know. Shadowing scores 3 because knowledge moves person to person and walks out the door when the expert leaves. Phone apps and VR score 2 because their content comes from headquarters, not from the store’s best worker.",
  },
];


const title: SlideFacts = {
  summary: "This slide introduces the product and the rules we used to avoid jumping to a solution. It has no statistics, so the questions here are about our process.",
  facts: [
    {
      figure: "5 rules",
      claim: "Our rules against solution jumping, written by the team for this project.",
      status: "estimate",
      caveat: "Rule 2 says to talk to noncustomers first. We haven’t interviewed owners yet, so say that the five owner interviews on slide 7 are how we’ll live up to it.",
    },
  ],
  questions: [
    {
      question: "What is solution jumping?",
      answer: "It’s picking a product before you understand the problem. Our first idea was AI glasses, which is a solution. We stopped, rebuilt the idea around the problem of constant retraining in high-turnover businesses, and checked the evidence before bringing the glasses back.",
    },
    {
      question: "Why the name Understudy?",
      answer: "In theater, an understudy learns a lead actor’s part so they can step in when needed. Our glasses learn how your best employee does the job so a new hire can step in.",
    },
    {
      question: "Did you actually talk to owners?",
      answer: "Not yet. Everything so far comes from published data and our own reasoning. Interviewing five owners and testing capture on one real shift are our next steps.",
    },
  ],
};

const challenge: SlideFacts = {
  summary: "This slide argues that high turnover forces owners to retrain constantly, that retraining is expensive, and that the owners who suffer most are the ones today’s training products ignore.",
  facts: [
    {
      figure: "46%",
      claim: "Retail separations in 2025 equaled about 46% of the retail workforce.",
      status: "verified",
      derivation: "BLS reports an average monthly total separations rate of 3.8% for retail in 2025. Because BLS computes it as 12 months of separations over 12 months of employment, 3.8 × 12 = 45.6% is the annual rate. BLS’s annual level of 6,987,000 retail separations against about 15.4 million retail jobs gives the same answer.",
      source: "blsJolts",
      quote: "Retail trade, 2025: 3.8",
      caveat: "This counts separations, not people. One job can turn over twice in a year, so don’t say “46% of workers leave.” Say “separations equal to 46% of the workforce.” Separations include quits, layoffs, firings and retirements. Quits alone were 2.6% a month, about 31% a year.",
    },
    {
      figure: "66%",
      claim: "Accommodation and food services separations in 2025 equaled about 66% of the workforce.",
      status: "verified",
      derivation: "BLS reports 5.5% a month for 2025, and 5.5 × 12 = 66%. The annual level of 9,304,000 separations against about 14.2 million jobs gives about 65.5%.",
      source: "blsJolts",
      quote: "Accommodation and food services, 2025: 5.5",
      caveat: "The category includes hotels as well as restaurants. The rate is well below 2021 and 2022 (7.1% and 7.0% a month), so don’t call it a rising trend.",
    },
    {
      figure: "$4,200",
      claim: "The estimated cost to replace one part-time grocery worker.",
      status: "adjusted",
      derivation: "This comes from a 2017 column by Chris Cooley, a benefits consultant, who credits the Coca-Cola Retailing Research Council. We changed the slide to say so. It was first labeled as a research council study.",
      source: "shelbyReport",
      quote: "Average cost for grocer to replace each worker making $8 per hour",
      caveat: "The figure is old and hard to trace. Cooley names no report, and we couldn’t find a Coca-Cola Retailing Research Council report containing $4,200. Its closest published figure is from a 2000 study, which put a cashier’s turnover cost at about $3,700, and its January 2024 retention report gives no dollar figure per hire. Newer restaurant figures are lower: Black Box Intelligence put hard costs at $2,305 per hourly worker in 2024. Present $4,200 as a dated estimate.",
    },
    {
      figure: "$67,200",
      claim: "The estimated turnover cost per grocery store per year.",
      status: "adjusted",
      derivation: "16 replacements × $4,200 = $67,200. The 16 is 33 part-time workers per store × 48.9% part-time turnover, both from the National Grocers Association’s 2017 survey of independent grocers.",
      source: "groceryDive",
      quote: "The average turnover cost per grocery store is $67,200, according to an estimate from Chris Cooley",
      caveat: "It’s one consultant’s arithmetic, and the consultant sells benefits services, so it isn’t neutral research. It describes independent grocers, which happen to be our target.",
    },
    {
      figure: "3 to 4 people",
      claim: "Walmart used to send three to four people to a store to train associates on a new process.",
      status: "verified",
      source: "strivrWalmart",
      quote: "Previously, we had to send three to four people to the store to train associates on how to set up the [Pickup Tower]",
      caveat: "It’s from Strivr’s own case study, so it’s vendor marketing. The quote is about Walmart’s Pickup Towers, which Walmart later phased out.",
    },
    {
      figure: "3 tiers",
      claim: "Kim and Mauborgne’s three tiers of noncustomers: soon-to-be, refusing and unexplored.",
      status: "verified",
      source: "noncustomerTiers",
      quote: "Tier two, “refusing”: buyers who have seen the current offering as an option… but have decided against participating",
      caveat: "The tiers come from Kim and Mauborgne’s book Blue Ocean Strategy, not the 2005 article. Their site gives the definitions but doesn’t name the chapter. Which businesses sit in which tier is our judgment, and independent grocers as refusing noncustomers is the claim the owner interviews need to test.",
    },
  ],
  background: [
    {
      figure: "58,800",
      claim: "US grocery store establishments in 2025 (supermarkets and other grocery retailers, excluding convenience stores).",
      status: "verified",
      source: "blsQcew",
      caveat: "This counts every grocery establishment, including small specialty grocers. There’s no reliable current count of independent grocers alone.",
    },
    {
      figure: "38.4%",
      claim: "Independent grocers’ share of US food retail sales, about $353.5 billion, with about 1.14 million direct workers.",
      status: "verified",
      source: "ngaImpact",
      caveat: "Published by the National Grocers Association, the trade group for independents.",
    },
    {
      figure: "627,086",
      claim: "US restaurant locations in 2025 (restaurants and other eating places), employing about 11 million people.",
      status: "verified",
      source: "blsQcew",
      caveat: "The National Restaurant Association’s “1 million outlets” is broader because it includes school and hospital foodservice.",
    },
    {
      figure: "15.5M",
      claim: "US retail trade employees in August 2026, plus 12.4 million in food services and drinking places.",
      status: "verified",
      source: "blsCes",
    },
    {
      figure: "$2,305",
      claim: "The hard cost to replace one hourly restaurant worker in 2024, covering separation, replacement and training.",
      status: "verified",
      source: "blackBox",
      quote: "Average “hard costs” (separation, replacement and training) to replace hourly staff now at $2,305",
      caveat: "From a survey of 158 restaurant brands, mostly multi-unit chains. 7shifts’ 2025 operator survey found $1,056 front of house and $1,491 back of house.",
    },
    {
      figure: "69%",
      claim: "Frontline grocery turnover, which a research council report puts at 60% above the all-industry rate of 45%. It also estimates turnover can cost 10 to 20% of a grocer’s profit.",
      status: "verified",
      source: "ccrrcRetention",
      caveat: "The report was published in January 2024, according to AlixPartners’ citation of it. Its 69% is a forecast for 2023.",
    },
  ],
  questions: [
    {
      question: "Do half of retail workers really quit every year?",
      answer: "Not exactly. The BLS number counts separations, not people. Separations equal to about 46% of retail jobs happened in 2025, and that includes layoffs and retirements as well as quits, and some jobs turn over more than once. Quits alone were about 31% for retail and about 50% for restaurants and hotels.",
    },
    {
      question: "Your cost figure is from 2017. Is there anything newer?",
      answer: "Yes, for restaurants. Black Box Intelligence put the hard cost of replacing an hourly restaurant worker at $2,305 in 2024, and 7shifts found $1,056 to $1,491 in 2025. For grocery, the research council’s newer report doesn’t give a dollar figure per hire, but it estimates turnover costs 10 to 20% of a grocer’s profit.",
    },
    {
      question: "How big is the market?",
      answer: "There are about 58,800 grocery establishments and 627,000 restaurants in the US. Independent grocers alone are 38.4% of food retail sales. We haven’t set a price yet, so we don’t claim a dollar market size. That comes when we build the business model in later weeks.",
    },
    {
      question: "Why wouldn’t Walmart or a big chain just build this?",
      answer: "They might, for themselves. Big chains have learning departments and budgets for VR. Our buyers are the owners who have neither, like independent grocers, franchisees and local restaurants, which is why we call them noncustomers of today’s training industry.",
    },
    {
      question: "The Walmart quote is about Pickup Towers, which Walmart removed. Does that matter?",
      answer: "The quote is about the cost of sending trainers to a store, not about the towers. It shows that even the biggest retailer found in-person training expensive enough to replace.",
    },
  ],
};

const drivers: SlideFacts = {
  summary: "This slide makes two arguments. AI can now watch a recorded shift and write instructions, and camera glasses are replacing headsets as the hardware people will actually wear. The last beat answers why big companies stopped selling headsets to businesses: they’re moving to glasses.",
  facts: [
    {
      figure: "Live AI",
      claim: "Meta’s Ray-Ban glasses can already see what the wearer sees and talk about it continuously.",
      status: "verified",
      source: "metaLiveAi",
      quote: "Meta AI can see what you see continuously and converse with you",
      caveat: "It launched as early access in December 2024, and it answers questions rather than writing procedures. Turning a week of footage into a store playbook is the part we build.",
    },
    {
      figure: "831K → 2.49M",
      claim: "Quarterly worldwide shipments of glasses without a display, from Q1 2025 to Q2 2026.",
      status: "verified",
      derivation: "Each bar comes from IDC’s quarterly smart eyewear release for that quarter: 831K, 1.618M, 2.994M, 2.248M and 2.494M. Year-over-year growth was 219.5%, 256.8%, 287.5%, 167.4% and 54%. IDC published only a full-year total for 2025, so Q4 2025 has no bar.",
      source: "idcTracker",
      caveat: "The red bars combine headsets and display glasses because IDC reported them together until Q2 2026, when it split them into 548K headsets and 505K display glasses. IDC also revises earlier quarters, so don’t compute growth across releases yourself. Use each release’s own growth rate. These are shipments to stores, not sales to people.",
    },
    {
      figure: "84.6%",
      claim: "Glasses’ share of all XR shipments in Q2 2026, up from 72.9% a year earlier. Headsets fell from 27.1% to 15.4%.",
      status: "verified",
      source: "idcShipments",
      quote: "Headsets held the remaining 15.4%, against the 27.1% they were left with a year earlier",
    },
    {
      figure: "7M+",
      claim: "Ray-Ban Meta and Oakley Meta glasses sold in 2025, up from about 2 million across 2023 and 2024 combined.",
      status: "verified",
      source: "essilorResults",
      quote: "AI-glasses units sold… were above 7 million in the full year",
      caveat: "The 2 million comparison is cumulative from the October 2023 launch to early 2025, as reported by TechTimes and The Verge. EssilorLuxottica hasn’t published a unit figure for the first half of 2026, only that AI glasses sales almost doubled in Q2.",
    },
    {
      figure: "−42%",
      claim: "The drop in Meta Quest headset shipments in 2025.",
      status: "verified",
      source: "idcXr2025",
      quote: "Shipments of the Quest line fell 42.3% year on year",
    },
    {
      figure: "Dec 2024",
      claim: "Microsoft stopped making HoloLens. In February 2025 it handed the Army headset program built on HoloLens to Anduril.",
      status: "verified",
      source: "hololensEnd",
      quote: "As of December 2024, HoloLens devices are no longer manufactured.",
      caveat: "Microsoft gave no reason. CNBC reported that Microsoft “has not found great success with the HoloLens since its introduction in 2015,” and there’s no successor.",
    },
    {
      figure: "Feb 2026",
      claim: "Meta stopped selling Quest headsets and managed services to businesses.",
      status: "verified",
      source: "metaForWork",
      quote: "We are stopping sales of Horizon managed services and commercial SKUs of Meta Quest, effective February 20th, 2026.",
      caveat: "Meta’s own post says the reason is to focus on consumer VR, not glasses. The link to glasses comes from Zuckerberg’s earnings calls and press coverage. Meta still sells consumer VR, and it announced a new glasses-shaped VR device this week.",
    },
    {
      figure: "“Most of our investment”",
      claim: "Zuckerberg told investors Meta is directing most of its hardware investment to glasses and wearables.",
      status: "verified",
      source: "metaQ4Call",
      quote: "For Reality Labs, we’re directing most of our investment towards glasses and wearables going forward",
    },
    {
      figure: "$150M",
      claim: "Google committed up to $150 million to develop AI glasses with Warby Parker. The first glasses launch with Samsung this fall.",
      status: "verified",
      source: "googleWarbyParker",
      quote: "Google has already committed $75 million to Warby Parker’s product development and commercialization costs",
      caveat: "The second $75 million, plus an equity stake, depends on Warby Parker hitting milestones.",
    },
    {
      figure: "Apple",
      claim: "Apple reportedly paused a lighter, cheaper headset to move people onto smart glasses.",
      status: "verified",
      source: "appleGlassesReport",
      caveat: "This is Bloomberg reporting. Apple hasn’t announced glasses, so always say “reportedly.”",
    },
    {
      figure: "275,000",
      claim: "Deliveries completed by more than 500 Amazon drivers testing AI glasses that scan packages and show walking directions.",
      status: "verified",
      source: "amazonGlasses",
      quote: "more than 500 DAs have tested the glasses… completing more than 275,000 customer deliveries",
      caveat: "It’s the closest thing to our idea in the market: AI glasses guiding frontline workers. Amazon built it for its own drivers, not for small businesses.",
    },
    {
      figure: "IDC",
      claim: "IDC expects training to be one of the uses that drives business adoption of smart glasses.",
      status: "verified",
      source: "idcTraining",
      quote: "Among businesses, training and design use cases will keep driving adoption",
      caveat: "The same IDC post names the lack of notice and consent while recording as a risk. The privacy research is on the slide 4 fact page.",
    },
  ],
  background: [
    {
      figure: "$4.6B",
      claim: "Meta’s Reality Labs operating loss in Q2 2026. Revenue grew 16% to $431 million on AI glasses sales while Quest sales fell.",
      status: "verified",
      source: "metaEarnings",
      caveat: "We took this off the slide because a big loss invites the question of whether the whole category is a money pit. The answer is that the growth is in glasses and the losses are mostly in VR.",
    },
    {
      figure: "13.6M",
      claim: "IDC’s 2026 forecast for display-less smart glasses shipments. Meta held 69.2% of the market in Q1 2026.",
      status: "verified",
      source: "idcBlog",
    },
    {
      figure: "130% → 35%",
      claim: "Year-over-year growth in smart eyewear shipments slowed from 130.1% in Q1 2026 to 35.3% in Q2.",
      status: "verified",
      source: "techNode",
      caveat: "IDC attributes the slowdown to pauses between product cycles. China’s market shrank in Q2 2026, so growth isn’t happening everywhere.",
    },
  ],
  questions: [
    {
      question: "Why did big companies stop selling headsets to businesses? Doesn’t that hurt your idea?",
      answer: "They left headsets, not the space. Microsoft stopped making HoloLens after years of weak traction, and Meta stopped selling Quest to businesses. Meanwhile Meta says most of its hardware investment now goes to glasses, Google put up to $150 million into Warby Parker, Apple reportedly paused a headset for glasses, and Amazon is already guiding delivery drivers with AI glasses. They’re making the same bet we are.",
    },
    {
      question: "Most of those glasses have no screen. How can they coach anyone?",
      answer: "By voice. Our first version talks the new hire through tasks and answers questions, and it uses the camera to see what they’re doing. That’s exactly what camera glasses like Ray-Ban Meta already do. A display would be nice later, but we don’t need it.",
    },
    {
      question: "Isn’t this all Meta? What if Meta stumbles?",
      answer: "Meta holds about 69% of shipments today, so the trend is mostly one company’s product cycle. But Google, Samsung, Apple, Amazon and Alibaba are all building glasses, and we plan to build on off-the-shelf hardware and open platforms like Mentra so we’re not tied to one maker.",
    },
    {
      question: "Why won’t Meta or Google build this themselves?",
      answer: "They sell the platform and focus on consumers, and big players will go after large enterprises first. Store-by-store training for small businesses is a narrow, hands-on market, which suits a scrappier startup building on their hardware.",
    },
    {
      question: "Why are these “exponential” drivers?",
      answer: "Both are improving fast enough to change what’s possible in a year or two. Glasses shipments grew more than 150% year over year in four of the five quarters IDC published, and AI that understands live video went from a demo to a feature on consumer glasses in December 2024.",
    },
  ],
};

const solution: SlideFacts = {
  summary: "This slide explains how the product works in three stages: capture, learn and coach. It also shows a realistic first version. Privacy isn’t on the slide, but the research behind it is below for questions. The coaching example and the dashboard are illustrations, not real data.",
  facts: [
    {
      figure: "$249–$449",
      claim: "What Meta’s current AI glasses cost in the US.",
      status: "adjusted",
      derivation: "The slide first said “around $300.” Meta launched Ray-Ban Meta Gen 3 at $449 on September 23, 2026, and its cheapest AI glasses, Meta Adventurer, start at $249.",
      source: "metaGlassesPrices",
      quote: "Ray-Ban Meta (Gen 3) is available today, with prices starting at $449 USD.",
      caveat: "Prices change quickly. Check again the week you present.",
    },
    {
      figure: "$449",
      claim: "Mentra Live glasses run MentraOS, which is open source and has an open SDK anyone can build on.",
      status: "verified",
      source: "mentraLive",
      quote: "MentraOS is open source",
    },
    {
      figure: "1 example",
      claim: "Retrocausal sets up live factory guidance from a single recorded example, which shows that learning from one recording is realistic.",
      status: "verified",
      source: "retrocausal",
      quote: "No-code configuration for quick setup from a single recorded example.",
    },
    {
      figure: "About a week",
      claim: "How long the best employee wears the glasses to capture a store’s playbook.",
      status: "estimate",
      caveat: "This is our assumption. The test on one real shift will tell us how much footage a useful playbook really needs.",
    },
    {
      figure: "Maya, Jordan, Luis",
      claim: "The coaching conversation, the playbook tasks and the readiness dashboard.",
      status: "illustrative",
      caveat: "These show what the product would look like. The people and numbers are made up, and nothing has been built yet.",
    },
  ],
  background: [
    {
      figure: "11 states",
      claim: "States that require everyone in a conversation to consent before it’s recorded: California, Delaware, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana, New Hampshire, Pennsylvania and Washington.",
      status: "verified",
      source: "recordingConsent",
      caveat: "Federal law needs only one party’s consent, but the wearer isn’t a party to conversations they overhear, so even that doesn’t cover other people’s conversations. California’s law covers only confidential conversations, which may exclude a chat at a register but not one in a back office. A few more states have partial or mixed rules.",
    },
    {
      figure: "5 years",
      claim: "The FTC banned Rite Aid from using facial recognition for surveillance for five years.",
      status: "verified",
      source: "ftcRiteAid",
      caveat: "Recording video isn’t regulated as biometrics. Extracting face geometry is, under laws like Illinois’ BIPA and Texas’ CUBI. Target faces an Illinois class action claiming its store cameras capture face geometry, which it disputes.",
    },
    {
      figure: "Bartone v. Meta",
      claim: "Meta is being sued after contractors labeling glasses footage saw intimate scenes. Bystanders who never owned the glasses joined the suit later.",
      status: "verified",
      source: "metaGlassesLawsuit",
      caveat: "This is why our plan keeps footage with the store and never sends it for human review or outside AI training.",
    },
    {
      figure: "72%",
      claim: "Americans who worry about being secretly recorded by camera-equipped wearables. 85% support a required recording light.",
      status: "verified",
      source: "wearableSurvey",
      caveat: "It’s one survey of about 1,000 US adults, published through a tech news site.",
    },
    {
      figure: "Oct 1, 2026",
      claim: "Connecticut’s expanded monitoring law takes effect, requiring employers to name each location where they monitor workers, including with cameras.",
      status: "verified",
      source: "connecticutMonitoring",
      caveat: "Rules differ by state. New York and Delaware require notice for electronic monitoring. A pending California bill, SB 1130, would require employees with work wearables to tell customers they’re being recorded.",
    },
    {
      figure: "Our plan",
      claim: "Keep only the wearer’s voice, blur faces on the glasses, keep footage with the store, and post signs and staff notice.",
      status: "estimate",
      caveat: "These are design proposals, not built features. Regulators recommend similar steps: the UK’s privacy regulator says to keep audio off unless needed, and EU guidance recommends masking what isn’t needed and deleting footage within days.",
    },
  ],
  questions: [
    {
      question: "Has any of this been built?",
      answer: "No. It’s a concept. What we can show is that each piece exists today: glasses that see what you see and talk back (Meta Live AI), guidance learned from one recording (Retrocausal), and turning video into work instructions (Augmentir). Our idea is to combine them for small stores.",
    },
    {
      question: "Stores like Target already record customers. Why is privacy a big deal for you?",
      answer: "Store cameras record silent video in public areas, which is broadly legal. Glasses add three things security cameras don’t: a microphone, a camera that follows the employee into back rooms, and AI analysis. Audio is the biggest legal risk, because 11 states require everyone’s consent to record a conversation. Our plan is to keep only the wearer’s voice, blur faces on the glasses, keep footage with the store with no human review, and post clear notice. We’d still need a lawyer to review it before any pilot.",
    },
    {
      question: "How much will it cost?",
      answer: "We haven’t set a price. The plan is a monthly subscription per store plus glasses, and we’ll build that model in the coming weeks. The target is to cost less than what one replacement hire costs an owner today.",
    },
    {
      question: "What stops a competitor from copying this?",
      answer: "Bigger players will build for large enterprises first, because that’s where the big contracts are. We start with a scrappier product for small businesses they won’t prioritize, and grow from there. Every store’s playbook also gets better with each recorded shift, which is hard to copy. We shouldn’t claim a strong moat yet."
    },
  ],
};

const canvasFacts: SlideFacts = {
  summary: "This slide compares our value curve with the five ways stores train new hires today, using Kim and Mauborgne’s strategy canvas and four actions. The scores are team estimates, and the method and reasoning are below.",
  facts: [
    {
      figure: "0–10",
      claim: "Every score on the canvas.",
      status: "estimate",
      derivation: "The scores came from our project brief and reflect the team’s judgment. They are not survey data.",
      caveat: "Say this before anyone asks. Then explain that the owner interviews will replace them with real ratings.",
    },
    {
      figure: "Value innovation",
      claim: "Raising buyer value and lowering cost at the same time, the core idea of Blue Ocean Strategy.",
      status: "verified",
      source: "valueInnovation",
      quote: "the simultaneous pursuit of differentiation and low cost, creating a leap in value for both buyers and the company",
      caveat: "The full article is behind a paywall everywhere we looked, so we checked its abstract on the California Management Review site and the definitions on Kim and Mauborgne’s own site. To quote the article itself, open it through the USC library, which gives access through the publisher, SAGE.",
    },
    {
      figure: "$3,500",
      claim: "HoloLens 2’s launch price, the headset we compare with $249 to $449 glasses in the ERRC grid.",
      status: "verified",
      source: "hololensPrice",
      quote: "$3,500 to own outright or on a $99 per month installment plan",
      caveat: "That’s the 2019 launch price, and HoloLens 2 is now discontinued.",
    },
    {
      figure: "225,000 cases",
      claim: "[yellow tail] sold 225,000 cases in its first year, nine times the 25,000 Casella expected, and reached 25 million cases in total by the end of 2005.",
      status: "verified",
      derivation: "The source says Casella sold “nine times” its 25,000-case target, and 9 × 25,000 = 225,000.",
      source: "yellowTailCase",
      quote: "they had expected to sell 25,000 cases in their first year. In fact, they had sold nine times that amount.",
    },
    {
      figure: "2 years",
      claim: "[yellow tail] became the number-one imported wine in the US within two years by eliminating complexity and aging and creating easy drinking, easy selection, and fun and adventure.",
      status: "verified",
      source: "wineExcerpt",
      quote: "In the space of only two years, Yellow Tail emerged as the fastest-growing brand… and the number-one imported wine into the United States",
    },
    {
      figure: "3 characteristics",
      claim: "A good blue ocean strategy has focus, divergence and a compelling tagline.",
      status: "verified",
      source: "wineExcerpt",
      quote: "A good strategy has a clear-cut and compelling tagline.",
      caveat: "This quote is from the authors’ book. The 2005 article makes the same point, but we couldn’t open its full text.",
    },
  ],
  questions: [
    {
      question: "Where did these scores come from?",
      answer: "They’re our team’s estimates, based on how each training option works. They aren’t survey data. The reasoning for every factor is on this page, and we’ll replace the estimates with ratings from the owners we interview.",
    },
    {
      question: "Isn’t this chart biased toward your own product?",
      answer: "Every strategy canvas is drawn by the company making it, and it’s meant to show a choice. Look at the left side: we score ourselves low on cost and effort, not zero, and we give ourselves 8 rather than 10 on live correction because version one only checks a few tasks.",
    },
    {
      question: "Why these ten factors?",
      answer: "They’re what a store owner weighs when choosing how to train someone: money, staff time, content, hardware and time off the floor on the cost side, and store knowledge, learning on the job, correction, visibility and capturing expertise on the value side. We ordered them the way the article does, with eliminated and reduced factors on the left.",
    },
    {
      question: "How is this like [yellow tail]?",
      answer: "Casella stopped competing on wine jargon and aging and created easy drinking, easy choosing and fun, which brought beer and cocktail drinkers into wine. We stop competing on immersive content and create store-specific, on-the-job coaching, which brings in owners who never bought training at all.",
    },
  ],
};

const landscape: SlideFacts = {
  summary: "This slide maps who does what: live, on-the-job coaching exists for factories and field service, and retail tools train people away from the floor. The positions on the map are our judgment, and the descriptions come from each company’s own pages.",
  facts: [
    {
      figure: "Positions",
      claim: "Where each company sits on the map.",
      status: "estimate",
      caveat: "Placement is our reading of each company’s marketing, not a measurement.",
    },
    {
      figure: "17,000",
      claim: "VR headsets Walmart put in its US stores for Strivr training, for more than 1 million associates.",
      status: "adjusted",
      derivation: "The slide first said Walmart trained 2.2 million associates across 4,700 stores. Strivr’s page describes that as a plan, so we used Walmart’s own 2018 figures.",
      source: "walmartVr",
    },
    {
      figure: "8 h → 15 min",
      claim: "Walmart cut Pickup Tower training from 8 hours to 15 minutes with Strivr.",
      status: "verified",
      source: "strivrWalmart",
      quote: "reduce Pickup Tower training time by 96%, from 8 hours to just 15 minutes",
      caveat: "It’s from Strivr’s own case study and gives no method.",
    },
    {
      figure: "$599",
      claim: "VITURE Helix: AI safety glasses for industrial, lab and clinical work, announced June 2026 and shipping in Q1 2027.",
      status: "verified",
      source: "viture",
      caveat: "It hasn’t shipped yet.",
    },
    {
      figure: "Airwave",
      claim: "Captures field technicians’ fixes and judgment calls to onboard the next technician faster.",
      status: "verified",
      source: "airwave",
      quote: "captures their fixes, judgment calls and shortcuts so the next tech gets onboarded faster",
      caveat: "Airwave doesn’t say what device it runs on, so don’t describe it as glasses.",
    },
    {
      figure: "Augmentir",
      claim: "Generates work instructions from existing documents and video for industrial crews.",
      status: "verified",
      source: "augmentir",
      quote: "Quickly generate standard work procedures from Excel, Word, PDFs, images, or videos.",
      caveat: "Augmentir starts from documents that already exist. We start from a recording of a person doing the job, which is a real difference.",
    },
    {
      figure: "3–5 min",
      claim: "Axonify and YOOBIC deliver short phone lessons to frontline retail staff.",
      status: "verified",
      source: "yoobic",
      quote: "daily 3-to-5-minute training sessions using spaced repetition",
      caveat: "YOOBIC describes itself as “microlearning in the flow of work,” so it edges toward on-the-job. It’s still lessons on a phone, not live coaching during a task.",
    },
  ],
  questions: [
    {
      question: "Is the top-right corner really empty?",
      answer: "We found no product that coaches retail or small-business workers live, hands-free, during real tasks. Our search was limited to public websites, so an investor may know something we don’t. The closest is YOOBIC, which calls itself learning in the flow of work but still delivers phone lessons.",
    },
    {
      question: "What if an industrial player like VITURE or Augmentir moves into retail?",
      answer: "They’ll likely go after large enterprises first, where the contracts are biggest. Their products are built for factories, with safety hardware and existing documents. We start with a scrappier, cheaper product for small businesses that learns from the owner instead of from manuals, and grow from there.",
    },
  ],
};

const mindMapFacts: SlideFacts = {
  summary: "The mind map lays out the problem space around constant retraining. It’s our team’s map, and the branches are hypotheses to test, not findings.",
  facts: [
    {
      figure: "8 branches",
      claim: "Causes of turnover, cost of training, what new hires struggle with, tacit knowledge, noncustomers, alternatives, enabling tech and risks.",
      status: "estimate",
      caveat: "The causes and struggles listed are our hypotheses. The owner interviews should confirm or cut each one.",
    },
  ],
  questions: [
    {
      question: "Which parts of the map have you validated?",
      answer: "The cost and turnover branches are backed by the data on slide 2. The rest are hypotheses. The five owner interviews will focus on what new hires struggle with and whether owners would record their best employee.",
    },
    {
      question: "What are you doing next?",
      answer: "Interview five owners, test capture during one real shift, and redraw the strategy canvas with the owners’ own scores.",
    },
  ],
};

const sourcesFacts: SlideFacts = {
  summary: "The appendix lists every source cited on the slides. The fact pages also cite background sources that don’t appear on the slides.",
  facts: [],
  questions: [
    {
      question: "Some of your sources are company websites. Can you trust them?",
      answer: "We use company pages only to describe what each company says its product does, and we say so. Market and labor numbers come from the Bureau of Labor Statistics, IDC and company earnings reports.",
    },
  ],
};

export const factsBySlide: Record<string, SlideFacts> = {
  title,
  challenge,
  drivers,
  solution,
  canvas: canvasFacts,
  landscape,
  "mind-map": mindMapFacts,
  sources: sourcesFacts,
};

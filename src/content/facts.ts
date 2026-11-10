import { talinMarket, team } from "./config";
import { annualPricePerLocation, grantFunds, useCases, title as titleSlide, valueProposition, visualValueProposition, talinStory, market, proFormaRevenue, revenueFormatter, useOfFunds, yearlyRevenue, type ProFormaYear } from "./content";
import type { SourceId } from "./sources";

export type FactStatus = "verified" | "adjusted" | "estimate" | "illustrative" | "ownerReported" | "intervieweeEstimate" | "unconfirmed";

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

export type SlideFacts = { summary: string; facts: Fact[]; background?: Fact[]; questions: Question[]; checkedOn?: string };

export const factsCheckedOn = "September 24, 2026";

const [totalRing, serviceableRing, obtainableRing] = market.rings;
const wholeNumber = new Intl.NumberFormat("en-US");
const wholeDollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const count = (value: number) => wholeNumber.format(value);
const exactRevenue = (locations: number) => wholeDollars.format(yearlyRevenue(locations));
const revenue = (locations: number) => revenueFormatter(yearlyRevenue(locations))(yearlyRevenue(locations));
const monthlyPrice = wholeDollars.format(market.pricePerMonth);
const yearlyPrice = wholeDollars.format(annualPricePerLocation);

export const canvasMethod = [
  "Each line is one way a store can train a new hire today, plus ours. For every factor along the bottom, each option gets a score from 0 to 10, where a higher score means the option offers more of that factor. The chart plots those scores and connects them from left to right, which is how Kim and Mauborgne draw a strategy canvas.",
  "The scores are our team’s judgment, not survey data. They were set in our project brief from what we know about how each option works. If someone asks, say that plainly first, then walk through the reasoning for the factor they’re asking about.",
  "On the left five factors, a high score means the buyer carries more of that burden: more cost, more staff time, more content to make, more hardware and more time off the floor. That’s why a low score is good there, and why our curve sits low. On the right five factors, a high score means the buyer gets more of that benefit.",
  "We plan to replace the estimates with evidence. We’ll ask the owners and store manager at Talin Market to score the options they’ve actually used on the same ten factors, then redraw the canvas from their scores.",
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
  background: [
    {
      figure: "Subtitle",
      claim: titleSlide.subtitle,
      status: "estimate",
      caveat: "The grant deck leaves this line off the title slide. It’s our own description of the project.",
    },
  ],
  facts: [
    {
      figure: "5 rules",
      claim: "Our rules against solution jumping, written by the team for this project.",
      status: "estimate",
      caveat: "Rule 2 says to talk to noncustomers first. So far we’ve interviewed the owners and store manager at Talin Market, which has no training department. That’s one store, so say so.",
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
      answer: "Yes, at one store. We interviewed the owners and store manager at Talin Market. Everything else comes from published data and our own reasoning. Testing capture on one real shift is our next step.",
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
      answer: `Slide 7 sizes it. Census Bureau counts add up to ${count(totalRing.locations)} US stores, restaurants and bars with employees, and ${count(serviceableRing.locations)} of them are owned by businesses with fewer than 100 employees. At our estimated ${monthlyPrice} a month per location, the small ones add up to about ${revenue(serviceableRing.locations)} a year. The price is our estimate until we test it with owners.`,
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
      caveat: "Rules differ by state. New York and Delaware require notice for electronic monitoring. California’s SB 1130, which would have required employees with work wearables to tell customers they’re being recorded, was vetoed on September 30, 2026 (The Next Web, Oct 2026).",
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
      answer: `We haven’t tested a price with owners yet. For the market size on slide 7 we assume ${monthlyPrice} a month per store, which is ${yearlyPrice} a year and less than the $2,305 it costs to replace one hourly restaurant worker. Stores also buy the glasses, $249 to $449 from Meta. Slide 8 shows the business plan built on that price. It reaches 450 paying stores by the end of 2028.`,
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
      caveat: "Say this before anyone asks. Then explain that we plan to replace them with ratings from the owners and store manager at Talin Market.",
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
      answer: "They’re our team’s estimates, based on how each training option works. They aren’t survey data. The reasoning for every factor is on this page, and we plan to replace the estimates with ratings from the owners and store manager at Talin Market.",
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
  checkedOn: "October 14, 2026",
  summary: "This slide maps who does what: live, on-the-job coaching exists for big companies, and the tools built for small businesses train people away from the floor. The positions on the map are our judgment, and the descriptions come from each company’s own pages.",
  facts: [
    {
      figure: "Positions",
      claim: "Where each company sits on the map.",
      status: "estimate",
      caveat: "Placement is our reading of each company’s marketing, not a measurement. Bottom to top reflects who the company says it sells to.",
    },
    {
      figure: "Strivr",
      claim: "Strivr’s early-access Frontline Intelligence coaches retail associates by voice through smart glasses, including Ray-Ban Meta, and its platform page says it’s built for enterprise operations.",
      status: "verified",
      source: "strivrRetail",
      quote: "delivers voice-based, audio guidance via the built-in speakers on your workers’ smart glasses",
      caveat: "It’s early access only, with no public price. Strivr’s own team captures footage and trains a model for each company.",
    },
    {
      figure: "Trainual",
      claim: "Trainual is a training app for small and mid-size companies.",
      status: "verified",
      source: "trainualPricing",
      quote: "Trainual is best suited for companies with 25 - 1000 employees.",
    },
    {
      figure: "Free",
      claim: "Connecteam’s small-business plan is free for small teams, and its training runs as phone courses.",
      status: "verified",
      source: "connecteamPricing",
      quote: "entirely free for up to 10 users",
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
      caveat: "Airwave says it’s built for field service teams, so it sits with the enterprise tools.",
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
  background: [
    {
      figure: "17,000",
      claim: "VR headsets Walmart put in its US stores for Strivr training, for more than 1 million associates.",
      status: "verified",
      source: "walmartVr",
    },
    {
      figure: "8 h → 15 min",
      claim: "Walmart cut Pickup Tower training from 8 hours to 15 minutes with Strivr VR.",
      status: "verified",
      source: "strivrWalmart",
      quote: "reduce Pickup Tower training time by 96%, from 8 hours to just 15 minutes",
      caveat: "It’s from Strivr’s own case study and gives no method.",
    },
  ],
  questions: [
    {
      question: "Is the top-right corner really empty?",
      answer: "We found no product that coaches small-business workers live, hands-free, during real tasks. The closest is Strivr’s early-access Frontline Intelligence, which coaches retail and restaurant workers by voice through smart glasses, but its platform page says it’s built for enterprise operations. Our search was limited to public websites, so an investor may know something we don’t.",
    },
    {
      question: "What if Strivr or an industrial player moves down to small stores?",
      answer: "They’ll likely go after large enterprises first, where the contracts are biggest. Their products are built for factories, with safety hardware and existing documents. We start with a scrappier, cheaper product for small businesses that learns from the owner instead of from manuals, and grow from there.",
    },
  ],
};

const locationsUnderFiveEmployees = 517_936;
const locationsFiveToNinetyNine = serviceableRing.locations - locationsUnderFiveEmployees;
const firstMarketShare = `${market.firstMarket.share * 100}%`;

const marketFacts: SlideFacts = {
  checkedOn: "September 28, 2026",
  summary: "This slide sizes the market by counting locations, because we charge per store and every store trains its own new hires. The location counts come straight from the Census Bureau. The price and the 1% share are team estimates, so every dollar figure is an estimate built on real counts.",
  facts: [
    {
      figure: count(totalRing.locations),
      claim: "US store and food service locations with paid employees at any time in 2022. This is our total addressable market (TAM).",
      status: "verified",
      derivation: "The Census Bureau counts 1,045,890 retail locations and 700,469 food service and drinking place locations. We subtracted the 90,991 nonstore retailers (online sellers, vending machine operators and direct sellers like heating oil dealers) because they have no store floor to train anyone on: 1,045,890 − 90,991 + 700,469 = 1,655,368.",
      source: "censusSusb",
      quote: "Retail Trade, total: 1,045,890. Nonstore Retailers, total: 90,991. Food Services and Drinking Places, total: 700,469.",
      caveat: "2022 is the latest year of Statistics of U.S. Businesses, the Census table that splits locations by company size for each state and detailed industry. BLS counts of the same kinds of locations grew 2.2% from 2022 to 2025 (see the background numbers), so today’s count is probably a little higher. Businesses with no employees aren’t counted. Retail includes car dealers and gas stations, and food service includes caterers, food trucks and contract cafeterias. Hotels aren’t included.",
    },
    {
      figure: revenue(totalRing.locations),
      claim: `Our total addressable market in dollars: every US store and food service location with employees paying ${monthlyPrice} a month.`,
      status: "estimate",
      derivation: `${count(totalRing.locations)} locations × ${yearlyPrice} a year = ${exactRevenue(totalRing.locations)}.`,
      caveat: "The locations are counted and the price is ours. Every dollar figure on the slide moves with the price, so say that first if someone questions the size.",
    },
    {
      figure: count(serviceableRing.locations),
      claim: "US store and food service locations owned by businesses with fewer than 100 employees in total. This is our serviceable available market (SAM).",
      status: "verified",
      derivation: "Retail locations of businesses under 100 employees: 599,640 (under 20) + 78,568 (20 to 99) = 678,208. Removing the 81,477 nonstore ones leaves 596,731. Food service: 403,071 + 125,772 = 528,843. Together that’s 1,125,574, from the same Census table as the TAM.",
      source: "censusSusbGlossary",
      quote: "Enterprise size designations are determined by the summed employment of all associated establishments.",
      caveat: `Company size counts every employee across all of a business’s locations, so a Walmart store is out even though it’s one location, and a family that owns two cafés is in. Census groups locations by common ownership or control, so we read a franchisee who owns a few shops as its own small business rather than part of the brand. Census doesn’t say that about this table directly. ${Math.round((locationsUnderFiveEmployees / serviceableRing.locations) * 100)}% of these locations belong to businesses with fewer than 5 employees (328,071 retail and 189,865 food service). Leave those out and the SAM is ${count(locationsFiveToNinetyNine)} locations, about ${revenue(locationsFiveToNinetyNine)} a year.`,
    },
    {
      figure: revenue(serviceableRing.locations),
      claim: "Our serviceable available market in dollars, and the number in the slide’s heading.",
      status: "estimate",
      derivation: `${count(serviceableRing.locations)} locations × ${yearlyPrice} a year = ${exactRevenue(serviceableRing.locations)}.`,
    },
    {
      figure: "100 employees",
      claim: "Training Magazine’s annual survey of US training spending only includes companies with 100 or more employees. That’s where we draw the line for our serviceable market.",
      status: "verified",
      source: "trainingIndustryReport",
      quote: "Only U.S.-based corporations and educational institutions with 100 or more employees were included in the analysis.",
      caveat: "The cutoff is our choice. The survey’s scope shows who the training industry measures, not that smaller businesses never buy training. The same report puts US training spending at $102.8 billion in 2025.",
    },
    {
      figure: count(market.firstMarket.smallBusinessLocations),
      claim: "California store and food service locations owned by businesses with fewer than 100 employees.",
      status: "verified",
      derivation: "Retail: 65,460 (under 20) + 8,195 (20 to 99) = 73,655, minus 11,524 nonstore = 62,131. Food service: 51,978 + 16,427 = 68,405. Together that’s 130,536.",
      source: "censusSusb",
      caveat: `California holds ${((market.firstMarket.smallBusinessLocations / serviceableRing.locations) * 100).toFixed(1)}% of the US serviceable market, and it’s where we can meet owners in person.`,
    },
    {
      figure: count(obtainableRing.locations),
      claim: `Our serviceable obtainable market (SOM): ${firstMarketShare} of California’s small store and food service locations, won within ${market.firstMarket.years} years.`,
      status: "estimate",
      derivation: `${count(market.firstMarket.smallBusinessLocations)} × ${firstMarketShare} = ${count(obtainableRing.locations)}.`,
      caveat: "The 1% is our target, not a forecast from data. For comparison, Trainual, a training app for small businesses, launched in January 2018 and says it supports more than 7,500 of them. Toast, the restaurant point-of-sale system, launched in 2013 and had 19,891 locations by June 2019. Our target is a slower pace than either.",
    },
    {
      figure: revenue(obtainableRing.locations),
      claim: "Our serviceable obtainable market in dollars.",
      status: "estimate",
      derivation: `${count(obtainableRing.locations)} locations × ${yearlyPrice} a year = ${exactRevenue(obtainableRing.locations)}.`,
    },
    {
      figure: `${monthlyPrice} a month`,
      claim: `The price per location we assume for every dollar figure, which is ${yearlyPrice} a year.`,
      status: "estimate",
      derivation: `We picked a price in the range 7shifts quotes for standalone training tools and kept it under the cost of one replacement hire: ${yearlyPrice} a year is less than the $2,305 it costs to replace one hourly restaurant worker (Black Box Intelligence, 2024, on the slide 2 fact page).`,
      source: "sevenShiftsTraining",
      quote: "Standalone LMS tools charge $100–$200/month per location",
      caveat: "7shifts sells scheduling software with training built in, so that range is its own marketing claim about competitors. Homebase’s per-location prices are in the background numbers for comparison. We haven’t tested our price with owners yet.",
    },
  ],
  background: [
    {
      figure: "Market sizing doc",
      claim: `Our full market sizing math is in our market sizing doc: ${team.marketSizingDocLink}`,
      status: "estimate",
      caveat: `The grant deck leaves the doc link and the price note off the slide. The price is the ${monthlyPrice} a month fact above.`,
    },
    {
      figure: "+2.2%",
      claim: "Growth in the BLS count of US retail and food service locations from 2022 to 2025, from 1,743,893 to 1,783,136.",
      status: "verified",
      derivation: "Private retail trade went from 1,058,672 to 1,061,340 locations (+0.25%), and food services and drinking places went from 685,221 to 721,796 (+5.3%). These are the BLS annual averages for industries 44-45 and 722.",
      source: "blsQcewSlices",
      caveat: "BLS counts locations differently from the Census Bureau, so compare BLS with itself across years, not with the Census count. Retail peaked in 2023 and has dipped since, and food service drove most of the growth.",
    },
    {
      figure: "$30–$120",
      claim: "What Homebase charges per location per month for its paid scheduling plans, billed monthly.",
      status: "verified",
      source: "homebasePricing",
      quote: "/ location / month unlimited employees",
      caveat: "Annual billing runs $24 to $96, and a free plan covers one location with up to 10 employees. Homebase sells scheduling, payroll, and hiring and onboarding tools rather than on-the-job coaching, so use it as a price comparison only.",
    },
    {
      figure: "76%",
      claim: "Small employers (5 to 250 employees) who train their most common hires most often do it by having someone in the business work with them.",
      status: "verified",
      source: "nfibTraining",
      quote: "the most frequent method of training them is to have someone in the firm work with them",
      caveat: "It’s a 2005 poll, so it’s old, and the 76% comes from the 382 employers in it who expect new hires to learn at least partly on the job. It’s still the only primary survey we found on how small businesses train, and it matches the shadowing line on our strategy canvas.",
    },
    {
      figure: "29%",
      claim: "Restaurants that filled a job in 2025 and use a training and development platform for new hires.",
      status: "verified",
      source: "nraHiring",
      quote: "29% utilize training and development platforms",
      caveat: "Respondents picked from a list of tools, so the other 71% didn’t pick this one. The report doesn’t give a sample size, and the National Restaurant Association is an industry group. The same report found that 26% of restaurants use any tools with AI.",
    },
    {
      figure: "7,500+",
      claim: "Small businesses using Trainual, a training and documentation app that launched in January 2018.",
      status: "verified",
      source: "trainualAbout",
      quote: "In January of 2018, Trainual was officially launched and today supports more than 7,500 small businesses in over 180 countries.",
      caveat: "The page isn’t dated and the count is worldwide. Trainual stores written procedures and doesn’t coach anyone live, so use it to show how fast small businesses adopt training software, not as a direct competitor.",
    },
    {
      figure: "6%",
      claim: "Toast’s share of US restaurant locations in June 2021, eight years after it launched in 2013. It had 47,942 locations.",
      status: "verified",
      source: "toastProspectus",
      quote: "the locations on our platform represented only about 6% of the approximately 860,000 restaurant locations in the United States",
      caveat: "Toast sells the system restaurants use to take payments, which every restaurant needs, so it spreads faster than training software would. It still took eight years to reach 6%.",
    },
  ],
  questions: [
    {
      question: "Why count locations instead of companies?",
      answer: "We charge per store, and every store trains its own new hires. A business with three shops is three subscriptions.",
    },
    {
      question: "Why draw the line at 100 employees?",
      answer: "Training Magazine’s annual survey of the training industry only includes companies with 100 or more employees, so businesses below that line don’t show up in how the industry measures itself. They’re the noncustomers from slide 2. The cutoff is our choice, and the owner interviews will test it.",
    },
    {
      question: "Isn’t that too broad? A lot of these must be tiny shops.",
      answer: `Yes, ${Math.round((locationsUnderFiveEmployees / serviceableRing.locations) * 100)}% of those locations belong to businesses with fewer than 5 employees. If you leave them out, the serviceable market is ${count(locationsFiveToNinetyNine)} locations and about ${revenue(locationsFiveToNinetyNine)} a year.`,
    },
    {
      question: `Where does ${monthlyPrice} a month come from?`,
      answer: `It’s our estimate. 7shifts says standalone training tools charge $100 to $200 a month per location, and ${yearlyPrice} a year is less than the $2,305 it costs to replace one hourly restaurant worker. We’ll test it with the owners and store manager at Talin Market.`,
    },
    {
      question: "Is 1% realistic?",
      answer: "We think so. Trainual, a training app for small businesses, reached more than 7,500 of them after launching in 2018. Toast had 19,891 restaurant locations six years after launching. We’re aiming for 1,305 locations in three years, a slower pace than either.",
    },
    {
      question: "Why start in California?",
      answer: "We’re at USC in Los Angeles, so we can visit owners, set up the glasses and watch real shifts ourselves. California has 130,536 small store and food service locations, more than a tenth of the US total.",
    },
    {
      question: "The data is from 2022. Isn’t that stale?",
      answer: "It’s the latest year of the Census table that splits locations by company size for each state and detailed industry, and it came out in April 2025. BLS counts of the same kinds of locations grew 2.2% from 2022 to 2025, so today’s numbers are probably a little higher than ours.",
    },
    {
      question: "Are the circles drawn to scale?",
      answer: "No. At true scale the SOM circle would be less than a thousandth of the TAM circle’s area and too small to see. The circles show which market sits inside which, and the numbers beside them carry the sizes.",
    },
    {
      question: "Do the glasses count toward these numbers?",
      answer: "No. These are subscription dollars only. Stores buy the glasses, $249 to $449 from Meta, and we don’t count that as our revenue.",
    },
  ],
};

const legalCategory = useOfFunds.categories[useOfFunds.categories.length - 1];

const fundsRowFact = (category: (typeof useOfFunds.categories)[number]): Fact => ({
  figure: wholeDollars.format(category.fromRaise),
  claim: `The part of the raise that goes to ${category.name.toLowerCase()} over 2027 and 2028. ${category.detail}.`,
  status: "estimate",
  source: "proForma",
  derivation: `The plan spends ${wholeDollars.format(category.planSpending)} on this over two years. Because store revenue pays for ${Math.round((useOfFunds.storeRevenue / useOfFunds.planSpending) * 100)}% of all spending, the raise covers the same share of every category: ${wholeDollars.format(category.planSpending)} × ${wholeDollars.format(useOfFunds.raiseSpent)} ÷ ${wholeDollars.format(useOfFunds.planSpending)} = ${wholeDollars.format(category.fromRaise)}.`,
});

const useOfFundsFacts: SlideFacts = {
  checkedOn: "October 27, 2026",
  summary: "This slide shows where our $1 million pre-seed raise goes over 24 months. Every number comes from our own pro forma spreadsheet and is a team estimate. The model uses the same $149 monthly price as the market slide.",
  facts: [
    {
      figure: wholeDollars.format(useOfFunds.raiseAmount),
      claim: "The pre-seed raise, which pays for January 2027 to December 2028.",
      status: "estimate",
      source: "proForma",
      caveat: "The amount is our input to the model, not a raise we’ve started.",
    },
    ...useOfFunds.categories.map(fundsRowFact),
    {
      figure: wholeDollars.format(useOfFunds.reserve.fromRaise),
      claim: "The reserve: the part of the raise the plan doesn’t spend by the end of 2028.",
      status: "estimate",
      source: "proForma",
      derivation: `${wholeDollars.format(useOfFunds.raiseAmount)} − ${wholeDollars.format(useOfFunds.raiseSpent)} spent = ${wholeDollars.format(useOfFunds.reserve.fromRaise)}. That covers ${useOfFunds.reserveMonths} months of the plan’s 2028 spending.`,
    },
    {
      figure: "450",
      claim: "Paying stores at the end of 2028.",
      status: "estimate",
      source: "proForma",
      caveat: "Store sign-ups are the model’s biggest assumption. We haven’t sold to a store yet, and the owner interviews come first.",
    },
    {
      figure: "$804,600",
      claim: "Yearly recurring revenue at the end of 2028.",
      status: "estimate",
      source: "proForma",
      derivation: `450 stores × ${monthlyPrice} a month × 12 = $804,600.`,
    },
  ],
  questions: [
    {
      question: "Why does the plan spend more than you’re raising?",
      answer: `The plan spends ${wholeDollars.format(useOfFunds.planSpending)} over two years. Stores pay ${wholeDollars.format(useOfFunds.storeRevenue)} of it in subscriptions. The raise only has to cover the other ${wholeDollars.format(useOfFunds.raiseSpent)}.`,
    },
    {
      question: "What happens if stores sign up slower than planned?",
      answer: `The ${wholeDollars.format(useOfFunds.reserve.fromRaise)} reserve covers about ${useOfFunds.reserveMonths} months of 2028 spending. Because hiring for sales and engineering is the biggest cost, we’d slow those hires before cutting anything else.`,
    },
    {
      question: "What does a hire cost in the model?",
      answer: "$10,000 a month each, which is about $120,000 a year including payroll taxes and benefits. Winning each new store costs $350 in marketing: flyers, local ads, demo visits and referral credits.",
    },
    {
      question: "Why does legal get its own line?",
      answer: `Because glasses record audio and video in a store, a lawyer has to review our recording and consent plan before any pilot. That review, incorporation and insurance cost ${wholeDollars.format(legalCategory.planSpending)} over two years.`,
    },
  ],
};

const mindMapFacts: SlideFacts = {
  summary: "This slide shows our team’s Figma board. It starts from the UN Sustainable Development Goals, branches into the industries we looked at, converges on high employee turnover as the shared problem, and ends at AI glasses as the idea. Click the board or the button to open it full size.",
  facts: [
    {
      figure: "5 industries",
      claim: "Healthcare, fast food, retail, restaurants and construction, which all showed staff shortages or high turnover on our board.",
      status: "estimate",
      caveat: "These are the team’s brainstormed problems, not researched findings. Slide 2 has the data for retail and restaurants.",
    },
    {
      figure: "Overlap",
      claim: "The board’s key insight is the overlap between unrelated industries: all of them struggle to train people when turnover is high and workers are overworked.",
      status: "estimate",
      caveat: "It’s the question that led us to the product: “How can we train employees when the turnover rate is so high and workers are overworked?”",
    },
  ],
  questions: [
    {
      question: "Why did you start from the UN Sustainable Development Goals?",
      answer: "It gave us a structured way to scan for big problems before picking one. Industry, innovation and infrastructure got the most votes on our board, and looking at industries under it showed the same turnover problem in very different businesses.",
    },
    {
      question: "Why didn’t you pick education?",
      answer: "We explored it on the board, but the space already has many established tools like Khan Academy, Duolingo and Canvas. Frontline training in small businesses had a clearer gap.",
    },
    {
      question: "What are you doing next?",
      answer: "Interview five owners, test capture during one real shift, and redraw the strategy canvas with the owners’ own scores. The board lists some first contacts: family members, a village store and managers at local fast food chains.",
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

const definitionFacts: SlideFacts = {
  checkedOn: "October 14, 2026",
  summary: "This slide defines the product before the competitive analysis starts: what Understudy is, who it’s for and the problem it solves. Its one number comes from the Bureau of Labor Statistics.",
  facts: [
    {
      figure: "46%",
      claim: "Separations in US retail added up to about 46% of jobs in 2025.",
      status: "verified",
      derivation: "BLS reports a 3.8% average monthly separations rate for retail in 2025, and 3.8% × 12 months ≈ 46%.",
      source: "blsJolts",
      caveat: "Separations count every departure, so one job that turns over twice counts twice. Don’t say 46% of workers quit.",
    },
    {
      figure: "Coaching example",
      claim: "The oat milk question and answer show the kind of exchange the glasses would have.",
      status: "illustrative",
    },
  ],
  questions: [
    {
      question: "Is it a hardware product?",
      answer: "No. We use off-the-shelf AI glasses, like Meta’s $249 to $449 models or open platforms like Mentra’s. Understudy is the software that learns the store and coaches the new hire.",
    },
    {
      question: "Why independent grocers, franchisees and local restaurants?",
      answer: "They have the highest turnover, no training department and no budget for VR or enterprise software. The training industry’s main survey doesn’t even count businesses with fewer than 100 employees.",
    },
  ],
};

const swotFacts: SlideFacts = {
  checkedOn: "October 14, 2026",
  summary: "The top row is internal (our product and team) and the bottom row is external (market, competitors and regulation), following the lecture’s definitions. Every number was checked against its source. Items without a number describe our own design and stage.",
  facts: [
    {
      figure: "34%",
      claim: "A generative AI assistant raised issues resolved per hour by 14% on average, and by 34% for novice and low-skilled support agents.",
      status: "verified",
      source: "nberAiAssistant",
      quote: "including a 34% improvement for novice and low-skilled workers",
      caveat: "It’s a study of 5,179 customer support agents, not store workers. The authors give suggestive evidence that the AI “disseminates the best practices of more able workers,” which is the idea behind Understudy.",
    },
    {
      figure: "$249 to $449",
      claim: "Meta’s AI glasses prices, compared with HoloLens 2’s $3,500 launch price.",
      status: "verified",
      source: "metaGlassesPrices",
      quote: "Ray-Ban Meta (Gen 3) is available today, with prices starting at $449 USD.",
      caveat: "The $3,500 is HoloLens 2’s 2019 launch price (TechCrunch, May 2019), and HoloLens 2 is discontinued.",
    },
    {
      figure: "Rivals sell to big companies",
      claim: "Strivr, the glasses-based rival closest to us, describes its platform as built for enterprise operations.",
      status: "verified",
      source: "strivrRetail",
      quote: "Built for enterprise operations",
    },
    {
      figure: "59%",
      claim: "On the EgoIllusion benchmark of 1,400 first-person videos and 8,000 questions, strong models like GPT-4o and Gemini reached only 59% accuracy.",
      status: "verified",
      source: "egoIllusion",
      quote: "powerful models like GPT-4o and Gemini, achieving only 59% accuracy",
      caveat: "The benchmark was built to provoke mistakes, so routine tasks may go better. That’s why v1 checks only a few well-defined tasks.",
    },
    {
      figure: "72%",
      claim: "Americans who worry about being secretly recorded by camera-equipped wearables.",
      status: "verified",
      source: "wearableSurvey",
      caveat: "It’s one survey of about 1,000 US adults.",
    },
    {
      figure: "46%",
      claim: "Retail separations in 2025 as a share of jobs.",
      status: "verified",
      derivation: "3.8% average monthly separations rate × 12 months ≈ 46%.",
      source: "blsJolts",
    },
    {
      figure: "100+ staff",
      claim: "Training Magazine’s annual industry report only includes organizations with 100 or more employees.",
      status: "verified",
      source: "trainingIndustryReport",
      quote: "Only U.S.-based corporations and educational institutions with 100 or more employees were included in the analysis.",
    },
    {
      figure: "Camera and audio",
      claim: "Meta’s Wearables Device Access Toolkit lets outside developers use its glasses’ camera and audio, with public publishing promised for 2026.",
      status: "verified",
      source: "metaDeviceToolkit",
      quote: "Developers can start accessing the camera and audio functionality of our growing portfolio of AI glasses.",
      caveat: "Meta said general publishing would open in 2026. As of late September 2026, trade press reported it still wasn’t open, so check before presenting.",
    },
    {
      figure: "13.6M",
      claim: "IDC’s 2026 forecast for display-less smart glasses shipments.",
      status: "verified",
      source: "idcBlog",
    },
    {
      figure: "Any time",
      claim: "Meta’s Wearables Developer Terms let Meta end a developer’s license at any time.",
      status: "verified",
      source: "metaWearablesTerms",
      quote: "Meta reserves the right to terminate the License at any time, in our sole discretion, without notice to you",
      caveat: "Mentra’s open-source SDK is our fallback platform, so we aren’t locked into Meta.",
    },
    {
      figure: "Early access",
      claim: "Strivr’s Frontline Intelligence coaches retail associates by voice through smart glasses, including Ray-Ban Meta.",
      status: "verified",
      source: "strivrRetail",
      quote: "delivers voice-based, audio guidance via the built-in speakers on your workers’ smart glasses",
    },
    {
      figure: "900,000+",
      claim: "Weekly users of Walmart’s in-house AI assistant for associates, which Walmart is upgrading to turn process guides into step-by-step instructions.",
      status: "verified",
      source: "walmartAssociateAi",
      quote: "With more than 900,000 weekly users and over 3 million queries per day",
    },
    {
      figure: "July 1, 2027",
      claim: "California’s No Robo Bosses Act (SB 947) takes effect. Employers can’t discipline or fire workers based only on an automated decision system and must tell workers when they use one.",
      status: "verified",
      source: "noRoboBosses",
      caveat: "This is a secondary source. Our mistake flags go to the owner as coaching information, never as automatic discipline.",
    },
  ],
  background: [
    {
      figure: "$9M",
      claim: "Opus Training raised a Series B for AI training aimed at multi-unit restaurant, retail and fitness brands.",
      status: "verified",
      source: "opusSeriesB",
      quote: "Opus will use $9 million in funding to accelerate product innovation and go-to-market efforts.",
    },
    {
      figure: "SB 1130 vetoed",
      claim: "California’s governor vetoed the bill that would have penalized secret recording with smart glasses, saying its definition was too broad.",
      status: "verified",
      source: "noRoboBosses",
      caveat: "California’s two-party consent law for recording private conversations still applies.",
    },
  ],
  questions: [
    {
      question: "Isn’t depending on Meta a weakness, not a threat?",
      answer: "Building on someone else’s hardware is our choice, so the dependency is internal. What Meta decides to do with its developer terms is outside our control, which is why it sits under threats. Our answer is that we can also run on Mentra’s open-source platform.",
    },
    {
      question: "What stops Strivr from coming down to small stores?",
      answer: "Nothing permanent. Today Strivr captures footage and trains a model for each company with its own team, which only pays off for big customers. We start with a scrappier, self-serve product for small businesses and grow from there.",
    },
    {
      question: "Won’t the AI make mistakes?",
      answer: "Yes, sometimes. That’s why version one focuses on a procedure library, voice guidance and Q&A, and checks for mistakes on only a few well-defined tasks.",
    },
  ],
};

const competitorMapFacts: SlideFacts = {
  checkedOn: "October 14, 2026",
  summary: "This 2x2 shows who offers on-the-job coaching and who they sell to. Positions are our judgment from each company’s own website. Each logo links to that site.",
  facts: [
    {
      figure: "Positions",
      claim: "Where each company sits on the map.",
      status: "estimate",
      caveat: "Placement is our reading of each company’s website. Left to right reflects how close the product gets to the real task. Bottom to top reflects who the company says it sells to.",
    },
    {
      figure: "Strivr",
      claim: "Strivr moved from VR training to an early-access smart-glasses product for retail and restaurants, and says its platform is built for enterprise operations.",
      status: "verified",
      source: "strivrRetail",
      quote: "Built for enterprise operations",
    },
    {
      figure: "Opus",
      claim: "Opus trains restaurant and multi-unit teams on phones and is typically priced per location.",
      status: "verified",
      source: "opusPricing",
      quote: "Opus is typically priced per location.",
    },
    {
      figure: "Trainual",
      claim: "Trainual is a training app for small and mid-size companies.",
      status: "verified",
      source: "trainualPricing",
      quote: "Trainual is best suited for companies with 25 - 1000 employees.",
    },
    {
      figure: "Connecteam",
      claim: "Connecteam’s small-business plan is free for small teams, and its training runs as phone courses.",
      status: "verified",
      source: "connecteamPricing",
      quote: "entirely free for up to 10 users",
    },
    {
      figure: "Factories and labs",
      claim: "Augmentir, Retrocausal and VITURE Helix offer on-the-job guidance for industrial, lab and clinical work.",
      status: "verified",
      source: "viture",
      caveat: "Retrocausal uses fixed cameras at a workstation, not glasses. VITURE Helix ships in Q1 2027.",
    },
  ],
  questions: [
    {
      question: "Why isn’t Meta on the map?",
      answer: "Meta makes the glasses we build on. Its Meta AI assistant answers general questions, but it doesn’t know a store’s procedures, track new hires or sell to businesses yet. We list Meta’s control of its platform as a threat on the SWOT.",
    },
    {
      question: "Where would shadowing go?",
      answer: "Shadowing is on the job and works in small stores, but it isn’t a product. It costs the best employee’s time, which is the problem we solve, so it’s a column on the comparison chart instead.",
    },
  ],
};

const comparisonFacts: SlideFacts = {
  checkedOn: "October 14, 2026",
  summary: "Each competitor’s column comes from its own website, read in October 2026. Shadowing’s column is our team’s judgment. Our own column describes the product we plan to build.",
  facts: [
    {
      figure: "Top row",
      claim: "No one else offers hands-free coaching for small stores without a coworker beside the new hire.",
      status: "estimate",
      caveat: "The hands-free tools (Strivr, VITURE Helix, Augmentir on RealWear) sell to enterprises or factories. Shadowing is hands-free and works in small stores but needs a coworker. Our search was limited to public websites.",
    },
    {
      figure: "Half circle",
      claim: "We rate our own mistake catching as partial, because v1 only checks a few well-defined tasks.",
      status: "estimate",
    },
    {
      figure: "Free",
      claim: "Connecteam is the only product we found with public, self-serve small-business pricing.",
      status: "verified",
      source: "connecteamPricing",
      quote: "entirely free for up to 10 users",
    },
    {
      figure: "Strivr",
      claim: "Strivr detects mistakes in real time and guides associates by voice through smart glasses, which is why it scores well on the middle rows.",
      status: "verified",
      source: "strivrRetail",
      quote: "delivers voice-based, audio guidance via the built-in speakers on your workers’ smart glasses",
    },
  ],
  questions: [
    {
      question: "Why does shadowing score so well?",
      answer: "Because it really is good at learning on the job. Its problem is cost: it pulls the best employee off the floor for every new hire, and nothing gets recorded or tracked. Understudy keeps what works about shadowing without the coworker standing there.",
    },
    {
      question: "Did you leave out competitors?",
      answer: "We left out Airwave, which captures field technicians’ work for reports, and NSF EyeSucceed, a 2019 smart-glasses training program for foodservice that ran on Google Glass Enterprise, which Google stopped selling in 2023. We couldn’t confirm EyeSucceed is still sold.",
    },
  ],
};

const valuePropositionFacts: SlideFacts = {
  checkedOn: "October 14, 2026",
  summary: "Our written value proposition follows Geoffrey Moore’s template from Crossing the Chasm. The alternative we name comes from the comparison chart, and our differentiation matches the two axes of the competitive landscape.",
  facts: [],
  background: [
    {
      figure: "Full statement",
      claim: valueProposition.parts.map((part) => `${part.templateWord} ${part.fill}`).join(" "),
      status: "estimate",
      source: "mooreChasm",
      caveat: "The grant deck shows only the For, Understudy and Unlike lines. This is the whole statement.",
    },
  ],
  questions: [
    {
      question: "Why shadowing as the main alternative?",
      answer: "It’s what most small stores do today. It’s a column on our comparison chart, and it’s the method that costs the owner their best employee’s time.",
    },
    {
      question: "How does this connect to the landscape?",
      answer: "The landscape’s axes are on the job versus off the job and small businesses versus large enterprises. Our differentiation says we coach on the floor and that we learn each small store from its own best employee.",
    },
  ],
};

const visualValuePropositionFacts: SlideFacts = {
  checkedOn: "October 14, 2026",
  summary: "This page shows the value proposition as one scene: the same store with and without Understudy. The people, the dialogue and Maya’s checklist are illustrations, not data.",
  background: [
    {
      figure: "Scene description",
      claim: visualValueProposition.description,
      status: "illustrative",
      caveat: "The grant deck leaves this description off the slide and keeps the scene.",
    },
  ],
  facts: [
    {
      figure: "$249 to $449",
      claim: "The price range of Meta’s AI glasses.",
      status: "verified",
      source: "metaGlassesPrices",
      quote: "Ray-Ban Meta (Gen 3) is available today, with prices starting at $449 USD.",
      caveat: "Prices change quickly. Check again the week you present.",
    },
    {
      figure: "Scene and checklist",
      claim: "The store, the coaching exchange and Maya’s week 1 checklist.",
      status: "illustrative",
    },
  ],
  questions: [
    {
      question: "Why only two callouts on the left?",
      answer: "Following Librande’s one-page design, the scene carries most of the message. The callouts mark the two costs owners feel: the best employee stops working, and customers wait.",
    },
  ],
};

const customerProfileFacts: SlideFacts = {
  checkedOn: "November 2, 2026",
  summary: "This slide shows who buys Understudy, using the customer profile half of the value proposition canvas: the owner’s jobs, pains and gains. The jobs, pains and gains come from the Users section of our PRD, where we listed what each person needs and fears. We haven’t interviewed owners yet, so they’re our team’s judgment.",
  facts: [
    {
      figure: "Fewer than 100 employees",
      claim: "Where we draw the line for small businesses, the same line as our serviceable market.",
      status: "verified",
      source: "trainingIndustryReport",
      caveat: "Training Magazine’s annual industry report only counts organizations with 100 or more employees, so businesses below that line are the training industry’s noncustomers.",
    },
    {
      figure: "Jobs, pains and gains",
      claim: "The job is training every new hire. The pain is the best employee stopping work to do it. The gain is hires who are ready fast.",
      status: "estimate",
      caveat: "From the owner row of the Users table in our PRD. We’ll update them with what the owners and store manager at Talin Market tell us.",
    },
  ],
  questions: [
    {
      question: "Did you talk to any owners?",
      answer: "At one store so far. We interviewed the owners and store manager at Talin Market. The rest of the profile comes from our research and the PRD.",
    },
    {
      question: "Don’t owners worry about recording laws?",
      answer: "The glasses record audio and video in a store. California is one of 11 states that require every party’s consent to record a conversation, so owners worry about getting it wrong. That’s why our plan pays for a lawyer’s review before any pilot.",
    },
  ],
};

const yearRevenueFact = (year: ProFormaYear): Fact => ({
  figure: `${count(year.payingStores)} stores`,
  claim: `Paying stores at the end of ${year.year}, which bring in ${wholeDollars.format(year.revenue)} of revenue that year.`,
  status: "estimate",
  source: "proForma",
  derivation: `Revenue adds up each month’s paying stores × ${monthlyPrice}, so it’s lower than year-end stores × ${yearlyPrice}.`,
});

const yearProfitFact = (year: ProFormaYear): Fact => ({
  figure: `${year.year}`,
  claim: `Revenue of ${wholeDollars.format(year.revenue)} against spending of ${wholeDollars.format(year.spending)}, for EBITDA of ${wholeDollars.format(year.ebitda)}.`,
  status: "estimate",
  source: "proForma",
  derivation: "Spending is the sheet’s total cost of goods sold plus total SG&A for the year.",
});

const proFormaRevenueFacts: SlideFacts = {
  checkedOn: "November 2, 2026",
  summary: "This slide shows how many stores pay for Understudy each year and the revenue they bring in. Every number comes from our pro forma spreadsheet and is a team estimate. The price matches the market slide.",
  facts: [
    ...proFormaRevenue.years.map(yearRevenueFact),
    {
      figure: `${monthlyPrice} a month`,
      claim: "Our price per store.",
      status: "estimate",
      source: "sevenShiftsTraining",
      quote: "Standalone LMS tools charge $100–$200/month per location",
      derivation: `${yearlyPrice} a year is less than the $2,305 it costs to replace one hourly restaurant worker (Black Box Intelligence, 2024).`,
      caveat: "We haven’t tested the price with owners yet.",
    },
    {
      figure: "1,305 stores",
      claim: "Our 3-year SOM: 1% of California’s 130,536 small-business store, restaurant and bar locations. The plan reaches it at the end of 2029.",
      status: "estimate",
      source: "censusSusb",
    },
    {
      figure: "Jan to Mar 2027",
      claim: "Free pilots. The first 5 paying stores start in April, and the plan adds 5 to 15 a month after that.",
      status: "estimate",
      source: "proForma",
    },
  ],
  questions: [
    {
      question: "Does the store count include churn?",
      answer: "The sheet counts net new stores, after churn, but it doesn’t set a churn rate on its own line. That’s something we’ll add once pilots show how long stores stay.",
    },
    {
      question: "Do stores pay for the glasses?",
      answer: "Yes. Stores buy their own glasses, $249 to $449 from Meta, and that isn’t in our revenue. Our only revenue is the subscription.",
    },
  ],
};

const proFormaCostsFacts: SlideFacts = {
  checkedOn: "November 2, 2026",
  summary: "This slide compares revenue with spending each year and shows the profit or loss. Every number comes from our pro forma spreadsheet and is a team estimate.",
  facts: [
    ...proFormaRevenue.years.map(yearProfitFact),
    {
      figure: "$18, $8 and 3%",
      claim: "What each store costs us a month: AI processing and hosting, customer support, and card fees. Processing a new store’s capture week costs $30 once.",
      status: "estimate",
      source: "proForma",
      caveat: "We’ll check the AI cost against real API bills during pilots.",
    },
    {
      figure: "75%",
      claim: "Gross margin in 2027, rising to 78% by 2030.",
      status: "estimate",
      source: "proForma",
    },
    {
      figure: "$10,000 a month",
      claim: "What each engineering or sales hire costs, about $120,000 a year including payroll taxes and benefits.",
      status: "estimate",
      source: "proForma",
    },
    {
      figure: "$1,500 a month",
      claim: "Each founder’s stipend from January to June 2027. It rises to $3,000 in July 2027, then $5,000, $7,000 and $8,500 a month in 2028 to 2030.",
      status: "estimate",
      source: "proForma",
    },
    {
      figure: "$350",
      claim: "Marketing to win each new store: flyers, local ads, demo visits and referral credits.",
      status: "estimate",
      source: "proForma",
      caveat: "That’s marketing only. Sales hires are a separate line.",
    },
  ],
  questions: [
    {
      question: "Does the $1 million raise get you to profit?",
      answer: "No. The plan uses $806,392 by the end of 2028 and $1,347,171 by the end of 2029, so we’d raise a second round of at least about $350,000 in 2029. The first raise is meant to get us to 450 paying stores, which is the traction that round needs.",
    },
    {
      question: "How fast does a store pay back its marketing?",
      answer: "Each store brings in about $118 a month after AI, support and card fees, so its $350 of marketing is paid back in about three months. Counting sales salaries, it takes longer.",
    },
  ],
};

const talinStoryFacts: SlideFacts = {
  checkedOn: "November 2, 2026",
  summary: "This slide opens the pitch with one real store, Talin Market in Albuquerque, which Alexis’s parents run. The second beat shows that Talin trains new hires the way most small employers do.",
  facts: [
    {
      figure: "Largest in New Mexico",
      claim: "Edible New Mexico calls Talin Market the state’s largest international grocer. The presenter says it, and the slide doesn’t show it.",
      status: "verified",
      source: "edibleTalin",
      quote: "now manages Talin Market, New Mexico’s largest international grocer",
      caveat: "It’s a magazine’s description from 2020, not a measured ranking. The article names Victor Limary as Talin’s director of operations.",
    },
    {
      figure: String(talinStory.hires.count),
      claim: "New hires Talin Market made last year. The slide draws one figure for each.",
      status: "ownerReported",
      source: "talinInterviews",
      caveat: "Talin’s owners, Alexis’s parents, told us this in our interviews. It’s their count, not a figure from Talin’s hiring or payroll records.",
    },
    {
      figure: `${talinMarket.hiresWhoStayed} of ${talinMarket.hiresLastYear}`,
      claim: "How many of the people Talin hired last year still work there. The grant deck’s headlines say it.",
      status: "ownerReported",
      source: "talinInterviews",
      caveat: "Talin’s owners told us this in our interviews. It’s their count, not a figure from Talin’s records.",
    },
    {
      figure: "Pulls someone off the floor",
      claim: "Talin trains every new hire by taking someone off their own work to show them, which is what the headline and drawing say.",
      status: "unconfirmed",
      caveat: "Confirm this with Alexis’s parents before the pitch. If they train some other way, rewrite the headline to say what actually happens.",
    },
    {
      figure: `${talinStory.scale.value}%`,
      claim: "Small employers (5 to 250 employees) who train their most common hires most often do it by having someone in the business work with them.",
      status: "verified",
      source: "nfibTraining",
      quote: "the most frequent method of training them is to have someone in the firm work with them",
      caveat: "It’s a 2005 poll, so the slide labels the year. The 76% comes from the 382 employers in it who expect new hires to learn at least partly on the job. The grid is a picture of the percentage, not of 100 surveyed businesses.",
    },
  ],
  questions: [
    {
      question: "Isn’t this just one store?",
      answer: "That’s why the next beat is there. Talin trains the way 76% of small employers do, and the next slide shows how often they have to do it: separations equaled 46% of retail jobs in 2025.",
    },
    {
      question: "Why use a teammate’s family business?",
      answer: "Because we can see the problem up close and ask follow-up questions. The national numbers on the next beat show Talin isn’t an outlier.",
    },
  ],
};

const closingFacts: SlideFacts = {
  summary: "The closing slide repeats our name and asks the audience to join us. It has no figures to back up.",
  facts: [],
  questions: [],
};

const tractionFacts: SlideFacts = {
  checkedOn: "November 9, 2026",
  summary: "This slide reports what we learned by interviewing the owners and store manager at Talin Market in 2026. The figures are their own estimates, not measurements or numbers from Talin’s records.",
  facts: [
    {
      figure: "3",
      claim: "Interviews: Talin Market’s two owners and its store manager.",
      status: "verified",
      source: "talinInterviews",
    },
    {
      figure: "10 to 20 min",
      claim: "How long the store manager estimates it takes a new stocker to find where an item goes. Experienced staff take seconds, by the same estimate.",
      status: "intervieweeEstimate",
      source: "talinInterviews",
      caveat: "The store manager’s estimate from our interview. We haven’t timed it.",
    },
    {
      figure: "~Half",
      claim: "The share of new hires who don’t make it through onboarding, as an owner estimates it.",
      status: "intervieweeEstimate",
      source: "talinInterviews",
      caveat: "An owner’s estimate from our interview, not a count from Talin’s records.",
    },
    {
      figure: "Produce ID",
      claim: "The skill our interviewees named as the hardest for new hires to learn.",
      status: "ownerReported",
      source: "talinInterviews",
    },
    {
      figure: "Coaching in the moment",
      claim: "What our interviewees asked for instead of more training videos.",
      status: "ownerReported",
      source: "talinInterviews",
    },
  ],
  questions: [
    {
      question: "Is this more than one store?",
      answer: "No. We interviewed the owners and store manager at Talin Market only. The national surveys earlier in the deck show that Talin trains new hires the way most small employers do.",
    },
    {
      question: "Did you measure the 10 to 20 minutes?",
      answer: "No. It’s the store manager’s estimate. Timing it is part of the test the grant pays for.",
    },
  ],
};

const useCaseFact = (card: (typeof useCases.cards)[number]): Fact => ({
  figure: card.caption,
  claim: `A task the owners and store manager at Talin Market want new hires coached on in real time. The photo shows: ${card.photo.alt.charAt(0).toLowerCase()}${card.photo.alt.slice(1)}.`,
  status: "ownerReported",
  source: "talinInterviews",
});

const useCasesFacts: SlideFacts = {
  checkedOn: "November 9, 2026",
  summary: "This slide shows four tasks that the owners and store manager at Talin Market told us they want coached in real time. The tasks come from our interviews, and the photos were taken at Talin Market.",
  facts: [
    ...useCases.cards.map(useCaseFact),
    {
      figure: "4 photos",
      claim: "Each card’s photo was taken at Talin Market.",
      status: "verified",
      source: "talinPhotos",
    },
  ],
  questions: [
    {
      question: "Do other stores want these tasks coached?",
      answer: "We don’t know yet. These four come from the owners and store manager at Talin Market only.",
    },
  ],
};

const grantItemFact = (item: (typeof grantFunds.lineItems)[number]): Fact => ({
  figure: wholeDollars.format(item.amount),
  claim: `${item.name}: ${item.covers.charAt(0).toLowerCase()}${item.covers.slice(1)}.`,
  status: "estimate",
  caveat: "Our estimate, not a quote. Back it with a quote, a price page or our own past spending, and add that source here.",
});

const grantFundsFacts: SlideFacts = {
  checkedOn: "November 9, 2026",
  summary: `This slide shows how we’ll spend a ${wholeDollars.format(grantFunds.amount)} grant to build a voice coach and test it at Talin Market. It replaces the $1 million use of funds from the final pitch. Every line item is a team estimate, pending mentor approval.`,
  facts: [
    {
      figure: wholeDollars.format(grantFunds.amount),
      claim: "The grant amount we’re asking for.",
      status: "estimate",
      caveat: "It’s the amount we chose to request, not a measured figure.",
    },
    ...grantFunds.lineItems.map(grantItemFact),
    {
      figure: "About 70 hours",
      claim: "The developer or AI help we expect the build to take.",
      status: "estimate",
      caveat: "Our estimate of the work, not a quote from a developer.",
    },
  ],
  questions: [
    {
      question: "Who are you hiring?",
      answer: grantFunds.talent.role,
    },
    {
      question: "What will they build?",
      answer: grantFunds.talent.build,
    },
    {
      question: "What do you get at the end?",
      answer: grantFunds.talent.deliverable,
    },
    {
      question: "How will you test it?",
      answer: grantFunds.talent.test,
    },
    {
      question: "How will you know it worked?",
      answer: `We’ll measure three things at Talin Market: ${grantFunds.metrics.map((metric) => metric.charAt(0).toLowerCase() + metric.slice(1)).join("; ")}.`,
    },
    {
      question: "How does this fit with the pro forma in the appendix?",
      answer: "The pro forma models our full plan through 2030, which assumed a larger raise later. The grant pays for the first step on its own.",
    },
  ],
};

const formFactorsFacts: SlideFacts = {
  checkedOn: "November 9, 2026",
  summary: "This slide shows three ways we could deliver the same voice coach. They’re options we plan to test at Talin Market, not products we’ve built.",
  facts: [
    {
      figure: "3 options",
      claim: "Smart glasses, a walkie-talkie add-on, and a small clip-on mic and speaker.",
      status: "estimate",
      caveat: "Our plan. We haven’t tested any of them with new hires yet.",
    },
    {
      figure: "$249 to $449",
      claim: "The price range of Meta’s AI glasses, the smart glasses option.",
      status: "verified",
      source: "metaGlassesPrices",
      quote: "Ray-Ban Meta (Gen 3) is available today, with prices starting at $449 USD.",
      caveat: "Prices change quickly. Check again before we submit.",
    },
  ],
  questions: [
    {
      question: "Why not just glasses?",
      answer: "Glasses add a camera, but we don’t know yet which device new hires will actually wear on a shift. The test at Talin Market will tell us.",
    },
  ],
};

export const factsBySlide: Record<string, SlideFacts> = {
  closing: closingFacts,
  definition: definitionFacts,
  swot: swotFacts,
  "competitor-map": competitorMapFacts,
  comparison: comparisonFacts,
  "value-proposition": valuePropositionFacts,
  "visual-value-proposition": visualValuePropositionFacts,
  title,
  challenge,
  drivers,
  solution,
  canvas: canvasFacts,
  landscape,
  market: marketFacts,
  "use-of-funds": useOfFundsFacts,
  "customer-profile": customerProfileFacts,
  "talin-story": talinStoryFacts,
  "pro-forma-revenue": proFormaRevenueFacts,
  "pro-forma-costs": proFormaCostsFacts,
  "mind-map": mindMapFacts,
  sources: sourcesFacts,
  traction: tractionFacts,
  "use-cases": useCasesFacts,
  "grant-funds": grantFundsFacts,
  "form-factors": formFactorsFacts,
};

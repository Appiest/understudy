// Each slide's script is a list of paragraphs, one per beat. Wrap each paragraph in straight double quotes and end it with a comma.
// Inside a paragraph, use curly quotes (“like this”) and apostrophes (’) so the straight quotes still mark where it starts and ends.
import { team } from "./config";
import { valueProposition } from "./content";

const valuePropositionStatement = valueProposition.parts.map((part) => `${part.templateWord} ${part.fill}`).join(" ");

const [brendan, alex, alexis, oli] = team.teamMembers;

// Who presents which slides. Swap the names or move the slide numbers to change who says what.
export const speakerSections = [
  { speaker: brendan, firstSlide: 1, lastSlide: 1 },
  { speaker: alexis, firstSlide: 2, lastSlide: 2 },
  { speaker: brendan, firstSlide: 3, lastSlide: 5 },
  { speaker: alex, firstSlide: 6, lastSlide: 9 },
  { speaker: alexis, firstSlide: 10, lastSlide: 11 },
  { speaker: oli, firstSlide: 12, lastSlide: 13 },
];

export const pitchScript = {
  title: [
    "Hi, we’re Group 15: Brendan, Alex, Alexis and Oli. This is Understudy, AI glasses that coach new hires by voice during real shifts. Our vision is to put your best employee in every new hire’s ear.",
  ],
  talinStory: [
    "My parents run Talin Market in Albuquerque, New Mexico’s largest international grocer. Last year they hired [TALIN NEW HIRES LAST YEAR] new people, out of a staff of [TALIN STAFF COUNT]. Every time, [WHO TRAINS NEW HIRES AT TALIN] stops working to train them. It takes about [DAYS UNTIL A TALIN HIRE WORKS ALONE] days before a new hire can work alone. Meanwhile, customers wait at the register.",
    "Talin isn’t the exception. In a national survey, 76 percent of small employers said they train new hires the same way.",
  ],
  challenge: [
    "And they have to do it constantly. In 2025, 46 percent of retail jobs and 66 percent of restaurant and hotel jobs turned over, according to the Bureau of Labor Statistics.",
    "A 2017 estimate puts the cost of replacing one part-time grocery worker at about 4,200 dollars. A typical independent grocer replaces 16 a year, which comes to 67,200 dollars per store.",
  ],
  canvas: [
    "Every other way to train a new hire costs owners senior staff time or custom content. Understudy needs almost none of either. What it does far better is learn the store’s own know-how during real shifts.",
  ],
  customerProfile: [
    "Our customers are owners like Alexis’s parents. They run groceries, franchises and restaurants with fewer than 100 employees and no training team. They want new hires ready fast without losing their best employee.",
  ],
  visualValueProposition: [
    "With Understudy, the new hire asks, “Where does the oat milk go?” The glasses answer, “Second shelf, left of the almond milk.” The best employee never leaves the register. After one week, the owner can see that the new hire, Maya, can already do three of four tasks alone.",
  ],
  solution: [
    "Here’s how it works. First, the store’s best employee wears the glasses for about a week of normal shifts, with nothing extra to do.",
    "Our AI turns that footage into a playbook for that one store, covering its layout, its register and its house rules.",
    "Then new hires wear the glasses and get coached by voice. The glasses also catch missed steps, like a fridge temperature nobody logged. Everything runs on off-the-shelf glasses that cost 249 to 449 dollars, so we never build hardware.",
  ],
  valueProposition: [
    valuePropositionStatement,
  ],
  market: [
    "We count locations because we charge per store. At 149 dollars a month, our total market is the 1.66 million US stores and restaurants with employees, worth 3 billion dollars a year. Our serviceable market is the 1.13 million owned by businesses under 100 employees, worth about 2 billion. Our obtainable market is 1 percent of California’s small locations within three years, which is 1,305 stores and 2.3 million dollars a year.",
  ],
  competitorMap: [
    "On-the-job AI coaching already exists, but only for big companies. Strivr has an early-access smart glasses product built for enterprise retail. Small businesses only get apps like Trainual and Connecteam, which train people away from the floor. We expect bigger players to chase large enterprises first. That gives us time to win small stores with a scrappier product and grow from there.",
  ],
  proFormaRevenue: [
    "Our 149 dollar price sits in the middle of the 100 to 200 dollars a month that training tools charge. A full year with us costs less than replacing one worker. After free pilots from January to March 2027, we add 5 to 15 paying stores a month to reach 90 by December. We grow to 450 stores in 2028, 1,305 in 2029 and 3,000 in 2030, when revenue reaches 3.8 million dollars.",
  ],
  proFormaCosts: [
    "Each store costs us about 18 dollars a month for AI, plus support and card fees, for a gross margin of about 75 percent. Most of our spending is people. We budget 10,000 dollars a month per hire, while the four of us start on 1,500 dollar stipends as we finish school. We lose about 236,000 dollars in 2027, 570,000 in 2028 and 541,000 in 2029. In 2030 we turn a profit of about 180,000 dollars.",
  ],
  useOfFunds: [
    "We’re raising 1 million dollars to cover 24 months, from January 2027 to December 2028. Winning stores gets the largest share, about 275,000 dollars. The 194,000 dollar reserve covers about four months of spending if stores sign up slower than we planned. By the end of 2028, that gets us to 450 paying stores and about 805,000 dollars a year in recurring revenue. We’ll take that traction into our next round, which carries us to profitability in 2030. Thank you!",
  ],
};

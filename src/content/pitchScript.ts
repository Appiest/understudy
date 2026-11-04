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
  { speaker: alexis, firstSlide: 10, lastSlide: 12 },
  { speaker: oli, firstSlide: 13, lastSlide: 15 },
];

export const pitchScript = {
  title: [
    "Hi, we’re Group 15: Brendan, Alex, Alexis and Oli. This is Understudy, AI glasses that coach new hires by voice during real shifts. Our vision is to put your best employee in every new hire’s ear.",
  ],
  talinStory: [
    "My parents run Talin Market in Albuquerque, New Mexico’s largest international grocer. Last year they hired 33 new people, and out of the 33 only two lasted. With a staff of 30 people Every time, [TALIN] stops working to train them. It takes about [DAYS UNTIL A TALIN HIRE WORKS ALONE] days before a new hire can work alone. Meanwhile, customers wait at the register.",
    "Talin isn’t the exception. In a national survey, 76 percent of small employers said they train new hires the same way.",
  ],
  challenge: [
    "And they have to do it constantly. In 2025, just under half of all retail jobs and over half of all restaurant and hotel jobs turned over.",
    "If replacing one part-time grocery worker costs around 4,200 dollars, and a typical independent grocer replaces 16 a year, that's over 67 thousand dollars spent per store annually.",
  ],
  canvas: [
    "Every other way to train a new hire requires staff time, costs a ton of money, or extensive custom content generation. Understudy needs almost none of that. We enable new hires to do the job immediately, and a TINY cost compared to the alternatives.",
  ],
  customerProfile: [
    "Our customers are owners like Alexis’s parents. They run groceries, franchises and restaurants with fewer than 100 employees and have no dedicated training team. They want new hires ready fast without having to pull their best employee from shifts or spending a ton of money on training content.",
  ],
    visualValueProposition: [
    "Same store, two days. Today, on the left, the best employee stops to train and the line backs up. With Understudy, the new hire asks, “Where does the oat milk go?” and hears, “Second shelf, left of the almond milk.” Nobody leaves their post. After one week, the owner can see Maya already does three of four tasks alone.",
  ],
  solution: [
    "Here’s how. Step one, capture: that employee wears the glasses for a week of normal shifts and does nothing extra.",
    "Step two, learn: our AI turns that week into a playbook for that one store. Where things go, how checkout works, the house rules, even the judgment calls.",
    "Step three, coach: new hires put them on and get guided by voice. They even catch skipped steps, like a fridge temperature nobody logged. And because we use off-the-shelf glasses that cost 249 to 449 dollars, we never build hardware.",
  ],
  valueProposition: [
    "In one line: owners get new hires trained on the job without pulling anyone off it. Shadowing ties up a coworker, and generic training apps don’t know your aisles. Understudy avoids both, so owners get ready hires without the trade-off.",
  ],
  market: [
    "We charge 149 dollars a month per location, so we size the market by location. 1.66 million US stores and restaurants have employees, about 3 billion dollars a year. The 1.13 million run by businesses under 100 people make up our 2 billion dollar serviceable market. We start in California: 1 percent of its small locations in three years is 1,305 stores and 2.3 million dollars a year, and that counts only the subscription, not the glasses. So why hasn’t anyone built this for them? Alexis.",
  ],
  competitorMap: [
    "On-the-job AI coaching already exists, but only for big companies. Strivr has an early-access smart glasses product built for enterprise retail. Small businesses only get apps like Trainual and Connecteam, which train people away from the floor. We expect bigger players to chase large enterprises first. That gives us time to win small stores with a scrappier product and grow from there.",
  ],
  comparison: [
    "Shadowing works in a small store, but it needs a coworker standing next to the new hire. Strivr and the factory tools coach hands-free, but they sell to large companies. Understudy is the only option that does both.",
  ],
  swot: [
    "Our biggest strength is that Understudy copies the store’s best worker, with no training content to write. Our biggest weakness is that AI still misreads first-person video, which is why version one checks only a few tasks. Constant turnover and Meta opening its glasses to outside apps give us our opening. The main threats are that Meta controls our platform and Strivr has already moved onto glasses.",
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

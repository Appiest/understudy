// Each slide's script is a list of paragraphs, one per beat. Wrap each paragraph in straight double quotes and end it with a comma.
// Inside a paragraph, use curly quotes (“like this”) and apostrophes (’) so the straight quotes still mark where it starts and ends.
import { team } from "./config";

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
    "Hi, we’re Group 15: Brendan, Alex, Alexis and Oli. This is Understudy, a pair of AI glasses that learns how a store’s best employee does the job. It then coaches every new hire by voice during real shifts. Our vision is to put your best employee in every new hire’s ear.",
  ],
  talinStory: [
    "My parents run Talin Market in Albuquerque, New Mexico’s largest international grocer. Last year they hired [TALIN NEW HIRES LAST YEAR] new people, out of a staff of [TALIN STAFF COUNT]. Every time, my parents or the store manager stops working to train them. It takes about 7-14 days before a new hire can work alone. Meanwhile, customers wait at the register.",
    "Talin isn’t the exception. In a national survey of small employers, 76 percent said they train new hires by shadowing, which means having someone work beside them. That’s exactly what Talin does.",
  ],
  challenge: [
    "Small stores also never stop training. In 2025, 46 percent of retail jobs and 66 percent of restaurant and hotel jobs turned over, according to the Bureau of Labor Statistics. Each blue figure is a job where someone left. Every one of them means a new hire who needs training.",
    "That costs real money. A 2017 estimate put the cost of replacing one part-time grocery worker at about 4,200 dollars. A typical independent grocer replaces about 16 part-timers a year, which comes to 67,200 dollars per store.",
  ],
  canvas: [
    "Our strategy is to go where the training industry doesn’t look. This is our strategy canvas, and the scores are our team’s estimates. On the left are the costs we reduce or eliminate, like senior staff time and custom content, so our curve sits low. On the right are the things we raise or create, like learning the store’s own know-how during real shifts, where our curve sits high.",
  ],
  customerProfile: [
    "Our customer is an owner like Alexis’s parents. They run a grocery, a franchise location or a restaurant with fewer than 100 employees and no training team. Their job is training every new hire. Their pain is that the best employee stops working to do it. What they want is new hires who are ready fast.",
  ],
  visualValueProposition: [
    "Here’s the same store on two days. On the left, the best employee stops working to train, and customers wait. On the right, the new hire asks, “Where does the oat milk go?” The glasses answer, “Second shelf, left of the almond milk.” The best employee never leaves the register. After one week, the owner can see that Maya can already do three of four tasks alone.",
  ],
  solution: [
    "Here’s how it works. First, the store’s best employee wears the glasses for about a week of normal shifts. They don’t have to do anything extra.",
    "Our AI turns that footage into a playbook for that one store. It covers the layout, the register and the house rules.",
    "Then new hires wear the glasses and get coached by voice. The glasses also catch missed steps, like a fridge temperature nobody logged. The owner sees which tasks each hire can already do alone. Everything runs on off-the-shelf glasses that cost 249 to 449 dollars, so we never build hardware.",
  ],
  valueProposition: [
    "Here’s what makes us different. Understudy trains every new hire on the job while the best employee keeps working. Unlike shadowing or a phone app, it learns each store from its own best employee. It also coaches hands-free, right on the floor.",
  ],
  market: [
    "We count locations, because we charge per store and every store trains its own people. At 149 dollars a month, the 1.66 million US stores and restaurants with employees are a 3 billion dollar market. The 1.13 million owned by businesses under 100 employees are worth about 2 billion a year, and that’s our market. We start with 1 percent of California’s small locations within three years. That’s 1,305 stores and 2.3 million dollars a year.",
  ],
  competitorMap: [
    "This map plots training on the job against training off the job, for small businesses and for large enterprises. On-the-job AI coaching already exists, but only for big companies. Strivr, for example, has an early-access product that coaches retail workers through smart glasses, and it’s built for enterprise operations. Small businesses only get apps like Trainual and Connecteam, which train people away from the floor. We expect bigger players to chase large enterprises first. That gives us time to win small stores with a scrappier product and grow from there.",
  ],
  proFormaRevenue: [
    "Now our pro forma, from 2027 to 2030. We charge 149 dollars a month per store. Standalone training tools charge 100 to 200 dollars, and a full year with us costs less than replacing one worker. We run free pilots from January to March 2027. After that, we add 5 to 15 paying stores a month to reach 90 by December. We grow to 450 stores in 2028, 1,305 in 2029 and 3,000 in 2030, when revenue reaches 3.8 million dollars.",
  ],
  proFormaCosts: [
    "Each store costs us about $18 a month for AI processing and hosting, plus customer support and card fees, leaving a gross margin of about 75%. Most of our spending is people. We budget $10,000 a month per hire. The four of us start on $1,500 stipends while we finish school. We also spend $350 of local marketing for each store we win. We will lose about $236,000 in 2027, $570,000 in 2028 and $541,000 in 2029. However, in 2030, we will turn a profit of ~$180,000.",
  ],
  useOfFunds: [
    "We’re raising 1 million dollars to cover 24 months, from January 2027 to December 2028. Winning stores get the largest share, about $275,000. The $194,000 reserve covers about four months of spending, if stores sign up slower than we planned. By the end of 2028, that gets us to 450 paying stores and about $805,000 a year in recurring revenue. We’ll take that traction into our next round, which carries us to profitability in 2030. Understudy puts your best employee in every new hire’s ear. Thank you!",
  ],
};

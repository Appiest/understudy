export const team = {
  productName: "Understudy",
  teamName: "Group 15",
  teamMembers: ["Brendan Giang", "Alex Tully", "Alexis Limary", "Oli Reyes"],
  figmaBoardLink: "https://www.figma.com/board/nSRJwQ2VQ1z9BM8juEXOqw/Understudy?node-id=0-1&t=1s1tUIOx2SNjlW9W-1",
  marketSizingDocLink: "https://docs.google.com/document/d/1sDwveJ5WIxz0KXWXTrl9OJGyEndpivdER_G1vZ94kIk/edit?usp=drivesdk",
  proFormaLink: "https://docs.google.com/spreadsheets/d/1db8tjnDfKrWA8-Wi1L8G82xcffZqgzsYCtjHqIc9Esg/edit?gid=0#gid=0",
  scriptEditLink: "https://github.com/Appiest/understudy/edit/main/src/content/pitchScript.ts",
  /** Path under /public, for example "/mind-map.png". Leave empty to show the drawn mind map. */
  mindMapImage: "/mind-map.png",
};

/** Reported by Talin’s owners in our interviews, not taken from their records. The slide draws one figure per hire. */
export const talinMarket = {
  hiresLastYear: 33 as number | string,
  hiresWhoStayed: 2 as number | string,
};

/** The /ignite grant test: how many Talin Market staff try the prototype, and by when. */
const grantTest = { staff: 5, by: "March 2027" };

/** The /ignite use of funds. Amounts are team estimates in dollars and should add up to the grant amount. */
export const grantPlan = {
  amount: 3_000,
  testStaff: grantTest.staff,
  testBy: grantTest.by,
  milestone: `A working produce ID and box check prototype, tested with ${grantTest.staff} Talin Market staff by ${grantTest.by}.`,
  lineItems: [
    { name: "Developer or AI help", detail: "About 70 hours", covers: "About 70 hours of building the voice coach", amount: 2_100 },
    { name: "Test hardware", covers: "Devices for the three ways we deliver the coach", amount: 450 },
    { name: "AI and cloud costs", covers: "Speech and AI model usage while we build and test", amount: 150 },
    { name: "Testing reserve", covers: "Fixes, spare devices or extra test time if the test needs them", amount: 300 },
  ],
};

export function isPlaceholder(value: string) {
  return value.startsWith("[") && value.endsWith("]");
}

export type Source = {
  cite: string;
  title: string;
  url?: string;
};

export const sources = {
  kimMauborgne: {
    cite: "Kim and Mauborgne, California Management Review, 2005",
    title: "Kim, W.C. and Mauborgne, R. (2005). “Blue Ocean Strategy: From Theory to Practice.” California Management Review 47(3).",
  },
  blsJolts: {
    cite: "BLS JOLTS Table 20, 2025",
    title: "U.S. Bureau of Labor Statistics, JOLTS Table 20: annual average total separations rates",
    url: "https://www.bls.gov/news.release/jolts.t20.htm",
  },
  groceryDive: {
    cite: "Coca-Cola Retailing Research Council via Grocery Dive, 2017 estimate",
    title: "Grocery Dive: a grocery store’s average annual turnover cost is $67K (2017)",
    url: "https://www.grocerydive.com/news/grocery--a-grocery-stores-average-annual-turnover-cost-is-67k-says-consultant/534692/",
  },
  strivrWalmart: {
    cite: "Strivr Walmart case study",
    title: "Strivr: Walmart customer story",
    url: "https://www.strivr.com/customers/walmart",
  },
  idcShipments: {
    cite: "IDC via Mixed News, Sept 2026",
    title: "Mixed News: IDC smart glasses shipments Q2 2026, VR headsets decline",
    url: "https://mixed-news.com/en/idc-smart-glasses-shipments-q2-2026-vr-headsets-decline/",
  },
  uploadVr: {
    cite: "EssilorLuxottica Q4 2025 earnings via UploadVR",
    title: "UploadVR: Meta and EssilorLuxottica sold 7 million smart glasses in 2025",
    url: "https://www.uploadvr.com/meta-essilorluxottica-sold-7-million-smart-glasses-in-2025/",
  },
  googleXr: {
    cite: "Google blog, May 2026",
    title: "Google: Android XR at I/O 2026",
    url: "https://blog.google/products-and-platforms/platforms/android/android-xr-io-2026/",
  },
  roadToVr: {
    cite: "Road to VR",
    title: "Road to VR: Microsoft discontinues HoloLens 2, support ends 2027",
    url: "https://roadtovr.com/microsoft-hololens-2-discontinued-support-2027-hololens-3/",
  },
  skillsive: {
    cite: "Skillsive, 2026",
    title: "Skillsive: Meta Quest for Business ends, what it means for VR training",
    url: "https://www.skillsive.com/blog/meta-quest-for-business-ends-what-it-means-for-vr-training",
  },
  techSpot: {
    cite: "TechSpot and CNBC, July 2026",
    title: "TechSpot: Meta’s Reality Labs division lost $4.6 billion in Q2",
    url: "https://www.techspot.com/news/113304-meta-reality-labs-division-lost-46-billion-q2.html",
  },
  viture: {
    cite: "VITURE, June 2026",
    title: "VITURE unveils Helix, AI safety glasses built on NVIDIA’s XR AI solution, at AWE 2026",
    url: "https://www.viture.com/blog/viture-unveils-helix-the-first-ai-safety-glasses-built-on-nvidia-s-xr-ai-solution-at-awe-2026",
  },
  retrocausal: {
    cite: "Retrocausal",
    title: "Retrocausal: Live Worker Guidance",
    url: "https://retrocausal.ai/live-worker-guidance/",
  },
  airwave: {
    cite: "Airwave",
    title: "Airwave: why Airwave",
    url: "https://www.airwave.us/why-airwave",
  },
  mentra: {
    cite: "Mentra",
    title: "Mentra: open-source AI glasses platform",
    url: "https://mentraglass.com/",
  },
  augmentir: {
    cite: "Augmentir",
    title: "Augmentir: AI-powered connected worker platform",
    url: "https://www.augmentir.ai/",
  },
  yoobic: {
    cite: "YOOBIC, 2026",
    title: "YOOBIC: top 10 retail training platforms for frontline employees (2026)",
    url: "https://yoobic.com/blog/top-10-retail-training-platforms-for-frontline-employees-2026/",
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;

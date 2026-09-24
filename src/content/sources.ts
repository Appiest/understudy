export type Source = {
  cite: string;
  title: string;
  url?: string;
  /** Background sources appear on the fact pages but not on the appendix slide. */
  factsOnly?: boolean;
};

export const sources = {
  kimMauborgne: {
    cite: "Kim and Mauborgne, California Management Review, 2005",
    title: "Kim, W.C. and Mauborgne, R. (2005). “Blue Ocean Strategy: From Theory to Practice.” California Management Review 47(3), 105–121.",
    url: "https://cmr.berkeley.edu/2005/05/47-3-blue-ocean-strategy-from-theory-to-practice/",
  },
  blsJolts: {
    cite: "BLS JOLTS Table 20, 2025",
    title: "U.S. Bureau of Labor Statistics, JOLTS Table 20: annual average total separations rates",
    url: "https://www.bls.gov/news.release/jolts.t20.htm",
  },
  groceryDive: {
    cite: "Chris Cooley via Grocery Dive, 2017 estimate",
    title: "Grocery Dive: a grocery store’s average annual turnover cost is $67K, says consultant (Sept 18, 2017)",
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

    factsOnly: true,  },
  uploadVr: {
    cite: "UploadVR, Feb 2026",
    title: "UploadVR: Meta and EssilorLuxottica sold 7 million smart glasses in 2025",
    url: "https://www.uploadvr.com/meta-essilorluxottica-sold-7-million-smart-glasses-in-2025/",

    factsOnly: true,  },
  googleXr: {
    cite: "Google blog, May 2026",
    title: "Google: Android XR at I/O 2026",
    url: "https://blog.google/products-and-platforms/platforms/android/android-xr-io-2026/",

    factsOnly: true,  },
  roadToVr: {
    cite: "Road to VR",
    title: "Road to VR: Microsoft discontinues HoloLens 2, support ends 2027",
    url: "https://roadtovr.com/microsoft-hololens-2-discontinued-support-2027-hololens-3/",

    factsOnly: true,  },
  skillsive: {
    cite: "Skillsive, 2026",
    title: "Skillsive: Meta Quest for Business ends, what it means for VR training",
    url: "https://www.skillsive.com/blog/meta-quest-for-business-ends-what-it-means-for-vr-training",

    factsOnly: true,  },
  techSpot: {
    cite: "TechSpot and CNBC, July 2026",
    title: "TechSpot: Meta’s Reality Labs division lost $4.6 billion in Q2",
    url: "https://www.techspot.com/news/113304-meta-reality-labs-division-lost-46-billion-q2.html",

    factsOnly: true,  },
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
  essilorResults: {
    cite: "EssilorLuxottica FY2025 results, Feb 2026",
    title: "EssilorLuxottica: Q4 and full-year 2025 results (Feb 11, 2026)",
    url: "https://www.essilorluxottica.com/cap/content/283060/",
  },
  walmartVr: {
    cite: "Walmart, Sept 2018",
    title: "Walmart: how VR is transforming the way we train associates (Sept 20, 2018)",
    url: "https://corporate.walmart.com/news/2018/09/20/how-vr-is-transforming-the-way-we-train-associates",
  },
  metaForWork: {
    cite: "Meta, Jan 2026",
    title: "Meta: an update on Meta for Work (Jan 15, 2026)",
    url: "https://www.meta.com/blog/an-update-on-meta-for-work/",
  },
  metaLiveAi: {
    cite: "Meta, Dec 2024",
    title: "Meta: Ray-Ban Meta v11 update adds Live AI (Dec 16, 2024)",
    url: "https://www.meta.com/blog/ray-ban-meta-v11-software-update-live-ai-translation-shazam/",
  },
  metaGlassesPrices: {
    cite: "Meta Newsroom, Sept 2026",
    title: "Meta Newsroom: introducing Ray-Ban Meta Audio and more AI glasses styles (Sept 23, 2026)",
    url: "https://about.fb.com/news/2026/09/introducing-ray-ban-meta-audio-glasses-new-styles-plus-muse/",
  },
  metaQ4Call: {
    cite: "Meta Q4 2025 earnings call, Jan 2026",
    title: "Meta: fourth quarter 2025 earnings call transcript (Jan 28, 2026)",
    url: "https://s21.q4cdn.com/399680738/files/doc_financials/2025/q4/META-Q4-2025-Earnings-Call-Transcript.pdf",
  },
  hololensEnd: {
    cite: "Microsoft HoloLens release notes",
    title: "Microsoft Learn: HoloLens release notes",
    url: "https://learn.microsoft.com/en-us/hololens/hololens-release-notes",
  },
  googleWarbyParker: {
    cite: "TechCrunch, May 2025",
    title: "TechCrunch: Google commits $150M to develop AI glasses with Warby Parker (May 20, 2025)",
    url: "https://techcrunch.com/2025/05/20/google-commits-150m-to-develop-ai-glasses-with-warby-parker/",
  },
  amazonGlasses: {
    cite: "Amazon, Sept 2026",
    title: "Amazon: smart glasses for Amazon delivery drivers (updated Sept 21, 2026)",
    url: "https://www.aboutamazon.com/news/transportation/smart-glasses-amazon-delivery-drivers",
  },
  appleGlassesReport: {
    cite: "Bloomberg, Oct 2025",
    title: "Bloomberg: Apple shelves Vision headset revamp to prioritize Meta-like AI smart glasses (Oct 1, 2025)",
    url: "https://www.bloomberg.com/news/articles/2025-10-01/apple-shelves-vision-headset-revamp-to-prioritize-meta-like-ai-smart-glasses",
  },
  idcTraining: {
    cite: "IDC, Sept 2026",
    title: "IDC: smart glasses growth cools to 35% as Meta doubles down on distribution (Sept 16, 2026)",
    url: "https://www.idc.com/resource-center/blog/smart-glasses-growth-cools-to-35-as-meta-doubles-down-on-distribution/",
  },
  armyAnduril: {
    cite: "Microsoft, Feb 2025",
    title: "Microsoft: Anduril and Microsoft partner to advance the IVAS program for the U.S. Army (Feb 11, 2025)",
    url: "https://news.microsoft.com/source/2025/02/11/anduril-and-microsoft-partner-to-advance-integrated-visual-augmentation-system-ivas-program-for-the-u-s-army/",
  },
  idcTracker: {
    cite: "IDC Global Smart Eyewear tracker, 2025–2026",
    title: "IDC Global Smart Eyewear quarterly shipments, Q1 2025 to Q2 2026 (IDC China releases, reported by IT之家, Sept 17, 2026, and earlier quarters)",
    url: "https://www.ithome.com/1/003/685.htm",
  },
  idcQ1_2025: {
    cite: "IDC via Sina Tech, June 2025",
    title: "Sina Tech reporting IDC: global smart eyewear shipments, Q1 2025 (June 19, 2025)",
    url: "https://finance.sina.com.cn/tech/digi/2025-06-19/doc-infannhn8316952.shtml",
    factsOnly: true,
  },
  idcQ2_2025: {
    cite: "IDC via Tencent News, Sept 2025",
    title: "Tencent News reporting IDC: global smart eyewear shipments, Q2 2025 (Sept 18, 2025)",
    url: "https://news.qq.com/rain/a/20250918A01K6E00",
    factsOnly: true,
  },
  idcQ3_2025: {
    cite: "IDC via IT之家, Dec 2025",
    title: "IT之家 reporting IDC: global smart eyewear shipments, Q3 2025 (Dec 12, 2025)",
    url: "https://www.ithome.com/0/904/649.htm",
    factsOnly: true,
  },
  idcQ1_2026: {
    cite: "IDC via 中新经纬, June 2026",
    title: "中新经纬 reporting IDC: global smart eyewear shipments, Q1 2026 (June 16, 2026)",
    url: "https://www.jwview.com/jingwei/html/m/06-16/675316.shtml",
    factsOnly: true,
  },
  idcXr2025: {
    cite: "IDC via ChannelLife, Mar 2026",
    title: "ChannelLife reporting IDC: smart glasses drive 44% growth in global XR shipments in 2025 (Mar 26, 2026)",
    url: "https://channellife.ca/story/smart-glasses-drive-44-growth-in-global-xr-shipments",
  },
  metaSalesHistory: {
    cite: "TechTimes, July 2026",
    title: "TechTimes: AI glasses revenue nearly doubled in Q2, EssilorLuxottica (July 28, 2026)",
    url: "https://www.techtimes.com/articles/321887/20260728/ai-glasses-revenue-nearly-doubled-q2-essilorluxottica-targets-waveguide-manufacturing.htm",
  },
  hololensReporting: {
    cite: "CNBC, June 2024",
    title: "CNBC: Microsoft confirms mixed reality layoffs, will keep selling HoloLens 2 (June 3, 2024)",
    url: "https://www.cnbc.com/2024/06/03/microsoft-confirms-mixed-reality-layoffs-will-keep-selling-hololens-2.html",
    factsOnly: true,
  },
  uploadVrQuest: {
    cite: "UploadVR, Jan 2026",
    title: "UploadVR: Meta is shutting down its Quest for Business program (Jan 16, 2026)",
    url: "https://www.uploadvr.com/meta-is-shutting-down-its-quest-for-business-program/",
    factsOnly: true,
  },
  recordingConsent: {
    cite: "Reporters Committee for Freedom of the Press",
    title: "Reporters Committee for Freedom of the Press: Reporter’s Recording Guide, consent laws by state",
    url: "https://www.rcfp.org/introduction-to-reporters-recording-guide/",
  },
  ftcRiteAid: {
    cite: "FTC, Dec 2023",
    title: "FTC: Rite Aid banned from using AI facial recognition (Dec 19, 2023)",
    url: "https://www.ftc.gov/news-events/news/press-releases/2023/12/rite-aid-banned-using-ai-facial-recognition-after-ftc-says-retailer-deployed-technology-without",
  },
  metaGlassesLawsuit: {
    cite: "TechCrunch, Mar 2026",
    title: "TechCrunch: Meta sued over AI smart glasses privacy after workers reviewed intimate footage (Mar 5, 2026)",
    url: "https://techcrunch.com/2026/03/05/meta-sued-over-ai-smartglasses-privacy-concerns-after-workers-reviewed-nudity-sex-and-other-footage/",
  },
  connecticutMonitoring: {
    cite: "Workplace Privacy Report, Sept 2026",
    title: "Workplace Privacy Report: deadline imminent for Connecticut’s expanded electronic monitoring law (Sept 2026)",
    url: "https://www.workplaceprivacyreport.com/2026/09/articles/monitoring-2/deadline-imminent-for-connecticuts-expanded-electronic-monitoring-law/",
  },
  wearableSurvey: {
    cite: "Security.org survey, Aug 2026",
    title: "Security.org survey of 1,000+ US adults on camera-equipped wearables (Aug 2026), via Apple World Today",
    url: "https://appleworld.today/2026/08/study-72-of-americans-surveyed-are-worried-about-being-secretly-recorded-by-camera-equipped-wearables/",
  },
  targetBipa: {
    cite: "Top Class Actions",
    title: "Top Class Actions: Arnold v. Target, class action over in-store facial geometry capture (filed June 6, 2024)",
    url: "https://topclassactions.com/target-class-action-lawsuit-and-settlement-news/target-class-action-claims-retailer-captures-shopper-data-through-surveillance-systems/",
    factsOnly: true,
  },
  californiaSb1130: {
    cite: "Workplace Privacy Report, Aug 2026",
    title: "Workplace Privacy Report: California bill to address wearable recording devices, including glasses (Aug 2026)",
    url: "https://www.workplaceprivacyreport.com/2026/08/articles/wearables/california-bill-to-address-wearable-recording-devices-including-glasses/",
    factsOnly: true,
  },
  icoBodyWorn: {
    cite: "UK ICO body-worn video guidance",
    title: "UK Information Commissioner’s Office: guidance on body-worn video",
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/cctv-and-video-surveillance/guidance-on-video-surveillance-including-cctv/additional-considerations-for-technologies-other-than-cctv/body-worn-video-bwv/",
    factsOnly: true,
  },
  shelbyReport: {
    cite: "Chris Cooley, The Shelby Report, 2017",
    title: "The Shelby Report: the real cost of worker turnover for grocers, by Chris Cooley (Sept 15, 2017)",
    url: "https://www.theshelbyreport.com/2017/09/15/hr-benefits-news-turnover-costs/",
    factsOnly: true,
  },
  blsJoltsLevels: {
    cite: "BLS JOLTS Table 19, 2025",
    title: "U.S. Bureau of Labor Statistics, JOLTS Table 19: annual total separations levels",
    url: "https://www.bls.gov/news.release/jolts.t19.htm",
    factsOnly: true,
  },
  blsJoltsDefinitions: {
    cite: "BLS JOLTS definitions",
    title: "U.S. Bureau of Labor Statistics: JOLTS definitions",
    url: "https://www.bls.gov/jlt/jltdef.htm",
    factsOnly: true,
  },
  blsQcew: {
    cite: "BLS QCEW, 2025 annual averages",
    title: "U.S. Bureau of Labor Statistics, Quarterly Census of Employment and Wages, 2025 annual averages",
    url: "https://data.bls.gov/cew/data/api/2025/a/industry/445110.csv",
    factsOnly: true,
  },
  blsCes: {
    cite: "BLS Current Employment Statistics, Aug 2026",
    title: "U.S. Bureau of Labor Statistics, Current Employment Statistics (August 2026, preliminary)",
    url: "https://www.bls.gov/ces/",
    factsOnly: true,
  },
  ngaImpact: {
    cite: "National Grocers Association, May 2026",
    title: "National Grocers Association: economic impact analysis of independent grocers (May 2026)",
    url: "https://www.nationalgrocers.org/wp-content/uploads/2026/05/NGA_Economic_Impact_Report_V2-1-2.pdf",
    factsOnly: true,
  },
  ccrrcRetention: {
    cite: "Coca-Cola Retailing Research Council",
    title: "CCRRC and OC&C: Fighting what’s different differently, retention in the grocery front line",
    url: "https://www.ccrrc.org/report-directory/fighting-whats-different-differently",
    factsOnly: true,
  },
  blackBox: {
    cite: "Black Box Intelligence, Oct 2024",
    title: "Black Box Intelligence: State of the Restaurant Workforce (Oct 8, 2024)",
    url: "https://www.prweb.com/releases/restaurant-turnover-trends-improve-as-diverse-workforce-and-competitive-compensation-drives-positive-change-new-research-from-black-box-intelligence-reveals-302268498.html",
    factsOnly: true,
  },
  sevenShifts: {
    cite: "7shifts Restaurant Workforce Report, 2025",
    title: "7shifts: Restaurant Workforce Report 2025",
    url: "https://www.7shifts.com/restaurant-labor-costs-playbook",
    factsOnly: true,
  },
  nraState: {
    cite: "National Restaurant Association, Feb 2026",
    title: "National Restaurant Association: 2026 State of the Restaurant Industry (Feb 12, 2026)",
    url: "https://restaurant.org/research-and-media/media/press-releases/persistent-cost-increases-and-enduring-demand-will-shape-the-restaurant-industry-in-2026/",
    factsOnly: true,
  },
  pickupTowers: {
    cite: "Chain Store Age",
    title: "Chain Store Age: Walmart removing automated pickup towers from its stores",
    url: "https://chainstoreage.com/report-walmart-removing-automated-pick-towers-its-stores",
    factsOnly: true,
  },
  techNode: {
    cite: "TechNode citing IDC, Sept 2026",
    title: "TechNode: global smart eyewear shipments grow 35.3% in Q2 2026 (Sept 17, 2026)",
    url: "https://technode.com/2026/09/17/global-smart-eyewear-shipments-q2-2026/",
    factsOnly: true,
  },
  idcBlog: {
    cite: "IDC, June 2026",
    title: "IDC: smart glasses surge, the XR market is rewriting its own rules (June 15, 2026)",
    url: "https://www.idc.com/resource-center/blog/smart-glasses-surge-the-xr-market-is-rewriting-its-own-rules/",
    factsOnly: true,
  },
  metaEarnings: {
    cite: "Meta Q2 2026 earnings release",
    title: "Meta: second quarter 2026 results (July 29, 2026), via StockTitan",
    url: "https://www.stocktitan.net/news/META/meta-reports-second-quarter-2026-hkjfhayj8l0v.html",
    factsOnly: true,
  },
  hololensPrice: {
    cite: "TechCrunch, May 2019",
    title: "TechCrunch: HoloLens 2 Development Edition pricing (May 2, 2019)",
    url: "https://techcrunch.com/?p=1821279",
  },
  geminiLive: {
    cite: "Google blog, May 2025",
    title: "Google: Gemini app updates from I/O 2025 (May 20, 2025)",
    url: "https://blog.google/products-and-platforms/products/gemini/gemini-app-updates-io-2025/",
    factsOnly: true,
  },
  mentraLive: {
    cite: "Mentra Live",
    title: "Mentra: Mentra Live glasses",
    url: "https://mentraglass.com/live",
    factsOnly: true,
  },
  axonify: {
    cite: "Axonify",
    title: "Axonify: frontline enablement platform",
    url: "https://axonify.com/",
    factsOnly: true,
  },
  valueInnovation: {
    cite: "Blue Ocean Strategy tools",
    title: "Kim and Mauborgne, Blue Ocean Strategy tools: value innovation, strategy canvas and four actions framework",
    url: "https://www.blueoceanstrategy.com/tools/value-innovation/",
    factsOnly: true,
  },
  noncustomerTiers: {
    cite: "Blue Ocean Strategy tools",
    title: "Kim and Mauborgne, Blue Ocean Strategy tools: three tiers of noncustomers",
    url: "https://www.blueoceanstrategy.com/tools/three-tiers-of-noncustomers/",
    factsOnly: true,
  },
  yellowTailCase: {
    cite: "Blue Ocean Strategy teaching materials",
    title: "Kim and Mauborgne: [yellow tail] teaching materials",
    url: "https://www.blueoceanstrategy.com/teaching-materials/yellowtail/",
    factsOnly: true,
  },
  californiaRecording: {
    cite: "California Penal Code § 632",
    title: "California Penal Code § 632: recording confidential communications",
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PEN&sectionNum=632",
    factsOnly: true,
  },
  alixPartners: {
    cite: "AlixPartners, May 2024",
    title: "AlixPartners: how grocery CEOs can mitigate turnover (May 2, 2024)",
    url: "https://www.alixpartners.com/insights/102j6lk/how-grocery-ceos-can-mitigate-turnover-retain-leadership-strengthen-culture-and/",
    factsOnly: true,
  },
  wineExcerpt: {
    cite: "Entrepreneur, May 2015",
    title: "Entrepreneur: the framework that transformed the US wine industry, excerpt of Blue Ocean Strategy, Expanded Edition (May 27, 2015)",
    url: "https://www.entrepreneur.com/growing-a-business/the-framework-that-transformed-the-us-wine-industry/246622",
    factsOnly: true,
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;

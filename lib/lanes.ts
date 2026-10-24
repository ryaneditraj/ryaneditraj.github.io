export type LaneLink = { href: string; label: string };

export type LaneRow = {
  name: string;
  line: string;
  links: LaneLink[];
  note?: string;
  state?: string;
};

export const hero = "I build companies. AI first.";

export const mission =
  "Mine, and as a technical co-founder for others. Then I explain it to 300K+ people.";

export const bridge = "The bridge from non-tech to tech.";

export const buildRows: LaneRow[] = [
  {
    name: "Thugir Labs",
    state: "Closed beta",
    line: "Frontier work: high-end AI security research. An autonomous engine that reasons, instead of only scanning. Closed beta.",
    links: [
      { href: "https://thugirlabs.com", label: "thugirlabs.com" },
      { href: "https://thugir.com", label: "thugir.com" },
    ],
    note: "Both hosts served the same title on 23 October 2026. His X and LinkedIn bios still describe a different audience.",
  },
  {
    name: "MoneyRadar",
    state: "Live",
    line: "Money talk in India gets loud and technical. MoneyRadar is free calculators and short guides, so someone can make an everyday decision without a lecture. It is not investment advice.",
    links: [
      { href: "https://moneyradar.in", label: "moneyradar.in" },
      { href: "https://moneyradar.in/about/ryan-editraj", label: "Author page" },
    ],
  },
  {
    name: "IndiQuant",
    state: "Public code",
    line: "A hunch about Indian stocks is not a plan. IndiQuant is where you write the idea, test it on past NSE and BSE data, and keep the record. It does not place a trade.",
    links: [
      { href: "https://github.com/ryaneditraj/indiquant", label: "Repository" },
      { href: "/work/indiquant", label: "Notes" },
    ],
    note: "The README calls it a MoneyRadar product by Thugir Group.",
  },
  {
    name: "Trinity One",
    state: "In progress",
    line: "A tuition centre's day gets lost in chats and paper. Trinity One puts classes, homework, and attendance on one screen, so the day is findable.",
    links: [
      { href: "https://github.com/ryaneditraj/TuitionOS", label: "Repository" },
      { href: "https://tuition-os-eta.vercel.app", label: "Demo listed in the README" },
      { href: "/work/tuitionos", label: "Notes" },
    ],
  },
  {
    name: "KL-ctf",
    state: "Built",
    line: "A harness I built so a competition exercise can run. I do not describe the challenges here.",
    links: [
      { href: "https://github.com/ryaneditraj/KL-ctf", label: "Repository" },
      { href: "/lab/kl-ctf", label: "Notes" },
    ],
  },
  {
    name: "Placement Karo",
    state: "Live",
    line: "Students in India are left guessing if they are ready for placement. Placement Karo is a check that shows where they stand. I do not state a price here.",
    links: [{ href: "https://placement-karo.vercel.app", label: "placement-karo.vercel.app" }],
    note: "The site is live. It sits on a Vercel team whose name includes ryaneditraj. That is the link used here, not a signed statement of ownership. Pricing is not repeated.",
  },
  {
    name: "Hack Club builds",
    state: "Built",
    line: "I had gone quiet on building. Hack Club pulled me back: a keyboard layout, a small page, and a three-dimensional site.",
    links: [
      { href: "https://github.com/ryaneditraj/Keeb-Keyboard", label: "Keeb" },
      { href: "https://github.com/ryaneditraj/waffles-site", label: "Waffles" },
      { href: "https://github.com/ryaneditraj/Space-3d-site", label: "Space" },
      { href: "/lab/keeb-keyboard", label: "Keeb notes" },
    ],
  },
];

export const learnRows: LaneRow[] = [
  {
    name: "Instagram",
    line: "300K+ followers on Instagram. The handle is @ryaneditraj. Ryan confirmed the count on 24 October 2026.",
    links: [{ href: "https://www.instagram.com/ryaneditraj/", label: "@ryaneditraj" }],
  },
  {
    name: "Medium essay",
    line: "I wrote this for anyone who has been told the field is too complicated. Technology should explain itself. The job is to reduce complexity. 2 June 2026.",
    links: [
      {
        href: "https://medium.com/@ryaneditraj/a-16-year-old-founders-prediction-the-next-cybersecurity-crisis-will-be-powered-by-ai-6cbd75ad947a",
        label: "Read the essay",
      },
    ],
  },
  {
    name: "Thugir demo",
    line: "A film is faster than a spec when you are new to this. This is the Thugir Labs demo. It reasons. It does not only scan.",
    links: [
      { href: "https://www.youtube.com/watch?v=pzrIMsDy0Wg", label: "Watch" },
      { href: "https://www.youtube.com/@thugirlabs", label: "Channel" },
    ],
  },
  {
    name: "Start here",
    line: "New to tech? Start with the essay, then the film, then Instagram. Three doors. No jargon first.",
    links: [{ href: "/learn/start", label: "Start here" }],
  },
];

export const proofRows: { item: string; check: string; href: string; label: string }[] = [
  {
    item: "MoneyRadar is live",
    check: "The site calls him founder of MoneyRadar and Thugir Group.",
    href: "https://moneyradar.in/about/ryan-editraj",
    label: "Author page",
  },
  {
    item: "Thugir Labs is live",
    check: "thugirlabs.com and thugir.com both served the product on 23 October 2026. Closed beta.",
    href: "https://thugirlabs.com",
    label: "thugirlabs.com",
  },
  {
    item: "IndiQuant is public code",
    check: "Repository created 25 July 2026. One star on the API that day. Labelled a MoneyRadar product.",
    href: "https://github.com/ryaneditraj/indiquant",
    label: "Repository",
  },
  {
    item: "Placement Karo is live",
    check: "The deployment is up, on a Vercel team whose name includes ryaneditraj.",
    href: "https://placement-karo.vercel.app",
    label: "Open the site",
  },
  {
    item: "A Thugir demo exists",
    check: "YouTube oEmbed for the film on @thugirlabs. No personal channel was found.",
    href: "https://www.youtube.com/watch?v=pzrIMsDy0Wg",
    label: "Watch",
  },
  {
    item: "The Medium essay exists",
    check: "Published 2 June 2026 under @ryaneditraj.",
    href: "https://medium.com/@ryaneditraj/a-16-year-old-founders-prediction-the-next-cybersecurity-crisis-will-be-powered-by-ai-6cbd75ad947a",
    label: "Read",
  },
  {
    item: "300K+ on Instagram",
    check: "Ryan confirmed the follower count on 24 October 2026. The public line is 300K+.",
    href: "https://www.instagram.com/ryaneditraj/",
    label: "@ryaneditraj",
  },
  {
    item: "He took part in Liya Tech",
    check: "The inaugural hackathon on 11 July 2026 is corroborated by the organizer and other participants. This row records that he took part. It does not record a place.",
    href: "https://www.linkedin.com/posts/ryaneditraj_hackathon-winner-innovation-activity-7482270388954083330-M31_",
    label: "His post",
  },
  {
    item: "Hack Club repos",
    check: "Keeb, Waffles, and Space-3d-site are his public repositories.",
    href: "https://github.com/ryaneditraj/Keeb-Keyboard",
    label: "Keeb",
  },
];

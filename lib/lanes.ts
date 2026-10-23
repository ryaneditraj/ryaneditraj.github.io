export type LaneLink = { href: string; label: string };

export type LaneRow = {
  name: string;
  line: string;
  links: LaneLink[];
  note?: string;
};

export const hero = "I build security and AI products, and I explain tech so anyone can use it.";

export const bridge = "The bridge from non-tech to tech.";

export const buildRows: LaneRow[] = [
  {
    name: "Thugir Labs",
    line: "A closed beta for security research. It records a proof of what it finds. The audience is not settled on this site.",
    links: [
      { href: "https://thugirlabs.com", label: "thugirlabs.com" },
      { href: "https://thugir.com", label: "thugir.com" },
    ],
    note: "Both hosts served the same title on 23 October 2026. His X and LinkedIn bios still describe a different audience.",
  },
  {
    name: "MoneyRadar",
    line: "Calculators and short guides for money decisions in India. Free to use. Not investment advice.",
    links: [
      { href: "https://moneyradar.in", label: "moneyradar.in" },
      { href: "https://moneyradar.in/about/ryan-editraj", label: "Author page" },
    ],
  },
  {
    name: "IndiQuant",
    line: "A research desk for ideas about Indian stocks. You state a hypothesis and test it on past data. It does not place trades.",
    links: [
      { href: "https://github.com/ryaneditraj/indiquant", label: "Repository" },
      { href: "/work/indiquant", label: "Notes" },
    ],
    note: "The README calls it a MoneyRadar product by Thugir Group.",
  },
  {
    name: "Trinity One",
    line: "The school day on one screen for a tuition centre: classes, homework, and attendance.",
    links: [
      { href: "https://github.com/ryaneditraj/TuitionOS", label: "Repository" },
      { href: "https://tuition-os-eta.vercel.app", label: "Demo listed in the README" },
      { href: "/work/tuitionos", label: "Notes" },
    ],
  },
  {
    name: "KL-ctf",
    line: "A harness for running a security-challenge exercise. Built for a hackathon. This site does not describe the challenges.",
    links: [
      { href: "https://github.com/ryaneditraj/KL-ctf", label: "Repository" },
      { href: "/lab/kl-ctf", label: "Notes" },
    ],
  },
  {
    name: "Placement Karo",
    line: "A placement check for students in India.",
    links: [{ href: "https://placement-karo.vercel.app", label: "placement-karo.vercel.app" }],
    note: "The site is live. It sits on a Vercel team whose name includes ryaneditraj. That is the link used here, not a signed statement of ownership. Pricing is not repeated.",
  },
  {
    name: "Hack Club builds",
    line: "Three small builds from Hack Club: a keyboard layout, a program page, and a three-dimensional site.",
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
    line: "Where he explains tech, startups, and AI for a general audience. The handle is @ryaneditraj. No follower count is printed.",
    links: [{ href: "https://www.instagram.com/ryaneditraj/", label: "@ryaneditraj" }],
  },
  {
    name: "Medium essay",
    line: "He argues that technology should explain itself, and that the job is to reduce complexity. Published 2 June 2026.",
    links: [
      {
        href: "https://medium.com/@ryaneditraj/a-16-year-old-founders-prediction-the-next-cybersecurity-crisis-will-be-powered-by-ai-6cbd75ad947a",
        label: "Read the essay",
      },
    ],
  },
  {
    name: "Thugir demo",
    line: "A short film of the Thugir Labs product, on the Thugir Labs channel. The title is his: it reasons, it does not only scan.",
    links: [
      { href: "https://www.youtube.com/watch?v=pzrIMsDy0Wg", label: "Watch" },
      { href: "https://www.youtube.com/@thugirlabs", label: "Channel" },
    ],
  },
  {
    name: "Start here",
    line: "A short path for someone who is new to tech: the essay, the demo, then Instagram.",
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

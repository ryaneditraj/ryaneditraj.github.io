export type DirectoryLink = { href: string; label: string; purpose: string };

export const directoryGroups: { title: string; links: DirectoryLink[] }[] = [
  {
    title: "Start",
    links: [
      { href: "/", label: "Home", purpose: "Who Ryan is, in one screen." },
      { href: "/build", label: "Build", purpose: "The products, in plain English, with links." },
      { href: "/learn", label: "Learn", purpose: "Instagram, the essay, and the demo." },
      { href: "/learn/start", label: "Start here", purpose: "A short path for someone new to tech." },
      { href: "/about", label: "About", purpose: "The longer account, with sources." },
      { href: "/now", label: "Now", purpose: "What the public record says he is doing." },
      { href: "/journey", label: "Journey", purpose: "Dated facts only." },
      { href: "/links", label: "Links", purpose: "A light page for a phone bio." },
    ],
  },
  {
    title: "Work",
    links: [
      { href: "/work", label: "Work", purpose: "Selected public projects." },
      { href: "/building", label: "Building", purpose: "Active work beside finished work." },
      { href: "/lab", label: "Lab", purpose: "Experiments and one-off builds." },
      { href: "/past-projects", label: "Past projects", purpose: "The archive, including early exercises." },
      { href: "/open-source", label: "Open source", purpose: "Original repositories, with the fetch date." },
      { href: "/tools", label: "Tools", purpose: "Only tools with a working public URL." },
    ],
  },
  {
    title: "Reading",
    links: [
      { href: "/notes", label: "Notes", purpose: "Writing. Almost empty until Ryan publishes." },
      { href: "/playbooks", label: "Playbooks", purpose: "How to use this site." },
      { href: "/resources", label: "Resources", purpose: "A shelf Ryan has not filled." },
      { href: "/bookmarks", label: "Bookmarks", purpose: "Public properties, not a reading list." },
      { href: "/uses", label: "Uses", purpose: "Tools he has confirmed, and blanks." },
    ],
  },
  {
    title: "Work with him",
    links: [
      { href: "/services", label: "Work with me", purpose: "Partnership and collaboration. Not a service menu." },
      { href: "/collaborate", label: "Collaborate", purpose: "The inquiry." },
      { href: "/mentorship", label: "Mentorship", purpose: "Not open." },
      { href: "/mentorship/book", label: "Book", purpose: "The slot screen. It does not confirm a booking." },
      { href: "/media-kit", label: "Media kit", purpose: "Facts a producer can check." },
      { href: "/press", label: "Press", purpose: "Clippings, when any exist." },
      { href: "/contact", label: "Contact", purpose: "Which door to use." },
    ],
  },
  {
    title: "House",
    links: [
      { href: "/directory", label: "Directory", purpose: "This index." },
      { href: "/dispatches", label: "Dispatches", purpose: "Letters, only with a real list." },
      { href: "/community", label: "Community", purpose: "Not launched." },
      { href: "/portal", label: "Portal", purpose: "Not enabled." },
      { href: "/privacy", label: "Privacy", purpose: "What the server stores." },
      { href: "/terms", label: "Terms", purpose: "Plain terms. Have a lawyer read them." },
    ],
  },
];

export const publicPaths = directoryGroups.flatMap((group) => group.links.map((link) => link.href));

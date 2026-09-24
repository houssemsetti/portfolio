// Single source of truth for every piece of copy on the site.
// Edit here, then run `node build.mjs` to regenerate index.html and work/*.html.

export const profile = {
  name: "Houssem Setti",
  role: "Product Manager & Builder",
  // The hero headline is split so the highlighted words can be wrapped in a marker.
  // The highlight cube-flips from the first entry to the second two seconds in.
  heroLead: "I’m Houssem Setti, I’m a",
  heroHighlight: ["Product manager", "Product builder"],
  intro:
    "Engineer by training, designer by passion, PM by choice. I turn complex problems into products people actually use.",
  location: "Paris, France",
  email: "houssemsetties@gmail.com",
  footerLine: "Portfolio 2026",
  links: [
    { label: "Email", icon: "mail", href: "mailto:houssemsetties@gmail.com" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/houssem-setti/" },
    { label: "Behance", icon: "behance", href: "https://www.behance.net/houssemsetti" },
  ],
};

// The nav bar. `href` is an in-page anchor; the yellow marker slides to whichever
// section is currently on screen.
export const nav = [
  { label: "Portfolio", href: "#work" },
  { label: "About //", href: "#about" },
  { label: "Hire Me", href: "#contact" },
];

// The black band under the hero. `icon` is a key in content/tool-icons.mjs.
export const toolbelt = [
  { name: "Figma", icon: "figma" },
  { name: "Jira", icon: "jira" },
  { name: "Claude code", icon: "claude" },
  { name: "Notion", icon: "notion" },
  { name: "Amplitude", icon: "amplitude" },
];

// Projects render as cards in the 2x2 grid and each get their own page under /work/.
// `name` / `tagline` are the two lines printed on the card.
// `peek` is the sneak peek that slides over the card image on hover (or behind
// the "Quick look" button on touch screens) — keep each line short.
export const projects = [
  {
    slug: "soft-ai-training-platform",
    peek: {
      problem: "Sales teams rarely get a safe place to practise before a real call.",
      solution: "An AI training platform with realistic avatars and real-time coaching.",
      outcome: "Live MVP in one month, a team of six led, 3x faster specs with Claude.",
    },
    name: "Soft",
    tagline: "AI training platform",
    thumb: "assets/img/work-soft-ai-training-platform.png",
    year: "2026",
    role: "Lead Product Manager",
    company: "Soft.eu by Incenteev",
    timeframe: "2026 — ongoing",
    summary:
      "An AI-powered sales training platform taken from empty repository to live MVP in a single month, with a team of four developers and two designers.",
    stats: [
      { value: "1 month", label: "Zero to live MVP" },
      { value: "6", label: "People led" },
      { value: "12", label: "Projects shipped in month one" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "Soft.eu was spun up inside Incenteev as a new product line: an AI-powered sales training platform. Reps, managers and customer success teams practise against ultra-realistic AI avatars that push back like real prospects, get coached in real time, and then work on personalised exercises that target their skill gaps. Managers follow engagement and progress from a team dashboard, and the whole thing is hosted in France and powered by Mistral AI.",
          "The problem it answers is a familiar one: sales teams rarely get a safe place to practise before a real call, and traditional training is one-size-fits-all and hard to measure. With Soft, they train risk-free and judgement-free, with no leads burned along the way.",
          "When I joined as Lead Product Manager there was no existing product, no backlog and no established delivery rhythm, just a target market and a hard deadline. My job was to define what the first version actually needed to be, and to get a team of six from a blank page to something real users could log into.",
        ],
      },
      {
        heading: "What I did",
        list: [
          "Framed the MVP scope from scratch — deciding what made the first cut and, more importantly, what did not.",
          "Led four developers and two designers through discovery and delivery in the same compressed cycle, rather than running them in sequence.",
          "Drove discovery and delivery across 12 projects inside the first month by leaning on AI for research synthesis, spec drafting and prototyping.",
          "Built the specification and design workflow around Claude and Claude Code, which produced a 3x productivity gain on design and spec writing.",
          "Set the delivery cadence, rituals and definition of done for a team that had never worked together before.",
        ],
      },
      {
        heading: "Impact",
        list: [
          "A working MVP shipped one month after kickoff, from scratch.",
          "12 projects moved through discovery and delivery in that same month.",
          "3x productivity gain on design and spec writing, measured against the team’s previous pace.",
        ],
      },
      {
        heading: "How I worked",
        body: [
          "The interesting part of this project was not the feature list — it was proving that a small team using AI properly can compress a quarter of work into a month without the output falling apart. Specs were drafted with Claude and reviewed by humans, prototypes were generated in hours instead of days, and the team spent its time on judgement calls rather than production work.",
        ],
      },
    ],
    stack: ["Product strategy", "Roadmap planning", "Spec writing", "Claude / Claude Code", "Figma", "Jira"],
  },
  {
    slug: "incenteev-ai-knowledge-bot",
    peek: {
      problem: "Knowledge bases held the answers, but nobody could find them.",
      solution: "A chat assistant that answers from company docs and cites its sources.",
      outcome: "A flagship AI launch, and the pattern reused for later AI features.",
    },
    name: "Incenteev",
    tagline: "AI knowledge bot",
    thumb: "assets/img/work-incenteev-ai-knowledge-bot.png",
    year: "2026",
    role: "Product Manager",
    company: "Incenteev",
    timeframe: "2026",
    summary:
      "One of two major AI initiatives I owned end-to-end at Incenteev: a conversational assistant that answers employee questions from the company’s own knowledge base.",
    stats: [
      { value: "End-to-end", label: "Owned problem to post-launch" },
      { value: "Sole PM", label: "On the initiative" },
      { value: "2026", label: "Shipped" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "Incenteev’s customers were sitting on large internal knowledge bases that nobody read. Answers existed, but finding them meant knowing where to look — so employees asked colleagues instead, and the same questions were answered over and over.",
          "The bet was that a conversational layer on top of that existing content would turn a dead archive into something people use daily. I owned the initiative from problem identification through to post-launch tracking.",
        ],
      },
      {
        heading: "What I did",
        list: [
          "Ran the discovery: user interviews and surveys to establish which questions actually got asked, and how often existing search failed to answer them.",
          "Defined the scope and the guardrails — what the bot should answer confidently, where it should defer to a human, and how it should cite its sources.",
          "Wrote the specifications and worked with the dev team through delivery as the sole PM on the initiative.",
          "Set up post-launch tracking so that answer quality and adoption were measurable rather than anecdotal.",
        ],
      },
      {
        heading: "Impact",
        list: [
          "Shipped as one of the two flagship AI initiatives in the Incenteev product line.",
          "Turned an underused knowledge base into a queryable, everyday tool.",
          "Established the pattern the company reused for later AI features.",
        ],
      },
    ],
    gallery: {
      layout: "phone",
      items: [
        { src: "assets/img/knowledge-bot/entry-point.png", caption: "The entry point: “Recherche avec l’IA” sits right on the Documents library." },
        { src: "assets/img/knowledge-bot/welcome.png", caption: "The assistant explains up front what it can search." },
        { src: "assets/img/knowledge-bot/answer.png", caption: "Answers carry a reminder to double-check important information." },
        { src: "assets/img/knowledge-bot/sources.png", caption: "Every answer cites its source files and asks for feedback." },
      ],
    },
    stack: ["Discovery", "User interviews", "Spec writing", "AI product management", "Amplitude", "Jira"],
  },
  {
    slug: "incenteev-lms-feature",
    peek: {
      problem: "Programs hadn’t changed since launch and no longer matched the product.",
      solution: "A UI/UX redesign on the new design system, with zero backend changes.",
      outcome: "Discovery to final UI in one month, as a PM and designer duo.",
    },
    name: "Incenteev",
    tagline: "LMS redesign",
    thumb: "assets/img/work-incenteev-lms-feature.png",
    year: "2026",
    role: "Product Manager",
    company: "Incenteev",
    timeframe: "2026",
    summary:
      "A UI/UX redesign of Programs, the training feature of the Incenteev platform. It had barely changed since launch, so the goal was to bring it up to the rest of the product and the new design system, without touching the backend.",
    stats: [
      { value: "1 month", label: "Discovery to final UI" },
      { value: "PM + Designer", label: "Discovery team" },
      { value: "0", label: "Backend changes" },
    ],
    sections: [
      {
        heading: "Context",
        body: [
          "Programs had been part of Incenteev since the very beginning and had never had a significant design update. Around it, the product kept moving: new features shipped, the design system was updated and platform expectations changed. Programs didn’t keep pace.",
          "The result was a visual language that no longer matched the rest of the product, a UI that wasn’t pulling its weight, and good design resources that the feature wasn’t using. For all training users, that risked eroding trust and perceived quality.",
        ],
      },
      {
        heading: "Why now",
        list: [
          "Aligning with the broader design system rollout.",
          "Improving adoption and engagement on an underused feature.",
          "Maintaining the product’s quality perception as we scaled and brought in new users.",
        ],
      },
      {
        heading: "Scope",
        list: [
          "In: a UI/UX redesign of the Programs feature, with design and layout changes only.",
          "Out: new functionality, backend, API or feature-logic changes, and other features.",
        ],
      },
      {
        heading: "What I did",
        list: [
          "Mined existing user feedback and filtered it with AI to isolate the UI-specific signals.",
          "Ran user interviews with internal users focused on Programs UI pain points.",
          "Led internal UX audit sessions across every Programs flow.",
          "Benchmarked Coursera, Udemy and OpenClassrooms for modern learning patterns.",
          "Ran a workshop with designers and PMs, then worked with our product designer through to the final UI.",
        ],
      },
      {
        heading: "Risks we framed",
        list: [
          "Some pain points could turn out to be structural rather than solvable through design alone.",
          "Benchmark patterns might not fit our users, whose mental models differ from those of consumer learners.",
        ],
      },
      {
        heading: "Success signals",
        list: [
          "Increased engagement on Programs screens.",
          "Fewer UI-related support tickets and complaints.",
          "Positive feedback in post-launch interviews.",
        ],
      },
    ],
    gallery: {
      layout: "wide",
      items: [
        { src: "assets/img/lms/program-overview.png", caption: "Program overview: progress, the next step and who to ask for help, all on one screen." },
        { src: "assets/img/lms/program-overview-progress.png", caption: "Further along, finished parts collapse so the current one stays in focus." },
        { src: "assets/img/lms/step-document.png", caption: "Step view: the program outline stays beside the content." },
        { src: "assets/img/lms/step-current.png", caption: "Completed steps are checked off in the outline as you go." },
        { src: "assets/img/lms/step-done.png", caption: "Marking a step as done." },
        { src: "assets/img/lms/part-complete.png", caption: "Finishing a part: a short celebration and a clear way into the next one." },
      ],
    },
    stack: ["Discovery", "User interviews", "UX audit", "Benchmarking", "Design system", "Figma"],
  },
  {
    slug: "chassle-ui-design",
    peek: {
      problem: "Handing off everyday jobs, from furniture to moving house, is a hassle.",
      solution: "The interfaces and visual language for a TaskRabbit-style marketplace.",
      outcome: "Screens and branding, with the full case study on Behance.",
    },
    name: "Chassle",
    tagline: "UI design",
    thumb: "assets/img/work-chassle-ui-design.png",
    year: "—",
    role: "UX/UI Designer",
    company: "Chassle",
    summary:
      "A service marketplace app in the spirit of TaskRabbit: people post everyday jobs and get matched with someone nearby to take care of them.",
    sections: [
      {
        heading: "The project",
        body: [
          "Chassle comes from my years as a UX/UI designer. The brief was simple: design the interfaces for an app that takes everyday hassles off people’s hands, from assembling furniture to moving house.",
          "The process was mostly interface design. I built the screens and the visual language they share in Figma.",
        ],
      },
    ],
    link: {
      label: "See the full project on Behance",
      href: "https://www.behance.net/gallery/179997779/Chassle-Brand-Identity-by-Falta-Studio",
    },
    stack: ["UI design", "Branding", "Figma"],
  },
];

// The two stat cells on the left of the career grid.
export const careerStats = [
  { value: "+3 years", label: "Product management" },
  { value: "+4 years", label: "Design experience" },
];

// Career renders as the bordered grid on the index. Sourced from the CV.
// `logo` is the company mark at the top of each cell. Square app icons fill
// their tile; `wordmark: true` gets a wide white tile instead.
export const career = [
  {
    role: "Lead Product Manager",
    company: "Soft.eu",
    period: "2026",
    logo: "assets/img/logos/soft.png",
    note: "MVP live in one month from scratch, leading four developers and two designers.",
  },
  {
    role: "Product Manager",
    company: "Incenteev",
    period: "2024",
    logo: "assets/img/logos/incenteev.png",
    note: "30+ sprints as sole PM, 20+ discovery subjects owned end-to-end including two AI initiatives.",
  },
  {
    role: "UX/UI Designer",
    company: "Rooly",
    period: "2023",
    logo: "assets/img/logos/rooly.png",
    note: "A design system plus 100+ wireframes and interfaces, integrating three apps into one platform.",
  },
  {
    role: "UX/UI Instructor",
    company: "GOMYCODE",
    period: "2021",
    logo: "assets/img/logos/gomycode.png",
    wordmark: true,
    note: "100+ students guided to graduation and 10+ new instructors mentored.",
  },
];

// Not rendered by the v2 design, which has no education or skills section.
// Kept because it is the only place this is written down — wire it into
// build.mjs if a section for it ever gets designed.
export const education = [
  {
    title: "Software Engineer",
    place: "L’École Supérieure Privée d’Ingénierie et de Technologie",
    period: "2018 — 2024",
  },
];

export const skills = {
  hard: [
    "Product Strategy", "Roadmap Planning", "Spec Writing", "Jira", "Figma",
    "Claude / Claude Code", "AI Product Management", "Wireframing",
    "User Research", "User Interviews / Surveys", "UX/UI", "Notion", "Amplitude",
  ],
  soft: [
    "Public Speaking", "Time Management", "Strategic Thinking",
    "Problem Solving", "Teamwork", "Team Leadership",
  ],
  languages: ["French — Advanced", "English — Advanced", "Arabic — Native"],
};

// The About me section, just before the contact box. `lead` is split so the
// highlighted words can take the marker; `interests` render as stickers.
export const about = {
  lead: ["Hi, I’m Houssem. What I’ve loved doing since I was a kid is", "solving problems", "."],
  body: [
    "Whether it’s fixing my bike or figuring out how to double a feature’s usage, it’s the same itch. I’m an engineer by training and a designer by passion, and after a few years working as a designer I decided to combine both skills. That’s how my passion for product management was born.",
    "As for my personality: I’m a sociable person. I love human interaction and conversation, especially the spontaneous kind. I like being clean and structured, in my professional life as much as my personal one, and I love people who smile often and are easygoing.",
    "I’m passionate about football and cars (it may be a cliché, but I love them anyway), and I enjoy sports of all kinds. And like everyone, I sometimes get obsessed with something for a short while, then completely forget about it.",
  ],
  interests: ["Football", "Cars", "Sports of all kinds", "Spontaneous chats", "Short-lived obsessions"],
  cta: "Want to get to know me better? Let’s get in touch!",
};

// The closing call to action.
export const contact = {
  heading: "Let’s start designing your project",
  body: "Want to see how to turn a messy problem into a product people actually use? Send me a message.",
  cta: "Send me a message",
};

/**
 * Single source of truth for the CV content on the site.
 *
 * Everything here mirrors "Daffa Akbar — Curriculum Vitae" (Sep 2026). When the
 * CV changes, change it here too — the pages read from this file only.
 */

export const profile = {
  name: 'Daffa Akbar',
  firstName: 'Daffa',
  role: 'AI Engineer',
  initial: 'DA',
  discipline: 'Software Engineer',
  company: 'PT. Mitra Pinasthika Mulia',
  /** The hero paragraph. One plain sentence, drawn from the CV summary. */
  pitch:
    'I build and operate production LLM infrastructure — self-hosted model serving, a central AI gateway, and agent workflows wired into enterprise data.',
  /** About section. Two short, factual paragraphs. */
  bio: [
    'I am an AI Engineer at PT. Mitra Pinasthika Mulia, a logistics company distributing Honda motorcycles. I built and operate the company LLM serving infrastructure on vLLM, introduced LiteLLM as a central gateway for internal applications, and develop LLM-backed applications with LangChain and LangGraph — including an internal agent builder and an integration that opens the enterprise data warehouse to natural-language querying.',
    'Before the AI role I spent four and a half years at the same company as a Senior IT Application Developer, breaking legacy monoliths into Node.js and .NET microservices, introducing Docker-based delivery and CI/CD, and mentoring the team on developer tooling. I have taken freelance web projects alongside that since 2020.'
  ],
  location: 'Surabaya, Indonesia',
  timezone: 'GMT+7',
  /** IANA zone behind the live clock in the hero title block. */
  timezoneId: 'Asia/Jakarta',
  availability: {
    open: true,
    label: 'Open to new roles'
  },
  email: 'daffaputradamar@gmail.com',
  /**
   * On the CV but deliberately not published here — a portfolio page is
   * crawled and scraped in a way a PDF sent to a recruiter is not. Add it to
   * `socials` below if you would rather have it public.
   */
  phone: '+62 857-5555-7954',
  resumeUrl: '/docs/cv-daffa.pdf',
  siteUrl: 'https://portofoliodaffa.vercel.app'
} as const

export const socials = [
  {
    name: 'GitHub',
    handle: '@daffaputradamar',
    href: 'https://github.com/daffaputradamar'
  },
  {
    name: 'LinkedIn',
    handle: '/in/daffaputradamar',
    href: 'https://linkedin.com/in/daffaputradamar'
  },
  {
    name: 'Email',
    handle: profile.email,
    href: `mailto:${profile.email}`
  }
] as const

/** Hero stat strip. Every figure is backed by the CV. */
export const stats = [
  { figure: '5+', label: 'Years experience' },
  { figure: '2', label: 'Current roles' },
  { figure: '3.91', label: 'GPA / 4.00' }
] as const

export type Experience = {
  role: string
  company: string
  companyUrl?: string
  /** Free text — 'Jan 2026 — Present' reads better than two date fields. */
  period: string
  /** Full-time, Contract or Freelance. */
  type: string
  location: string
  /** One line of context on the organisation or the mandate. */
  summary: string
  /** Achievements, taken from the CV. */
  highlights: string[]
  stack: string[]
  current?: boolean
  /**
   * The diagram that explains this role. 'platform' points back to Fig. 01 in
   * Selected Work; 'decomposition' draws Fig. 02 in place.
   */
  figure?: 'platform' | 'decomposition'
}

export const experiences: Experience[] = [
  {
    role: 'AI Engineer',
    company: 'PT. Mitra Pinasthika Mulia',
    period: 'Jan 2026 — Present',
    type: 'Full-time',
    location: 'Surabaya, Indonesia',
    summary:
      'A logistics company specialising in the distribution of Honda motorcycles.',
    highlights: [
      'Built and operated the company LLM serving infrastructure with vLLM, deploying and running self-hosted models on internal hardware.',
      'Introduced LiteLLM as a central AI gateway, giving internal applications a single interface across self-hosted and third-party models with unified routing, authentication and usage tracking.',
      'Developed and integrated LLM-backed applications using LangChain to power an internal agent builder, and LangGraph for stateful, multi-step agentic workflows.',
      'Integrated LLM services with the enterprise data warehouse, opening operational data to natural-language querying and retrieval.'
    ],
    stack: ['vLLM', 'LiteLLM', 'LangChain', 'LangGraph', 'Ollama', 'Python'],
    current: true,
    figure: 'platform'
  },
  {
    role: 'Senior IT Application Developer',
    company: 'PT. Mitra Pinasthika Mulia',
    period: 'Jul 2021 — Dec 2025',
    type: 'Full-time',
    location: 'Surabaya, Indonesia',
    summary:
      'Backend and platform work across the group internal application estate.',
    highlights: [
      'Architected and implemented microservices-based backend systems (Node.js / .NET) to modularise legacy monolithic solutions, improving deployment agility.',
      'Led cross-functional coordination with system analysts and stakeholders to define system architecture and keep each new module aligned with business goals.',
      'Introduced containerisation with Docker for scalable deployments and CI/CD, reducing resource cost and provisioning time.',
      'Mentored other developers and advocated for developer-tool adoption (GitHub Copilot, Google Gemini, Ollama) to accelerate code quality and productivity.'
    ],
    stack: [
      'Node.js',
      '.NET',
      'Microservices',
      'Docker',
      'Apache Kafka',
      'SQL Server'
    ],
    figure: 'decomposition'
  },
  {
    role: 'Web Developer',
    company: 'Freelance',
    period: 'Mar 2020 — Present',
    type: 'Freelance',
    location: 'Remote',
    summary: 'Independent web development projects.',
    highlights: [
      'Developed bespoke web applications for clients including educational institutions and retail shops, choosing the framework to suit each project.'
    ],
    stack: ['Next.js', 'React', 'Vue.js', 'Laravel', 'PostgreSQL', 'Firebase'],
    current: true
  }
]

export type Education = {
  qualification: string
  institution: string
  period: string
  /** Final grade on its own, so the scale in Background can draw it. */
  gpa?: { score: number; max: number }
  note?: string
}

export const education: Education[] = [
  {
    qualification: 'Bachelor of Applied Computer Science',
    institution: 'State Polytechnic of Malang',
    period: '2017 — 2021',
    gpa: { score: 3.91, max: 4 },
    note: 'Malang, Indonesia'
  }
]

/** The CV "Key achievements" block. */
export const achievements = [
  {
    title: 'Company-wide AI initiative',
    body: 'Initiated AI adoption at company level, taking LLM infrastructure and applications from proposal through to production use across the business.'
  },
  {
    title: 'Leadership in IT community',
    body: 'Led an IT community as Head of Research and Development, building skills and knowledge within the group.'
  }
] as const

export const languages = [
  { name: 'Indonesian', level: 'Native' },
  { name: 'English', level: 'Proficient' }
] as const

/** The three areas of work to be hired for, drawn from the CV summary. */
export const capabilities = [
  {
    title: 'LLM infrastructure',
    body: 'Self-hosted model serving and a central gateway that fronts every internal application.',
    items: [
      'vLLM model serving',
      'LiteLLM gateway',
      'Ollama',
      'Routing, auth & usage tracking'
    ]
  },
  {
    title: 'Agent development',
    body: 'LLM-backed applications and stateful, multi-step agent workflows over enterprise data.',
    items: [
      'LangChain',
      'LangGraph',
      'Internal agent builder',
      'Data warehouse retrieval'
    ]
  },
  {
    title: 'Backend & platform',
    body: 'The microservices, containers and pipelines the rest of it runs on.',
    items: [
      'Node.js & .NET',
      'Microservices architecture',
      'Docker & CI/CD',
      'PostgreSQL & SQL Server'
    ]
  }
] as const

/** Feeds the hero marquee. Order is reading order, so lead with your strengths. */
export const marqueeSkills = [
  'vLLM',
  'LiteLLM',
  'LangChain',
  'LangGraph',
  'Python',
  'TypeScript',
  'Node.js',
  '.NET',
  'Microservices',
  'Next.js',
  'React',
  'Apache Kafka',
  'PostgreSQL',
  'Docker'
] as const

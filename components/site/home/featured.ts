/**
 * The in-house systems named on the home page and in the sidebar tree, in the
 * order they are listed. Slugs of files in content/projects.
 */
export const PLATFORM_SLUGS = [
  'agent-builder',
  'rag-knowledge-base',
  'app-consultant',
  'successor-planning'
] as const

/**
 * Personal and freelance projects shown on the home page and in the sidebar
 * tree, in this order. Slugs of files in content/projects.
 */
export const WORK_SLUGS = [
  'job-looker',
  'bidik-asn',
  'finance-family',
  'questionnaire',
  'workshop-mis'
] as const

/**
 * The in-house AI projects, grouped by what they are for. The first three
 * groups match the three kinds of application in the platform figure. Slugs
 * of files in content/projects; titles come from the project files.
 */
export const PLATFORM_GROUPS = [
  {
    title: 'Assistants',
    dir: 'assistants',
    glyph: 'chat',
    node: 'node-assistants',
    body: 'Chat assistants that answer staff and dealer questions from the company’s own documents and data.',
    slugs: [
      'marketing-chatbot',
      'callmsd',
      'halo-tsd',
      'policy-assistant',
      'legal-talk',
      'helpdesk-agent'
    ]
  },
  {
    title: 'Document checks',
    dir: 'documents',
    glyph: 'document',
    node: 'node-documents',
    body: 'Readers that turn photos and scans into structured data, then check it against the rules.',
    slugs: [
      'ocr-llm',
      'family-card-reader',
      'claim-document-validation',
      'btl-corrector',
      'stnk-validation',
      'odometer-validation'
    ]
  },
  {
    title: 'Agents & tools',
    dir: 'agents',
    glyph: 'agents',
    node: 'node-agents',
    body: 'Agent workflows and internal tools that plan, call tools and produce a finished result.',
    slugs: [
      'agent-builder',
      'rag-knowledge-base',
      'app-consultant',
      'rewangit',
      'tuturaksara',
      'noto',
      'wicara'
    ]
  },
  {
    title: 'Analysis & decisions',
    dir: 'analysis',
    glyph: 'analysis',
    node: undefined,
    body: 'Tools that sort, score and recommend, with a person approving what matters.',
    slugs: [
      'successor-planning',
      'open-question-converter',
      'summary-blogger',
      'service-pattern-intelligence'
    ]
  }
] as const

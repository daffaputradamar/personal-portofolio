import { education, experiences, profile, socials } from './resume'

/**
 * schema.org JSON-LD. Everything hangs off one Person node with a stable
 * `@id`, so posts and projects reference the author instead of restating them,
 * and search engines can tie the pages to one knowledge-panel entity.
 */

const site = profile.siteUrl
export const PERSON_ID = `${site}/#person`
const WEBSITE_ID = `${site}/#website`

const current = experiences.find(
  role => role.current && role.type === 'Full-time'
)

export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: profile.name,
        url: site,
        image: `${site}/images/authors/me.jpg`,
        jobTitle: profile.role,
        description: profile.pitch,
        email: `mailto:${profile.email}`,
        ...(current && {
          worksFor: { '@type': 'Organization', name: current.company }
        }),
        address: {
          '@type': 'PostalAddress',
          addressLocality: profile.location.split(',')[0].trim(),
          addressCountry: 'ID'
        },
        alumniOf: education.map(item => ({
          '@type': 'CollegeOrUniversity',
          name: item.institution
        })),
        knowsAbout: [
          'Large language models',
          'LLM serving',
          'vLLM',
          'LiteLLM',
          'LangChain',
          'LangGraph',
          'Retrieval-augmented generation',
          'AI agents',
          'Microservices',
          'Node.js',
          '.NET',
          'Next.js',
          'TypeScript',
          'Python',
          'Docker'
        ],
        knowsLanguage: ['id', 'en'],
        sameAs: socials
          .filter(social => social.href.startsWith('http'))
          .map(social => social.href)
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: site,
        name: `${profile.name} — ${profile.role}`,
        inLanguage: 'en',
        publisher: { '@id': PERSON_ID }
      }
    ]
  }
}

export function articleGraph({
  type,
  path,
  title,
  description,
  datePublished,
  image,
  keywords
}: {
  type: 'BlogPosting' | 'CreativeWork'
  path: string
  title?: string
  description?: string
  datePublished?: string
  image?: string
  keywords?: string[]
}) {
  const url = `${site}${path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${url}#article`,
        ...(type === 'BlogPosting' && { headline: title }),
        name: title,
        description,
        url,
        mainEntityOfPage: url,
        datePublished,
        image: image ? new URL(image, site).toString() : undefined,
        keywords: keywords?.join(', '),
        inLanguage: 'en',
        author: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site },
          {
            '@type': 'ListItem',
            position: 2,
            name: type === 'BlogPosting' ? 'Writing' : 'Work',
            item: `${site}/${path.split('/')[1]}`
          },
          { '@type': 'ListItem', position: 3, name: title, item: url }
        ]
      }
    ]
  }
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import MDXContent from '@/components/mdx-content'
import { ContactCta } from '@/components/site/contact-cta'
import { Reveal } from '@/components/site/reveal'
import { JsonLd } from '@/components/json-ld'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { articleGraph } from '@/lib/structured-data'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(project => ({ slug: project.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const project = await getProjectBySlug(slug)

  if (!project) return { title: 'Project not found' }

  const { title, summary, image } = project.metadata

  return {
    title,
    description: summary,
    alternates: { canonical: `/projects/${slug}` },
    // Setting openGraph here replaces the site-wide block, so the shared card
    // has to be named again for projects without their own image.
    openGraph: {
      title: title ?? undefined,
      description: summary,
      url: `/projects/${slug}`,
      type: 'article',
      images: [image ?? '/opengraph-image']
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? undefined,
      description: summary,
      images: [image ?? '/twitter-image']
    }
  }
}

export default async function Project(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const {
    title,
    image,
    author,
    publishedAt,
    link,
    confidential,
    company,
    role,
    tech
  } = metadata

  // Next project, so the page always offers somewhere to go.
  const all = await getProjects()
  const index = all.findIndex(item => item.slug === slug)
  const next = all[(index + 1) % all.length]

  return (
    <>
      <JsonLd
        data={articleGraph({
          type: 'CreativeWork',
          path: `/projects/${slug}`,
          title,
          description: metadata.summary,
          datePublished: publishedAt,
          image,
          keywords: tech
        })}
      />
      <article>
        <header className='container pt-32 pb-12 md:pt-40'>
          <Link
            href='/projects'
            className='group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
          >
            <svg
              aria-hidden
              viewBox='0 0 24 24'
              className='h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              <path d='M19 12H5M11 6l-6 6 6 6' strokeLinecap='round' />
            </svg>
            <span>All work</span>
          </Link>

          <div className='mt-12 grid gap-8 md:grid-cols-12 md:items-end'>
            <h1 className='display text-display text-balance md:col-span-8'>
              {title}
            </h1>

            <div className='md:col-span-4'>
              <dl className='space-y-3'>
                <div className='rule flex items-baseline justify-between gap-4 pt-3'>
                  <dt className='eyebrow'>Year</dt>
                  <dd className='text-sm'>
                    {publishedAt ? formatDate(publishedAt) : '—'}
                  </dd>
                </div>
                <div className='rule flex items-baseline justify-between gap-4 pt-3'>
                  <dt className='eyebrow'>Role</dt>
                  <dd className='text-right text-sm'>
                    {role ?? author ?? 'Developer'}
                  </dd>
                </div>
                {company && (
                  <div className='rule flex items-baseline justify-between gap-4 pt-3'>
                    <dt className='eyebrow'>Client</dt>
                    <dd className='text-right text-sm'>{company}</dd>
                  </div>
                )}
                {confidential && !link && (
                  <div className='rule flex items-baseline justify-between gap-4 pt-3'>
                    <dt className='eyebrow'>Access</dt>
                    <dd className='text-right text-sm text-muted-foreground'>
                      Internal only
                    </dd>
                  </div>
                )}
                {link && (
                  <div className='rule flex items-baseline justify-between gap-4 pt-3'>
                    <dt className='eyebrow'>Live</dt>
                    <dd className='text-sm'>
                      <a
                        href={link}
                        target='_blank'
                        rel='noreferrer'
                        className='link-underline inline-flex items-center gap-1.5 text-foreground'
                      >
                        Visit site
                        <svg
                          aria-hidden
                          viewBox='0 0 24 24'
                          className='h-3.5 w-3.5'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.75'
                        >
                          <path
                            d='M7 17 17 7M17 7H9M17 7v8'
                            strokeLinecap='round'
                          />
                        </svg>
                      </a>
                    </dd>
                  </div>
                )}
              </dl>

              {tech && tech.length > 0 && (
                <ul className='mt-6 flex flex-wrap gap-2'>
                  {tech.map(item => (
                    <li
                      key={item}
                      className='rounded-full bg-surface px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide text-muted-foreground'
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {image && (
          <Reveal className='container' offset={16}>
            <div className='relative aspect-video w-full overflow-hidden rounded-sm bg-surface'>
              <Image
                src={image}
                alt={title || ''}
                fill
                sizes='(min-width: 1280px) 80rem, 100vw'
                className='object-cover'
                priority
              />
            </div>
          </Reveal>
        )}

        {!image && confidential && (
          <Reveal className='container' offset={16}>
            <div className='flex flex-col gap-3 rounded-sm border border-line bg-surface px-6 py-7 sm:flex-row sm:items-start sm:gap-5'>
              <svg
                viewBox='0 0 24 24'
                className='h-5 w-5 shrink-0 text-muted-foreground'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                aria-hidden
              >
                <rect x='4' y='10.5' width='16' height='10' rx='2' />
                <path d='M8 10.5V7a4 4 0 0 1 8 0v3.5' />
              </svg>
              <div>
                <p className='text-sm text-foreground'>
                  Internal system &mdash; no public link or screenshots.
                </p>
                <p className='mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
                  What follows describes the problem, the approach and the
                  engineering decisions at a level that discloses no proprietary
                  detail.
                </p>
              </div>
            </div>
          </Reveal>
        )}

        <div className='container-prose py-20 md:py-28'>
          <div className='prose-editorial'>
            <MDXContent source={content} />
          </div>
        </div>
      </article>

      {/* Next project */}
      {next && next.slug !== slug && (
        <section className='rule'>
          <Link
            href={`/projects/${next.slug}`}
            className='group block py-16 md:py-24'
          >
            <div className='container'>
              <p className='eyebrow'>Next project</p>
              <div className='mt-4 flex items-center justify-between gap-6'>
                <h2 className='display text-headline transition-transform duration-600 ease-editorial group-hover:translate-x-2'>
                  {next.title}
                </h2>
                <svg
                  aria-hidden
                  viewBox='0 0 24 24'
                  className='h-6 w-6 shrink-0 text-muted-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:text-foreground'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.25'
                >
                  <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' />
                </svg>
              </div>
            </div>
          </Link>
        </section>
      )}

      <ContactCta />
    </>
  )
}

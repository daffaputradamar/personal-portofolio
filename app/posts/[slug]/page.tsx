import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import MDXContent from '@/components/mdx-content'
import { Reveal } from '@/components/site/reveal'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { profile } from '@/lib/resume'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)

  if (!post) return { title: 'Post not found' }

  const { title, summary, image, publishedAt } = post.metadata

  return {
    title,
    description: summary,
    alternates: { canonical: `/posts/${slug}` },
    openGraph: {
      title: title ?? undefined,
      description: summary,
      type: 'article',
      publishedTime: publishedAt,
      images: image ? [{ url: image }] : undefined
    }
  }
}

/** ~200 wpm, floored at a minute. Good enough to set expectations. */
function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default async function Post(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const { title, image, author, publishedAt } = metadata

  const all = await getPosts()
  const index = all.findIndex(item => item.slug === slug)
  const next = all[(index + 1) % all.length]

  return (
    <>
      <article>
        <header className='container-prose pt-32 pb-12 md:pt-40'>
          <Link
            href='/posts'
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
            <span>All writing</span>
          </Link>

          <h1 className='display mt-10 text-headline text-balance'>{title}</h1>

          <div className='rule mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 pt-5'>
            <span className='eyebrow'>{author ?? profile.name}</span>
            {publishedAt && (
              <span className='eyebrow'>{formatDate(publishedAt)}</span>
            )}
            <span className='eyebrow'>{readingTime(content)} min read</span>
          </div>
        </header>

        {image && (
          <Reveal className='container-prose' offset={16}>
            <div className='relative aspect-video w-full overflow-hidden rounded-sm bg-surface'>
              <Image
                src={image}
                alt={title || ''}
                fill
                sizes='(min-width: 768px) 48rem, 100vw'
                className='object-cover'
                priority
              />
            </div>
          </Reveal>
        )}

        <div className='container-prose py-16 md:py-20'>
          <div className='prose-editorial'>
            <MDXContent source={content} />
          </div>
        </div>
      </article>

      {next && next.slug !== slug && (
        <section className='rule'>
          <Link
            href={`/posts/${next.slug}`}
            className='group block py-14 md:py-20'
          >
            <div className='container-prose'>
              <p className='eyebrow'>Read next</p>
              <div className='mt-4 flex items-center justify-between gap-6'>
                <h2 className='display text-2xl transition-transform duration-600 ease-editorial group-hover:translate-x-2 md:text-3xl'>
                  {next.title}
                </h2>
                <svg
                  aria-hidden
                  viewBox='0 0 24 24'
                  className='h-5 w-5 shrink-0 text-muted-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:text-foreground'
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
    </>
  )
}

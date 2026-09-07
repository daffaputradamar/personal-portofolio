import Link from 'next/link'

import type { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { Reveal } from './reveal'

/**
 * Post index. The date sits in a narrow mono column so titles align to a single
 * vertical edge down the page.
 */
export function PostList({ posts }: { posts: PostMetadata[] }) {
  if (posts.length === 0) {
    return (
      <p className='rule py-10 text-sm text-muted-foreground'>
        Nothing published yet.
      </p>
    )
  }

  return (
    <ul>
      {posts.map((post, i) => (
        <li key={post.slug}>
          <Reveal delay={Math.min(i, 6) * 0.05}>
            <Link
              href={`/posts/${post.slug}`}
              className='rule group grid gap-2 py-7 md:grid-cols-12 md:gap-8'
            >
              <div className='md:col-span-3'>
                <span className='eyebrow transition-colors duration-500 group-hover:text-signal'>
                  {post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}
                </span>
              </div>

              <div className='md:col-span-9'>
                <h3 className='display text-xl leading-snug transition-transform duration-600 ease-editorial md:text-2xl md:group-hover:translate-x-1.5'>
                  {post.title}
                </h3>
                <p className='mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground'>
                  {post.summary}
                </p>
                <span className='mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                  Read
                  <svg
                    aria-hidden
                    viewBox='0 0 24 24'
                    className='h-3.5 w-3.5'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  >
                    <path d='M5 12h14M13 6l6 6-6 6' strokeLinecap='round' />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

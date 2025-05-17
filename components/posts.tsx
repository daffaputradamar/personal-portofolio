'use client'
import Link from 'next/link'

import { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { useState } from 'react'
import { BlurFade } from './magicui/blur-fade'

export default function Posts({ posts }: { posts: PostMetadata[] }) {
  
  const [postHovered, setPostHovered] = useState<number | null>(null)
  const [isListHovered, setIsListHovered] = useState(false)

  return (
    <ul className='flex flex-col gap-4'>
      {posts.map((post, idx) => (
        <BlurFade key={post.slug} inView>
          <li onMouseOver={() => {setPostHovered(idx); setIsListHovered(true)}} onMouseOut={() => {setPostHovered(null); setIsListHovered(false)}}>
            <Link
              href={`/posts/${post.slug}`}
              className={`flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row border-t-2 border-transparent hover:bg-primary/10 hover:border-primary/40 hover:shadow-md rounded-md p-5 transition duration-200`}
            >
              <div className='max-w-lg'>
                <p className={`text-lg font-semibold ${(postHovered !== idx && isListHovered) ? 'text-muted-foreground/70' : 'text-foreground'}`}>{post.title}</p>
                <p className={`mt-1 line-clamp-2 text-sm font-light ${(postHovered !== idx && isListHovered) ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                  {post.summary}
                </p>
              </div>
              {post.publishedAt && (
                <p className={`mt-1 text-sm font-light ${(postHovered !== idx && isListHovered) ? 'text-muted-foreground/70' : 'text-foreground'}`}>
                  {formatDate(post.publishedAt)}
                </p>
              )}
            </Link>
          </li>
        </BlurFade>
      ))}
    </ul>
  )
}

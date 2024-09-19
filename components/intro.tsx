'use client'

import Image from 'next/image'
import authorImage from '@/public/images/authors/me.jpg'
import { Button, buttonVariants } from './ui/button'
import { DownloadIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='title no-underline'>Hey, I&#39;m Daffa.</h1>
        <p className='mt-3 font-light text-muted-foreground'>
          I&#39;m a software engineer based in Surabaya, Indonesia. I&#39;m
          passionate about learning new technologies and sharing knowledge with
          others.
        </p>
        <a href="docs/cv-daffa.pdf" download className={cn('mt-4 flex gap-x-2',buttonVariants())}>Download CV <DownloadIcon className='animate-bounce' /></a>
      </div>
      <div className='relative'>
        <Image
          className='flex-1 rounded-lg'
          src={authorImage}
          alt='Daffa Akbar'
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}

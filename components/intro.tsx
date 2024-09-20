'use client'

import Image from 'next/image'
import authorImage from '@/public/images/authors/me.jpg'
import { Button, buttonVariants } from './ui/button'
import { DownloadIcon, EnvelopeClosedIcon, EnvelopeOpenIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'

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
        <div className="mt-8 md:mt-4 flex flex-col md:flex-row items-center gap-4"> 
          <a href="docs/cv-daffa.pdf" download className={cn('w-full flex gap-x-2', buttonVariants({size: 'lg'}))}>Download Resume <DownloadIcon className='animate-bounce w-6' /></a>
          <Link href="/contact" className={cn('w-full flex gap-x-2', buttonVariants({size: 'lg', variant: 'outline'}))}>Contact Me <EnvelopeClosedIcon className='w-6' /></Link>
        </div>
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

'use client'

import Image from 'next/image'
import authorImage from '@/public/images/authors/me.jpg'
import { buttonVariants } from './ui/button'
import { EnvelopeClosedIcon, EnvelopeOpenIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center h-[calc(100vh-150px)] md:h-auto'>
      <div className='mt-2 flex-1 md:mt-0 flex flex-col justify-between'>
        <div>
          <h1 className='title no-underline'>Hey, I&#39;m Daffa.</h1>
          <p className='mt-3 font-light text-muted-foreground'>
            I&#39;m a software engineer based in Surabaya, Indonesia. I&#39;m
            passionate about learning new technologies and sharing knowledge with
            others.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center gap-y-4 md:hidden'>
          <div className='wave-hello text-8xl text-center'>
            👋
          </div>
          <span className='text-2xl font-bold bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent'>
            Nice to meet you!
          </span>
        </div>
        <div className="mt-8 md:mt-4 flex flex-col md:flex-row items-center gap-5">
          <a href="docs/cv-daffa.pdf" target='_blank' className={cn('w-full flex gap-x-2', buttonVariants({ size: 'lg' }))}>View Full Résumé <ExternalLinkIcon className='w-6' /></a>
          <Link href="/contact" className={cn('w-full flex gap-x-2', buttonVariants({ size: 'lg', variant: 'outline' }))}>Contact Me <EnvelopeClosedIcon className='w-6' /></Link>
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
      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .wave-hello {
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}</style>
    </section>
  )
}

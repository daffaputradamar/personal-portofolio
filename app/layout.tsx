import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Newsreader } from 'next/font/google'

import { cn } from '@/lib/utils'
import { profile } from '@/lib/resume'

import 'lenis/dist/lenis.css'
import './globals.css'
import Providers from '@/components/providers'
import { Sidebar } from '@/components/site/sidebar'
import { siteGraph } from '@/lib/structured-data'
import { JsonLd } from '@/components/json-ld'
import { SiteFooter } from '@/components/site/site-footer'
import { Grain } from '@/components/site/grain'
import { ScrollProgress } from '@/components/site/scroll-progress'
import { SmoothScroll } from '@/components/site/smooth-scroll'

// Newsreader carries everything that is read, at every size.
const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap'
})

// The small developer marks: file names, heading hashes, stack lists.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap'
})

const description = `${profile.role} and ${profile.discipline} based in ${profile.location}. ${profile.pitch}`

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — ${profile.role} & ${profile.discipline}`,
    template: `%s — ${profile.name}`
  },
  description,
  keywords: [
    profile.name,
    'AI Engineer',
    'Software Engineer',
    'Next.js',
    'TypeScript',
    'vLLM',
    'LiteLLM',
    'LangChain',
    'LangGraph',
    'LLM engineer',
    'AI Engineer Indonesia',
    'AI Engineer Surabaya',
    'Surabaya',
    'Indonesia',
    'portfolio',
    'CV'
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  applicationName: `${profile.name} — Portfolio`,
  category: 'technology',
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profile.siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.role} & ${profile.discipline}`,
    description
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.role}`,
    description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: { canonical: '/' }
}

export const viewport: Viewport = {
  // The site opens on warm paper regardless of the OS setting, so the browser
  // chrome matches the light palette rather than following the system.
  themeColor: '#fbf8f1',
  colorScheme: 'light dark'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Reveal animations hide content until GSAP runs; without JS, show it. */}
        <JsonLd data={siteGraph()} />
        <noscript>
          <style>{`.gsap-reveal,.gsap-split,.agent-place{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          serif.variable,
          mono.variable
        )}
      >
        <Providers>
          <a
            href='#main'
            className='focus:bg-foreground focus:text-background sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:px-4 focus:py-2 focus:text-sm'
          >
            Skip to content
          </a>

          <SmoothScroll />
          <ScrollProgress />
          <div className='mx-auto flex w-full max-w-[92rem]'>
            <Sidebar />

            <div className='flex min-h-screen min-w-0 grow flex-col overflow-x-clip pb-12 lg:pb-0'>
              <main id='main' className='relative z-10 grow'>
                {children}
              </main>

              <SiteFooter />
            </div>
          </div>
          <Grain />
        </Providers>
      </body>
    </html>
  )
}

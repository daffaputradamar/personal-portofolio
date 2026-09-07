import type { Metadata, Viewport } from 'next'
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed
} from 'next/font/google'

import { cn } from '@/lib/utils'
import { profile } from '@/lib/resume'

import 'lenis/dist/lenis.css'
import './globals.css'
import Providers from '@/components/providers'
import { Nav } from '@/components/site/nav'
import { SiteFooter } from '@/components/site/site-footer'
import { Grain } from '@/components/site/grain'
import { ScrollProgress } from '@/components/site/scroll-progress'
import { SmoothScroll } from '@/components/site/smooth-scroll'

// IBM Plex was cut for engineering documentation, so the whole superfamily
// carries the datasheet register the site is built around.
const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap'
})

// Display sizes: condensed rather than a display serif, which is the pairing
// every generated portfolio ships with.
const display = IBM_Plex_Sans_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap'
})

// Carries every field label, index and figure on the site.
const mono = IBM_Plex_Mono({
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
    'Surabaya',
    'Indonesia',
    'portfolio'
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
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
    googleBot: { index: true, follow: true }
  },
  alternates: { canonical: '/' }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f4ee' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0c' }
  ]
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
        <noscript>
          <style>{`.gsap-reveal,.gsap-split{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          sans.variable,
          display.variable,
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
          <Nav />

          <main id='main' className='relative z-10 grow'>
            {children}
          </main>

          <SiteFooter />
          <Grain />
        </Providers>
      </body>
    </html>
  )
}

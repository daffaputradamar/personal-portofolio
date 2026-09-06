import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'
import { profile } from '@/lib/resume'

import './globals.css'
import Providers from '@/components/providers'
import { Nav } from '@/components/site/nav'
import { SiteFooter } from '@/components/site/site-footer'
import { Grain } from '@/components/site/grain'
import { Spotlight } from '@/components/site/spotlight'
import { ScrollProgress } from '@/components/site/scroll-progress'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

// Editorial display face — high contrast, tight fit at large sizes.
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap'
})

// Carries every eyebrow, label and metadatum on the site.
const mono = JetBrains_Mono({
  subsets: ['latin'],
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
            className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background'
          >
            Skip to content
          </a>

          <ScrollProgress />
          <Spotlight />
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

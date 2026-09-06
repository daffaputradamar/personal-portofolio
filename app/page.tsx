import { About } from '@/components/site/about'
import { Background } from '@/components/site/background'
import { ContactCta } from '@/components/site/contact-cta'
import { Experience } from '@/components/site/experience'
import { Hero } from '@/components/site/hero'
import { Marquee } from '@/components/site/marquee'
import { SelectedWork } from '@/components/site/selected-work'
import { Stack } from '@/components/site/stack'
import { Writing } from '@/components/site/writing'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Stack />
      <Experience />
      <Background />
      <SelectedWork />
      <Writing />
      <ContactCta />
    </>
  )
}

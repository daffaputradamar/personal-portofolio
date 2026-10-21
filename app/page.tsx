import { About } from '@/components/site/about'
import { Background } from '@/components/site/background'
import { ContactCta } from '@/components/site/contact-cta'
import { Experience } from '@/components/site/experience'
import { Hero } from '@/components/site/hero'
import { SelectedWork } from '@/components/site/selected-work'
import { Stack } from '@/components/site/stack'
import { Writing } from '@/components/site/writing'
import { getResumeSize } from '@/lib/resume-file'

export default function Home() {
  return (
    <>
      <Hero cvSize={getResumeSize()} />
      <SelectedWork />
      <About />
      <Stack />
      <Experience />
      <Background />
      <Writing />
      <ContactCta />
    </>
  )
}

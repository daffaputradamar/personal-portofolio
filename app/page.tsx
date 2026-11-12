import { ContactCta } from '@/components/site/contact-cta'
import { Background } from '@/components/site/home/background'
import { Hero } from '@/components/site/home/hero'
import { Platform } from '@/components/site/home/platform'
import { Skills } from '@/components/site/home/skills'
import { Work } from '@/components/site/home/work'
import { Writing } from '@/components/site/home/writing'
import { getResumeSize } from '@/lib/resume-file'

/** README.md: the home page, read top to bottom like a repository's readme. */
export default function Home() {
  return (
    <>
      <Hero cvSize={getResumeSize()} />
      <Platform />
      <Work />
      <Skills />
      <Background />
      <Writing />
      <ContactCta />
    </>
  )
}

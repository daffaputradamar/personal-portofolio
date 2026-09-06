import type { Metadata } from 'next'

import { PageHeader } from '@/components/site/page-header'
import { WorkList } from '@/components/site/work-list'
import { ContactCta } from '@/components/site/contact-cta'
import { Reveal } from '@/components/site/reveal'
import { getClientProjects, getInternalProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects: LLM infrastructure, internal AI platforms, and client web systems.',
  alternates: { canonical: '/projects' }
}

export default async function ProjectsPage() {
  const [internal, clientWork] = await Promise.all([
    getInternalProjects(),
    getClientProjects()
  ])

  return (
    <>
      <PageHeader
        eyebrow='Work'
        title='Projects.'
        lede='Internal platforms built in-house, plus client and personal work. Open any project for the details.'
        aside={
          <p className='eyebrow'>
            {internal.length + clientWork.length} projects &middot;{' '}
            {internal.length} in-house
          </p>
        }
      />

      <div className='container pb-24'>
        {internal.length > 0 && (
          <section className='mb-20'>
            <Reveal offset={12}>
              <div className='mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2'>
                <h2 className='eyebrow text-foreground'>
                  In-house &middot; PT. Mitra Pinasthika Mulia
                </h2>
                <p className='text-xs text-muted-foreground'>
                  Internal systems. Described at a level that discloses no
                  proprietary detail.
                </p>
              </div>
            </Reveal>
            <WorkList projects={internal} />
          </section>
        )}

        {clientWork.length > 0 && (
          <section>
            <Reveal offset={12}>
              <h2 className='eyebrow mb-2 text-foreground'>
                Freelance &amp; personal
              </h2>
            </Reveal>
            <WorkList projects={clientWork} />
          </section>
        )}
      </div>

      <ContactCta />
    </>
  )
}

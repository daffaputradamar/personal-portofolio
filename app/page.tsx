import Experiences from '@/components/experiences'
import Intro from '@/components/intro'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { TracingBeam } from '@/components/ui/tracing-beams'

export default function Home() {
  return (
    <section className='pb-24 pt-40'>
      <BackgroundBeams />

      <TracingBeam className='px-6'>
        <div className='container max-w-3xl'>
          <Intro />
          <Experiences />
          <RecentPosts />
          <RecentProjects />
        </div>
      </TracingBeam>

    </section>
  )
}

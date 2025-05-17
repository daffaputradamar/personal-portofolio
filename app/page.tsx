import Experiences from '@/components/experiences'
import Intro from '@/components/intro'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'
import { TracingBeam } from '@/components/ui/tracing-beams'

export default function Home() {
  return (
    <section className='pb-24 pt-40'>
      <TracingBeam className='px-6'>

      <ShootingStars />
      <StarsBackground />

      <div className='container max-w-3xl'>
        <Intro />
        <Experiences/>
        <RecentPosts />
        <RecentProjects />
      </div>

      </TracingBeam>
    </section>
  )
}

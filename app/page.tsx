import Experiences from '@/components/experiences'
import Intro from '@/components/intro'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'

export default function Home() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <Intro />
        <Experiences/>
        <RecentPosts />
        <RecentProjects />
      </div>
    </section>
  )
}

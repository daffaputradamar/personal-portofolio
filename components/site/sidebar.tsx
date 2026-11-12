import { getProjects, getProjectsBySlugs } from '@/lib/projects'
import { getResumeSize } from '@/lib/resume-file'
import { PLATFORM_SLUGS, WORK_SLUGS } from './home/featured'
import { MobileChrome } from './mobile-chrome'
import { SidebarTree } from './sidebar-tree'

/**
 * Site navigation: the site laid out as a small repository. Reads the project
 * list on the server so the tree always matches what is published, then hands
 * it to the desktop sidebar and to the phone's tabs-and-status-bar chrome.
 */
export async function Sidebar() {
  const [all, showcase] = await Promise.all([
    getProjects(),
    getProjectsBySlugs(WORK_SLUGS)
  ])

  const tree = {
    work: showcase.map(project => ({
      slug: project.slug,
      label: project.slug
    })),
    platform: PLATFORM_SLUGS.filter(slug =>
      all.some(project => project.slug === slug)
    ).map(slug => ({ slug, label: slug })),
    cvSize: getResumeSize()
  }

  return (
    <>
      <MobileChrome {...tree} />
      <SidebarTree {...tree} />
    </>
  )
}

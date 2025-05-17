import Image from 'next/image'
import Link from 'next/link'

import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'
import { BlurFade } from './magicui/blur-fade'
import { CardBody, CardContainer, CardItem } from './ui/3d-card'

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {projects.map(project => (
        <BlurFade inView key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}>
            <CardContainer containerClassName='py-0'>
              <CardBody className='h-full w-full'>
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {project.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2"
                >
                  {project.summary}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    height={300}
                    width={300}
                    src={project.image || ''}
                    alt={project.title || ''}
                    className='w-full object-cover rounded-xl group-hover/card:shadow-xl'
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </Link>

          {/* <li className='group'>
            <Link href={`/projects/${project.slug}`} className='flex flex-col'>
              {project.image && (
                <div className='relative h-72 w-full overflow-hidden bg-muted sm:h-60'>
                  <Image
                    src={project.image}
                    alt={project.title || ''}
                    fill
                    className='rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 rounded-lg bg-background/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                  <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                    <p className='line-clamp-1 text-sm text-muted-foreground'>
                      {project.summary}
                    </p>
                    <p className='text-xs font-light text-muted-foreground'>
                      {formatDate(project.publishedAt ?? '')}
                    </p>
                  </div>
                </div>
              )}

              <div className='mt-4'>
                <h2 className='title text-xl font-semibold no-underline'>
                  {project.title}
                </h2>
              </div>
            </Link>
          </li> */}
        </BlurFade>
      ))}
    </ul>
  )
}

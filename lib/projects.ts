import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const rootDirectory = path.join(process.cwd(), 'content', 'projects')

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
  link?: string
  /** No public link or screenshots — the system is not publicly reachable. */
  confidential?: boolean
  /** 'internal' marks in-house employer work; anything else is client work. */
  category?: 'internal' | 'client'
  /** Organisation the work was done for. */
  company?: string
  /** Role held on the project. */
  role?: string
  /** Key technologies, shown as chips. */
  tech?: string[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    return { metadata: { ...data, slug }, content }
  } catch (error) {
    return null
  }
}

/** In-house work built as an employee, newest first. */
export async function getInternalProjects(): Promise<ProjectMetadata[]> {
  const projects = await getProjects()
  return projects.filter(project => project.category === 'internal')
}

/** Freelance client and personal work, newest first. */
export async function getClientProjects(): Promise<ProjectMetadata[]> {
  const projects = await getProjects()
  return projects.filter(project => project.category !== 'internal')
}

export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  const files = fs.readdirSync(rootDirectory)

  const projects = files
    .map(file => getProjectMetadata(file))
    .sort((a, b) => {
      if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
        return 1
      } else {
        return -1
      }
    })

  if (limit) {
    return projects.slice(0, limit)
  }

  return projects
}

export function getProjectMetadata(filepath: string): ProjectMetadata {
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data } = matter(fileContent)
  return { ...data, slug }
}

import type { ProjectContent } from '../types'

const modules = import.meta.glob('../../content/work/*.mdx', { eager: true })
  
export interface MDXProject {
  meta: ProjectContent
  Component: React.ComponentType
}

export function getAllProjects(): MDXProject[] {
  return Object.values(modules).map((mod: any) => ({
    meta: mod.frontmatter as ProjectContent,
    Component: mod.default,
  }))
}
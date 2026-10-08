import type { ProjectMeta } from '../types'
import { getAllProjects } from './mdx'
import type { AnyNode, ProjectNode, Edge } from '../types'
import { STATIC_NODES, STRUCTURAL_EDGES, CATEGORY_IDS } from '../data/graph'
import { resolveImage } from './images'


export function buildGraphData() {
  const mdxProjects = getAllProjects()

  const projects: ProjectMeta[] = mdxProjects.map(({ meta }) => ({
    title: meta.title,
    slug: meta.slug,
    discipline: meta.discipline,
    tags: meta.tags,
    date: meta.date,
    status: meta.status,
    color: meta.color,
    hero: resolveImage(meta.hero),
    summary: meta.summary,
  }))

  const nodes: AnyNode[] = STATIC_NODES.map(n => ({ ...n }))
  const edges: Edge[] = STRUCTURAL_EDGES.map(e => [e[0], e[1]] as Edge)

  const tagMap = new Map<string, number>()
  let nextId = STATIC_NODES.length

  // First pass, collect all unique tags and create tag nodes
  projects.forEach(p => {
    p.tags.forEach((tag: string) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, nextId)
        nodes.push({
          id: nextId++,
          label: tag,
          type: 'tag',
          color: '#252525',
          r: 10,
          visible: false,
        })
      }
    })
  })

  // Second pass, create project nodes and all their edges
  projects.forEach(p => {
    const projectId = nextId++
    const categoryId = CATEGORY_IDS[p.discipline]

    const projectNode: ProjectNode = {
      id: projectId,
      label: p.title,
      type: 'project',
      r: 12,
      color: p.color,
      hero: p.hero,
      slug: p.slug,
      discipline: p.discipline,
      tags: p.tags,
      date: p.date,
      status: p.status,
      summary: p.summary,
      visible: false,
    }

    nodes.push(projectNode)

    // category to project
    edges.push([categoryId, projectId])

    // project to each of its tags
    p.tags.forEach((tag: string) => {
      edges.push([projectId, tagMap.get(tag)!])
    })
  })

  return { nodes, edges }
}
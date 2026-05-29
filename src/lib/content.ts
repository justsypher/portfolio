import type { ProjectMeta } from '../types'
import { DISCIPLINE_COLORS } from '../data/graph'

export const PROJECTS: ProjectMeta[] = [
  {
    title: 'Brand Identity',
    slug: 'brand-identity',
    discipline: 'Design',
    tags: ['brand', 'identity', 'logo'],
    date: '2024',
    status: 'completed',
    color: DISCIPLINE_COLORS.Design,
    emoji: '✦',
    summary: 'A complete visual identity system for a Berlin-based architecture firm.',
  },
  {
    title: 'Graph Portfolio',
    slug: 'graph-portfolio',
    discipline: 'Code',
    tags: ['react', 'd3', 'generative'],
    date: '2025',
    status: 'ongoing',
    color: DISCIPLINE_COLORS.Code,
    emoji: '⌨', // TODO : replace emojis with cover images
    summary: 'This very portfolio.',
  },
  // add more later
]


import type { AnyNode, ProjectNode, Edge } from '../types'
import { STATIC_NODES, STRUCTURAL_EDGES, CATEGORY_IDS } from '../data/graph'

export function buildGraphData(projects: ProjectMeta[] = PROJECTS) {
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
      emoji: p.emoji,
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
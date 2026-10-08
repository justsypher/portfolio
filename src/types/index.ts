export type Discipline = 'Design' | 'Code' | 'Motion' | 'Writing'
export type NodeType = 'center' | 'category' | 'project' | 'tag'
export type ProjectStatus = 'completed' | 'ongoing' | 'archived'

export interface GraphNode {
  id: number
  label: string
  type: NodeType
  r?: number
  color: string
  hero: string
  visible?: boolean
  fixed?: boolean
  // Added by D3 at runtime
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
}

export interface ProjectNode extends GraphNode {
  type: 'project'
  slug: string
  discipline: Discipline
  tags: string[]
  date: string
  status: ProjectStatus
  summary: string
}

export type AnyNode = GraphNode | ProjectNode
export type Edge = [number, number]
export type AppView = 'boot' | 'about' | 'graph' | 'project'

export interface ProjectMeta {
  title: string
  slug: string
  discipline: Discipline
  tags: string[]
  date: string
  status: ProjectStatus
  color: string
  hero: string
  summary: string
}


export interface ProjectContent {
  title: string
  slug: string
  discipline: Discipline
  tags: string[]
  date: string
  status: ProjectStatus
  color: string
  hero: string
  summary: string
  gallery?: string[]
}
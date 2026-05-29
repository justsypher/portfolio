import type { AnyNode } from '../types'

export const DISCIPLINE_COLORS = {
  Design: '#e85d8a',
  Code: '#5b8de8',
  Marketing: '#9b72e8',
  Ecriture: '#e8aa5b',
} as const

export const STATUS_COLORS = {
  'completed': '#5b8ce88f',
  'ongoing': '#e8aa5b8f',
  'archived': '#4444448f',
} as const


export const STATIC_NODES: AnyNode[] = [
  {
    id: 0,
    label: '',
    type: 'center',
    r: 20,
    color: '#ffffff',
    fixed: true,
    visible: true,
  },
  {
    id: 1,
    label: 'Design',
    type: 'category',
    r: 15,
    color: DISCIPLINE_COLORS.Design,
    emoji: '✦',
    visible: false,
  },
  {
    id: 2,
    label: 'Code',
    type: 'category',
    r: 15,
    color: DISCIPLINE_COLORS.Code,
    emoji: '⌨',
    visible: false,
  },
  {
    id: 3,
    label: 'Marketing',
    type: 'category',
    r: 15,
    color: DISCIPLINE_COLORS.Marketing,
    emoji: '◎',
    visible: false,
  },
  {
    id: 4,
    label: 'Ecriture',
    type: 'category',
    r: 15,
    color: DISCIPLINE_COLORS.Ecriture,
    emoji: '⌦',
    visible: false,
  },
]

export const CATEGORY_IDS: Record<string, number> = {
  Design: 1,
  Code: 2,
  Marketing: 3,
  Ecriture: 4,
}

export const STRUCTURAL_EDGES = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
] as const

// TODO : Adjust constants here until it feels good visually (also care about alpha decay because that's what's gonna help in transitions)
export const PHYSICS = {
  repulsion: -90,
  centerRepulsion: -200,
  linkDistance: {
    centerToCategory: 80,
    categoryToProject: 90,
    projectToTag: 60,
  },
  linkStrength: 0.8,
  alphaDecay: 0.02,
  velocityDecay: 0.4,
  xStrength: 0.1,
  yStrength: 0.25,
} as const

export const GRAPH_COLORS = {
  edge: 'rgba(255,255,255,0.06)',
  edgeActive: 'rgba(255,255,255,0.20)',
  pulse: 'rgba(255,255,255,0.35)',
  centerFill: '#111111',
  centerRing: 'rgba(255,255,255,0.5)',
  tagFill: '#161616',
  tagStroke: '#222222',
} as const
export const GRAPH_FONTS = {
  mono: "'ServerMono', 'Fira Mono', monospace",
  serif: "'Cormorant', Georgia, serif",
} as const

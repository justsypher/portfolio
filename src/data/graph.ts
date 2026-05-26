import type { AnyNode } from '../types'

export const STATIC_NODES: AnyNode[] = [
  {
    id: 0,
    label: '',
    type: 'center',
    color: '#ffffff',
    fixed: true,
    visible: true,
  },
  {
    id: 1,
    label: 'Design',
    type: 'category',
    color: 'var(--design)',
    emoji: '✦',
    visible: false,
  },
  {
    id: 2,
    label: 'Code',
    type: 'category',
    color: 'var(--code)',
    emoji: '⌨',
    visible: false,
  },
  {
    id: 3,
    label: 'Motion',
    type: 'category',
    color: 'var(--motion)',
    emoji: '◎',
    visible: false,
  },
  {
    id: 4,
    label: 'Writing',
    type: 'category',
    color: 'var(--writing)',
    emoji: '⌦',
    visible: false,
  },
]

export const CATEGORY_IDS: Record<string, number> = {
  Design: 1,
  Code: 2,
  Motion: 3,
  Writing: 4,
}

export const STRUCTURAL_EDGES = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
] as const

export const PHYSICS = {
  repulsion: -180,
  centerStrength: 0.04,
  linkDistance: {
    centerToCategory: 100,
    categoryToProject: 120,
    projectToTag: 80,
  },
  linkStrength: 0.5,
  alphaDecay: 0.02,
  velocityDecay: 0.4,
} as const
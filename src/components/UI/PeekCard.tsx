import type { ProjectNode } from '../../types'
import { STATUS_COLORS } from '../../data/graph'
import { motion } from 'framer-motion'
import { EASING } from '../../lib/animation'

interface PeekCardProps {
  project: ProjectNode
  containerWidth: number
  containerHeight: number
  onClick: () => void
}

const CARD_WIDTH = 220
const CARD_HEIGHT = 200

export default function PeekCard ({
  project,
  containerWidth,
  containerHeight,
  onClick
}: PeekCardProps) {
  const expandLeft = project.x! > containerWidth / 2
  const x = expandLeft ? project.x! - CARD_WIDTH - 10 : project.x! + 10
  const y = Math.max(
    8,
    Math.min(containerHeight - CARD_HEIGHT - 8, project.y! - CARD_HEIGHT / 2)
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93, y: 4 }}
      transition={{ duration: 0.18, ease: EASING.spring as any}}
      onClick={onClick}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: CARD_WIDTH,
        background: 'var(--surface)',
        border: '0.5px solid var(--border)',
        borderRadius: 8,
        cursor: 'pointer',
        overflow: 'hidden',
        zIndex: 50
      }}
    >
      <div style={{ padding: 12 }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 16,
            marginBottom: 6
          }}
        >
          {project.label}
        </p>
        <p
          style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}
        >
          {project.date} ·{' '}
          <span style={{ color: STATUS_COLORS[project.status] }}>
            {project.status}
          </span>
        </p>
        <p
          style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}
        >
          {project.tags.map(t => '#' + t).join(' ')}
        </p>
        <p style={{ fontSize: 10, color: 'var(--text-faint)' }}>
          {project.summary}
        </p>
      </div>
    </motion.div>
  )
}

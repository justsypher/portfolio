import type { ProjectNode } from '../../types'
import { STATUS_COLORS } from '../../data/graph'
import Separator from '../UI/Separator'
import { motion } from 'framer-motion'
import { EASING } from '../../lib/animation'
import type { MDXProject } from '../../lib/mdx'

interface ProjectPageProps {
  project: ProjectNode
  content: React.ComponentType
  onBack: () => void
}

export default function ProjectPage ({ project, content, onBack }: ProjectPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.15, ease: EASING.smooth }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        zIndex: 80,
        overflowY: 'auto'
      }}
    >
      {/* fixed back button */}
      <button
        onClick={onBack}
        style={{
          position: 'fixed',
          top: 20,
          left: 24,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.06em',
          zIndex: 90
        }}
      >
        ← graph
      </button>

      {/* scrollable content */}
      <div style={{ padding: '64px 48px 48px' }}>
        <div
          style={{
            width: '100%',
            height: 200,
            background: project.color + '18',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            marginBottom: 24
          }}
        >
          {project.emoji}
        </div>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 32,
            fontWeight: 300,
            color: 'var(--text-primary)',
            marginBottom: 8
          }}
        >
          {project.label}
        </p>
        {project.date && project.status && (
          <p
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              marginBottom: 4
            }}
          >
            {project.date} ·{' '}
            <span style={{ color: STATUS_COLORS[project.status] }}>
              {project.status}
            </span>
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <p
            style={{
              fontSize: 10,
              color: 'var(--text-muted)',
              marginBottom: 6
            }}
          >
            {project.tags.map(t => '#' + t).join(' ')}
          </p>
        )}
        <Separator />
        {content && (
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.8
            }}
          >
            <Content />
          </div>
        )}
      </div>
    </motion.div>
  )
}

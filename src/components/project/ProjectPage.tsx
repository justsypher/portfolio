import type { ProjectNode } from '../../types'
import { STATUS_COLORS } from '../../data/graph'

interface ProjectPageProps {
  project: ProjectNode
  onBack: () => void
}

export default function ProjectPage ({ project, onBack }: ProjectPageProps) {
  return (
    <div
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
            {project.date} · <span style={{ color: STATUS_COLORS[project.status] }}>{project.status}</span>
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            margin: '24px 0'
          }}
        >
          <div
            style={{ flex: 1, height: '1.5px', background: 'var(--border)' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-faint)'
            }}
          >
            ◈
          </span>
          <div
            style={{ flex: 1, height: '1.5px', background: 'var(--border)' }}
          />
        </div>
        {<p>this is placeholder text don't wry about that if you see this it means i forgot to remove it and i'm sorry T.T</p>/* qualities placeholder */}
      </div>
    </div>
  )
}

import type { ProjectNode } from "../../types"

interface PeekCardProps {
    project: ProjectNode
    containerWidth: number
    containerHeight: number
    onClick: () => void
}

const CARD_WIDTH = 220
const CARD_HEIGHT = 200
export default function PeekCard({
  project,
  containerWidth,
  containerHeight,
  onClick,
}: PeekCardProps) {
  const expandLeft = project.x! > containerWidth / 2
  const x = expandLeft ? project.x! - CARD_WIDTH - 10 : project.x! + 10
  const y = Math.max(8, Math.min(containerHeight - CARD_HEIGHT - 8, project.y! - CARD_HEIGHT / 2))

  return (
    <div onClick={onClick} style={{
      position: 'absolute',
      left: x,
      top: y,
      width: CARD_WIDTH,
      background: 'var(--surface)',
      border: '0.5px solid var(--border)',
      borderRadius: 8,
      cursor: 'pointer',
      overflow: 'hidden',
    }}>
      {/* emoji placeholder */}
      <div style={{ ... }}>
        {project.emoji}
      </div>

      {project.label/* title */}
      {project.tags/* tags */}
      {project.status/* date + status */}
      {project.summary/* summary */}
    </div>
  )
}


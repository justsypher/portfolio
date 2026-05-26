import { useState, useMemo } from 'react'
import { buildGraphData } from './lib/content'
import type { AppView, ProjectNode } from './types'

function App() {
  const [view, setView] = useState<AppView>('boot')
  const [activeProject, setActiveProject] = useState<ProjectNode | null>(null)

  const { nodes, edges } = useMemo(() => buildGraphData(), [])

  return (
    <div>
      <p>view: {view}</p>
      <p>nodes: {nodes.length}</p>
      <p>edges: {edges.length}</p>
    </div>
  )
}

export default App
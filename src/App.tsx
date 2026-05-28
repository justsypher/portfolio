import { useState, useMemo } from 'react'
import { buildGraphData } from './lib/content'
import type { AppView, ProjectNode } from './types'
import Boot from './components/boot/Boot'
import Graph from './components/graph/Graph'

function App() {
  const [view, setView] = useState<AppView>('boot')
  const [activeProject, setActiveProject] = useState<ProjectNode | null>(null)

  const { nodes, edges } = useMemo(() => buildGraphData(), [])

  return (
    <div>
      {view === 'boot' && <Boot onEnter={() => setView('about')} />}

      {view !== 'boot' && (
        <Graph
          nodes={nodes}
          edges={edges}
          isFullscreen={view === 'graph'}
          onProjectClick={(node) => {
            setActiveProject(node)
            setView('project')
          }}
          onCenterClick={() => setView('about')}
          onEnterGraph={() => setView('graph')}
        />
      )}

      <div id="dev-infos">
        <p>view: {view}</p>
        <p>nodes: {nodes.length}</p>
        <p>edges: {edges.length}</p>
      </div>
    </div>
  )
}

export default App
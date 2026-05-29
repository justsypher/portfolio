import { useState, useMemo } from 'react'
import { buildGraphData } from './lib/content'
import type { AppView, ProjectNode } from './types'
import Boot from './components/boot/Boot'
import Graph from './components/graph/Graph'
import About from './components/about/About'
import ProjectPage from './components/project/ProjectPage'

function App() {
  const [view, setView] = useState<AppView>('boot')
  const [activeProject, setActiveProject] = useState<ProjectNode | null>(null)

  const { nodes, edges } = useMemo(() => buildGraphData(), [])

  return (
    <div>
      {view === 'boot' && <Boot onEnter={() => setView('about')} />}

      {view !== 'boot' && (
        <div style={{
          height: '100vh',
          overflowY: view === 'about' ? 'auto' : 'hidden',
        }}>
          <div style={{
            width: '100%',
            height: view === 'about' ? '52vh' : '100vh',
            transition: 'height 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
            zIndex: 10,
          }}>
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
          </div>

          {view === 'about' && <About />}

          {view === 'project' && activeProject && (
            <ProjectPage
              project={activeProject}
              onBack={() => setView('graph')}
            />
          )}
        </div>
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
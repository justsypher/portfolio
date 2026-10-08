import { useState, useMemo, useEffect } from 'react'
import { buildGraphData } from './lib/content'
import type { AppView, ProjectNode } from './types'
import Boot from './components/boot/Boot'
import Graph from './components/graph/Graph'
import About from './components/about/About'
import ProjectPage from './components/project/ProjectPage'
import { AnimatePresence } from 'framer-motion'
import { getAllProjects } from './lib/mdx'

function App() {
  const [view, setView] = useState<AppView>('boot')
  const [activeProject, setActiveProject] = useState<ProjectNode | null>(null)
  const [activeComponent, setActiveComponent] =
    useState<React.ComponentType | null>(null)

  const { nodes, edges } = useMemo(() => buildGraphData(), [])
  useEffect(() => {
    nodes.forEach(n => {
      const hero = n.type === 'project' ? (n as ProjectNode).hero : undefined
      if (hero) new Image().src = hero
    })
  }, [nodes])
  const mdxProjects = useMemo(() => getAllProjects(), [])

  return (
    <div>
      <AnimatePresence>
        {view === 'boot' && (
          <Boot
            onEnter={() => {
              setView('graph')
              setTimeout(() => setView('about'), 1500)
            }}
          />
        )}
      </AnimatePresence>

      {view !== 'boot' && (
        <div
          style={{
            height: '100vh',
            overflowY: view === 'about' ? 'auto' : 'hidden'
          }}
        >
          <div
            style={{
              width: '100%',
              height: view === 'about' ? '52vh' : '100vh',
              transition: 'height 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
              zIndex: 10
            }}
          >
            <Graph
              nodes={nodes}
              edges={edges}
              isFullscreen={view === 'graph'}
              onProjectClick={node => {
                const mdx = mdxProjects.find(p => p.meta.slug === node.slug)
                setActiveComponent(() => mdx?.Component ?? null)
                setActiveProject(node)
                setView('project')
              }}
              onCenterClick={() => setView('about')}
              onEnterGraph={() => setView('graph')}
            />
          </div>

          {view === 'about' && <About />}

          <AnimatePresence>
            {view === 'project' && activeProject && (
              <ProjectPage
                key={activeProject.slug}
                project={activeProject}
                Component={activeComponent}
                onBack={() => setView('graph')}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/*<div id='dev-infos'>
        <p>view: {view}</p>
        <p>nodes: {nodes.length}</p>
        <p>edges: {edges.length}</p>
      </div>*/}
    </div>
  )
}

export default App

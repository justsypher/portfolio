import { useEffect, useRef } from 'react'
import * as d3 from 'd3-force'
import type { AnyNode, Edge } from '../types'
import { PHYSICS } from '../data/graph'

interface UseSimulationOptions {
  nodes: AnyNode[]
  edges: Edge[]
  width: number
  height: number
  isFullscreen: boolean
}

export function useSimulation({
  nodes,
  edges,
  width,
  height,
  isFullscreen,
}: UseSimulationOptions) {
  const simRef = useRef<d3.Simulation<AnyNode, undefined> | null>(null)
  const xStrength = isFullscreen ? PHYSICS.xStrength : PHYSICS.xStrength
  const yStrength = isFullscreen ? PHYSICS.xStrength : PHYSICS.yStrength
  useEffect(() => {
    if (!width || !height) return

    const links = edges.map(([source, target]) => ({ source, target }))

    const sim = d3
      .forceSimulation<AnyNode>(nodes)
      .force('charge', d3.forceManyBody<AnyNode>()
        .strength(n => n.type === 'center' ? PHYSICS.centerRepulsion : PHYSICS.repulsion)
      )
      .force('x', d3.forceX<AnyNode>(width / 2).strength(xStrength))
      .force('y', d3.forceY<AnyNode>(height / 2).strength(yStrength))
      .force('link', d3.forceLink<AnyNode, { source: number; target: number }>(links)
        .id(n => n.id)
        .distance(link => {
          const s = link.source as unknown as AnyNode
          const t = link.target as unknown as AnyNode
          if (s.type === 'center' || t.type === 'center') return PHYSICS.linkDistance.centerToCategory
          if (s.type === 'category' || t.type === 'category') return PHYSICS.linkDistance.categoryToProject
          return PHYSICS.linkDistance.projectToTag
        })
        .strength(PHYSICS.linkStrength)
      )
      .force('collision', d3.forceCollide<AnyNode>(n => (n.r ?? 8) + 6))
      .alphaDecay(PHYSICS.alphaDecay)
      .velocityDecay(PHYSICS.velocityDecay)

    // fix center node in place
    const center = nodes.find(n => n.type === 'center')
    if (center) { center.fx = width / 2; center.fy = height / 2 }

    simRef.current = sim
    return () => { sim.stop() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  useEffect(() => {
    const sim = simRef.current
    if (!sim || !width || !height) return

    sim.force('x', d3.forceX<AnyNode>(width / 2).strength(xStrength))
    sim.force('y', d3.forceY<AnyNode>(height / 2).strength(yStrength))
      

    const center = nodes.find(n => n.type === 'center')
    if (center) { center.fx = width / 2; center.fy = height / 2 }

    sim.alpha(0.3).restart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  const revealWave = (ids: number[], delay: number) => {
    setTimeout(() => {
      ids.forEach(id => {
        const node = nodes.find(n => n.id === id)
        if (node) node.visible = true
      })
      simRef.current?.alpha(0.4).restart()
    }, delay)
  }

  return { simRef, revealWave }
}
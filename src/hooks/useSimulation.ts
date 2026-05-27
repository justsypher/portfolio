import { useEffect, useRef } from 'react'
import * as d3 from 'd3-force'
import type { AnyNode, Edge } from '../types'

interface UseSimulationOptions {
  nodes: AnyNode[]
  edges: Edge[]
  width: number
  height: number
}

export function useSimulation({
  nodes,
  edges,
  width,
  height,
}: UseSimulationOptions) {
  const simRef = useRef<d3.Simulation<AnyNode, undefined> | null>(null)

  return { simRef }
}
import { useRef, useState, useEffect, useCallback } from 'react'
import type { AnyNode, ProjectNode } from '../../types'
import type { Edge } from '../../types'
import { useSimulation } from '../../hooks/useSimulation'
import { useGraphRenderer } from '../../hooks/useGraphRenderer'
import PeekCard from '../UI/PeekCard'
import { AnimatePresence } from 'framer-motion'

interface GraphProps {
    nodes: AnyNode[]
    edges: Edge[]
    isFullscreen: boolean
    onProjectClick: (node: ProjectNode) => void
    onCenterClick: () => void
    onEnterGraph: () => void
}

export default function Graph({
    nodes,
    edges,
    isFullscreen,
    onProjectClick,
    onCenterClick,
    onEnterGraph,
}: GraphProps) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [size, setSize] = useState({ width: 0, height: 0 })
    const [hovered, setHovered] = useState<number | null>(null)
    const [peekNode, setPeekNode] = useState<ProjectNode | null>(null)

    const { simRef, revealWave } = useSimulation({
        nodes,
        edges,
        width: size.width,
        height: size.height,
        isFullscreen,
    })
    const hasRevealedRef = useRef(false)
    const { draw } = useGraphRenderer(canvasRef)

    // Watches for resizing
    useEffect(() => {
        const wrap = wrapRef.current
        if (!wrap) return

        const observer = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect
            setSize({ width, height })
        })

        observer.observe(wrap)
        return () => observer.disconnect()
    }, [])
    // Update size accordingly
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !size.width || !size.height) return

        const dpr = window.devicePixelRatio || 1
        canvas.width = size.width * dpr
        canvas.height = size.height * dpr
        canvas.style.width = size.width + 'px'
        canvas.style.height = size.height + 'px'

        const ctx = canvas.getContext('2d')
        if (ctx) ctx.scale(dpr, dpr)
    }, [size])

    // Reveal graph in waves
    useEffect(() => {
        if (!size.width || !size.height) return
        if (hasRevealedRef.current) return

        hasRevealedRef.current = true

        const projectIds = nodes
            .filter(n => n.type === 'project')
            .map(n => n.id)

        const tagIds = nodes
            .filter(n => n.type === 'tag')
            .map(n => n.id)

        revealWave([0], 0)
        revealWave([1, 2, 3, 4], 380)
        revealWave(projectIds, 760)
        revealWave(tagIds, 1200)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size.width, size.height])

    const pulseRef = useRef(0)

    useEffect(() => {
        let rafId: number

        const loop = () => {
            pulseRef.current++
            draw({
                nodes,
                edges,
                hovered,
                pulse: pulseRef.current,
            })
            rafId = requestAnimationFrame(loop)
        }

        rafId = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(rafId)
    }, [nodes, edges, hovered, draw])

    // Mouse handling
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isFullscreen) return

        const rect = canvasRef.current!.getBoundingClientRect()
        const mx = e.clientX - rect.left
        const my = e.clientY - rect.top

        const found = nodes.find(n => {
            if (!n.visible || n.x == null || n.y == null) return false
            const dx = n.x - mx
            const dy = n.y - my
            return Math.sqrt(dx * dx + dy * dy) < (n.r ?? 8) + 10
        })

        if (found?.type === 'project') {
            setHovered(found.id)
            setPeekNode(found as ProjectNode)
        } else if (found) {
            setHovered(found.id)
            setPeekNode(null)
        } else {
            setHovered(null)
            setPeekNode(null)
        }
    }, [isFullscreen, nodes])

    const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isFullscreen) return

        const rect = canvasRef.current!.getBoundingClientRect()
        const mx = e.clientX - rect.left
        const my = e.clientY - rect.top

        const found = nodes.find(n => {
            if (!n.visible || n.x == null || n.y == null) return false
            const dx = n.x - mx
            const dy = n.y - my
            return Math.sqrt(dx * dx + dy * dy) < (n.r ?? 8) + 10
        })

        if (!found) return
        if (found.type === 'center') onCenterClick()
        else if (found.type === 'project') onProjectClick(found as ProjectNode)
    }, [isFullscreen, nodes, onCenterClick, onProjectClick])


    // Canvas element
    return (
        <div ref={wrapRef} style={{
            position: 'relative',
            width: '100%',
            height: '100%',
        }}>
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { setHovered(null); setPeekNode(null) }}
                onClick={isFullscreen ? handleClick : onEnterGraph}
                style={{ display: 'block', cursor: isFullscreen ? 'default' : 'pointer' }}
            />
            <AnimatePresence>
                {peekNode && (
                    <PeekCard
                        key={peekNode.id}
                        project={peekNode}
                        containerWidth={size.width}
                        containerHeight={size.height}
                        onClick={() => onProjectClick(peekNode)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
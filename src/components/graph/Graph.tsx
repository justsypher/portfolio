import { useRef, useState, useEffect } from 'react'
import type { AnyNode, ProjectNode } from '../../types'
import type { Edge } from '../../types'

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


    return (
        <div ref={wrapRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: isFullscreen ? '100%' : '52%',
            transition: 'height 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
            zIndex: 10,
        }}>
            <canvas ref={canvasRef} />
        </div>
    )
}
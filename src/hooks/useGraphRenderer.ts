import { useCallback } from 'react'
import type { AnyNode, Edge } from '../types'
import { GRAPH_COLORS, GRAPH_FONTS } from '../data/graph'

interface DrawOptions {
    nodes: AnyNode[]
    edges: Edge[]
    hovered: number | null
    pulse: number
}

const imageCache = new Map<string, HTMLImageElement>()

function getImage(src: string): HTMLImageElement | null {
  if (imageCache.has(src)) return imageCache.get(src)!
  const img = new Image()
  img.onload = () => imageCache.set(src, img)
  img.src = src
  return null
}

export function useGraphRenderer(
    canvasRef: React.RefObject<HTMLCanvasElement | null>
) {

    const draw = useCallback(({ nodes, edges, hovered, pulse }: DrawOptions) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const w = canvas.width / dpr
        const h = canvas.height / dpr
        ctx.clearRect(0, 0, w, h)

        const visible = nodes.filter(n => n.visible && n.x != null && n.y != null)

        // Drawing edges
        edges.forEach(([a, b]) => {
            const na = nodes[a]
            const nb = nodes[b]
            if (!na?.visible || !nb?.visible) return
            if (na.x == null || nb.x == null) return

            const active = hovered !== null && (na.id === hovered || nb.id === hovered)

            ctx.beginPath()
            ctx.moveTo(na.x, na.y!)
            ctx.lineTo(nb.x, nb.y!)
            ctx.strokeStyle = active ? GRAPH_COLORS.edgeActive : GRAPH_COLORS.edge
            ctx.lineWidth = active ? 0.8 : 0.4
            ctx.stroke()

            // pulse dot travels along active edges
            if (active) {
                const t = (pulse % 120) / 120
                const px = na.x + (nb.x - na.x) * t
                const py = na.y! + (nb.y! - na.y!) * t
                ctx.beginPath()
                ctx.arc(px, py, 2, 0, Math.PI * 2)
                ctx.fillStyle = GRAPH_COLORS.pulse
                ctx.fill()
            }
        })

        // Drawing nodes
        visible.forEach(n => {
            const isHovered = hovered === n.id
            const isConnected = edges.some(([a, b]) =>
                (a === n.id && b === hovered) || (b === n.id && a === hovered)
            )

            // dim unconnected nodes when something is hovered
            const alpha = hovered !== null
                ? (isHovered || isConnected || n.type === 'center' ? 1 : 0.18)
                : 1

            ctx.globalAlpha = alpha
            const r = (n.r ?? 8) * (isHovered ? 1.18 : 1)

            if (n.type === 'center') {
                ctx.beginPath()
                ctx.arc(n.x!, n.y!, r, 0, Math.PI * 2)
                ctx.fillStyle = GRAPH_COLORS.centerFill
                ctx.fill()
                ctx.strokeStyle = GRAPH_COLORS.centerRing
                ctx.lineWidth = 0.8
                ctx.stroke()

            } else if (n.type === 'tag') {
                ctx.beginPath()
                ctx.arc(n.x!, n.y!, r, 0, Math.PI * 2)
                ctx.fillStyle = GRAPH_COLORS.tagFill
                ctx.fill()
                ctx.strokeStyle = GRAPH_COLORS.tagStroke
                ctx.lineWidth = 0.4
                ctx.stroke()

            } else {
                // category and project
                ctx.beginPath()
                ctx.arc(n.x!, n.y!, r, 0, Math.PI * 2)
                ctx.fillStyle = n.color + '18'
                ctx.fill()
                ctx.strokeStyle = n.color + (isHovered ? 'cc' : '66')
                ctx.lineWidth = isHovered ? 1 : 0.7
                ctx.stroke()
            }

            ctx.globalAlpha = 1
        })

        // Drawing labels
        visible.forEach(n => {
            if (n.type === 'center') return
            if (n.x == null || n.y == null) return

            const isHovered = hovered === n.id
            const isConnected = edges.some(([a, b]) =>
                (a === n.id && b === hovered) || (b === n.id && a === hovered)
            )
            const alpha = hovered !== null
                ? (isHovered || isConnected ? 1 : 0.18)
                : 1

            ctx.globalAlpha = alpha
            ctx.textAlign = 'center'
            ctx.textBaseline = 'top'

            if (n.type === 'tag') {
                ctx.font = `300 8px ${GRAPH_FONTS.mono}`
                ctx.fillStyle = '#444444'
                ctx.fillText('#' + n.label, n.x, n.y + (n.r ?? 5) + 3)
            } else {
                ctx.font = `300 9px ${GRAPH_FONTS.mono}`
                ctx.fillStyle = n.color + (isHovered ? 'dd' : '88')
                ctx.fillText(n.label, n.x, n.y + (n.r ?? 8) + 3)
            }
            
            ctx.globalAlpha = 1
        })

    }, [canvasRef])



    return { draw }
}
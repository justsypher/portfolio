import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

interface LightboxProps {
  images: string[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}

const button: React.CSSProperties = {
  position: 'absolute',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
  color: 'var(--text-secondary)',
  padding: 16
}

export default function Lightbox({ images, index, onIndex, onClose }: LightboxProps) {
  const touchX = useRef<number | null>(null)
  const count = images.length
  const prev = () => onIndex((index - 1 + count) % count)
  const next = () => onIndex((index + 1) % count)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && count > 1) prev()
      else if (e.key === 'ArrowRight' && count > 1) next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const stop = (e: React.MouseEvent) => e.stopPropagation()

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClose}
      onTouchStart={e => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={e => {
        if (touchX.current === null || count < 2) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) < 50) return
        if (dx > 0) prev()
        else next()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(13, 13, 13, 0.94)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overscrollBehavior: 'contain'
      }}
    >
      <img
        src={images[index]}
        alt=""
        onClick={stop}
        style={{
          maxWidth: '92vw',
          maxHeight: '86vh',
          objectFit: 'contain',
          borderRadius: 4,
          userSelect: 'none'
        }}
      />

      <button
        aria-label="Close"
        onClick={e => {
          stop(e)
          onClose()
        }}
        style={{ ...button, top: 8, right: 8 }}
      >
        ✕
      </button>

      {count > 1 && (
        <>
          <button
            className="lightbox-arrow"
            aria-label="Previous image"
            onClick={e => {
              stop(e)
              prev()
            }}
            style={{ ...button, left: 8, top: '50%', transform: 'translateY(-50%)' }}
          >
            ←
          </button>
          <button
            className="lightbox-arrow"
            aria-label="Next image"
            onClick={e => {
              stop(e)
              next()
            }}
            style={{ ...button, right: 8, top: '50%', transform: 'translateY(-50%)' }}
          >
            →
          </button>
          <span
            style={{
              position: 'absolute',
              bottom: 20,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: '0.06em'
            }}
          >
            {index + 1} / {count}
          </span>
        </>
      )}
    </motion.div>,
    document.body
  )
}
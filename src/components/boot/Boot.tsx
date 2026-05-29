import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface BootProps {
  onEnter: () => void
}

const LINES = [
  '> Initializing...',
  '> Loading portfolio of',
  'Ethan Cheynel', // index 2 — serif, larger
  '> Mapping connections...',
  '> Done.',
  '> Press any key to enter_'
]

export default function Boot ({ onEnter }: BootProps) {
  const [visible, setVisible] = useState(LINES.map(() => false))

  // Sequentially reveal lines with a delay
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []
    LINES.forEach((_, i) => {
      timeouts.push(
        setTimeout(() => {
          setVisible(prev => {
            const next = [...prev]
            next[i] = true
            return next
          })
        }, i * 450)
      )
    })
    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Listen for any key press or click to enter
  useEffect(() => {
    document.addEventListener('keydown', onEnter)
    document.addEventListener('click', onEnter)
    return () => {
      document.removeEventListener('keydown', onEnter)
      document.removeEventListener('click', onEnter)
    }
  }, [onEnter])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      {LINES.map((line, i) => (
        <p
          key={i}
          style={{
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            fontFamily: i === 2 ? 'var(--font-serif)' : 'var(--font-mono)', // For the name's line
            fontSize: i === 2 ? '3rem' : '1.25rem',
            color: i === 2 ? 'var(--text-primary)' : 'var(--text-muted)',
            marginBottom: i === 2 ? '0.5rem' : '0.2rem',
            fontWeight: 300
          }}
        >
          {line}
        </p>
      ))}
    </motion.div>
  )
}

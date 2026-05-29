import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!name || !email || !message) return
    setSending(true)

    await fetch('/~i2504156/portfolio/api/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })

    setSending(false)
    setSent(true)
  }

  if (sent) {
    return (
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--text-muted)',
        letterSpacing: '0.06em',
      }}>
        &gt; message sent. I'll get back to you soon.
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={inputStyle}
      />
      <textarea
        placeholder="message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        rows={4}
        style={{ ...inputStyle, resize: 'none' }}
      />
      <button
        onClick={handleSubmit}
        disabled={sending}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: sending ? 'var(--text-faint)' : 'var(--text-muted)',
          background: 'none',
          border: '0.5px solid var(--border)',
          borderRadius: 4,
          padding: '8px 16px',
          cursor: sending ? 'default' : 'pointer',
          letterSpacing: '0.06em',
          alignSelf: 'flex-start',
          transition: 'color 0.2s ease',
        }}
      >
        {sending ? '> sending...' : '> send'}
      </button>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  color: 'var(--text-primary)',
  background: 'var(--surface)',
  border: '0.5px solid var(--border)',
  borderRadius: 4,
  padding: '8px 12px',
  outline: 'none',
  letterSpacing: '0.06em',
}
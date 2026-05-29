export default function Separator() {
    return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            margin: '24px 0'
          }}
        >
          <div
            style={{ flex: 1, height: '1.5px', background: 'var(--border)' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-faint)'
            }}
          >
            ◈
          </span>
          <div
            style={{ flex: 1, height: '1.5px', background: 'var(--border)' }}
          />
        </div>
    )
}
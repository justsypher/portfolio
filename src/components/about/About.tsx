import ContactForm from './ContactForm'
import Separator from '../UI/Separator'

export default function About () {
  return (
    <div
      style={{
        padding: '40px 48px 80px',
        maxWidth: 640,
        margin: '0 auto'
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 36,
          fontWeight: 300,
          color: 'var(--text-primary)',
          marginBottom: 4
        }}
      >
        Ethan Cheynel
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
          marginBottom: 24
        }}
      >
        {' '}
        UX/UI Design · Graphisme · Développement
      </p>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          marginBottom: 32,
          letterSpacing: '0.07em',
        }}
      >
        This will later be my bio. if you see this it means either i forgot to
        remove it (i'm sorry) or you just found the github i used for this
        project. In that case you can look around. You'll see i've used many new
        libraries i've never used before. This portfolio was kind of a test for
        me, to see how fast i could get used to another environment. I'm sorry
        if there's any mistakes in the code. Please just tell me and i will look
        into it.
      </p>

      {/* divider */}
      {/* skills */}
      <Separator />
      <h1
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.5rem',
          color: 'var(--text-primary)',
          marginBottom: 24
        }}
      >
        Contact
      </h1>
      <ContactForm />
    </div>
  )
}

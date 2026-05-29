import ContactForm from './ContactForm'
import Separator from '../UI/Separator'

export default function About () {
  return (
    <div
      style={{
        padding: '40px 48px 80px',
        maxWidth: 800,
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
        Développeur full-stack formé en MMI (une filière qui m’a appris à allier technique, créativité et communication), je navigue avec aisance entre le code, le design et la production de médias. Passionné par les jeux vidéo (que je crée, analyse ou modde à mes heures perdues), j'aime m'intéresser a des sujets en tout genre comme les défis techniques des nouvelles technologies, la psychologie du langage ou encore la mythologie nordique.
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
        Mon approche ? Apprendre en faisant, explorer sans limites, et transformer des idées en projets concrets – qu’il s’agisse d’une application web, d’une vidéo expérimentale ou d’un prototype de jeu. Toujours en quête de défis hybrides où la technique rencontre l’art, et où l’innovation rime avec accessibilité
      </p>

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

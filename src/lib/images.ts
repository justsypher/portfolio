const files = import.meta.glob('../../content/work/images/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const byName = new Map(
  Object.entries(files).map(([path, url]) => [path.split('/').pop()!, url])
)

export const resolveImage = (name?: string) => (name ? byName.get(name) : undefined)
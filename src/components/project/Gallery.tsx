import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lightbox from './Lightbox'

interface GalleryProps {
    images: string[]
    title: string
}

export default function Gallery({ images, title }: GalleryProps) {
    const [open, setOpen] = useState<number | null>(null)

    if (images.length === 0) return null

    return (
        <>
            <div
                className="gallery"
                style={{
                    margin: '0 auto',
                    maxWidth: '80%',
                    '--cols': Math.min(3, images.length),
                    '--cols-md': Math.min(2, images.length)
                } as React.CSSProperties}
            >
                {images.map((src, i) => (
                    <button
                        key={src}
                        className="gallery-item"
                        onClick={() => setOpen(i)}
                        aria-label={`${title}, image ${i + 1} of ${images.length}`}
                    >
                        <img src={src} alt="" decoding="async" />
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {open !== null && (
                    <Lightbox
                        images={images}
                        index={open}
                        onIndex={setOpen}
                        onClose={() => setOpen(null)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
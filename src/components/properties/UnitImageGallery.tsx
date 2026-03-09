import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  images: string[];
  alt: string;
}

const UnitImageGallery = ({ images, alt }: Props) => {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)), [images.length]);

  const hasMultiple = images.length > 1;

  return (
    <>
      {/* Main Viewer */}
      <div className="flex h-full flex-col bg-muted/30">
        {/* Main Image Area */}
        <div className="relative flex flex-1 items-center justify-center bg-muted/50 p-6 md:p-8">
          <img
            src={images[current]}
            alt={`${alt} - ${current + 1}`}
            className="max-h-[420px] w-full object-contain md:max-h-[480px]"
            draggable={false}
          />

          {/* Prev/Next Controls */}
          {hasMultiple && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Expand Button */}
          <button
            onClick={() => setLightbox(true)}
            className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
            aria-label="Enlarge image"
          >
            <Expand size={14} />
          </button>

          {/* Counter */}
          {hasMultiple && (
            <span className="absolute bottom-4 left-4 rounded-md bg-background/80 px-2.5 py-1 font-body text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
              {current + 1} / {images.length}
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultiple && (
          <div className="flex gap-2 border-t border-border bg-background/50 p-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'relative h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 transition-all md:h-16 md:w-16',
                  i === current
                    ? 'border-primary shadow-sm'
                    : 'border-transparent opacity-60 hover:opacity-90'
                )}
              >
                <img
                  src={img}
                  alt={`${alt} thumbnail ${i + 1}`}
                  className="h-full w-full object-contain bg-muted/30"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 backdrop-blur-md"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[current]}
                alt={`${alt} - enlarged`}
                className="max-h-[85vh] max-w-[85vw] object-contain"
              />

              {/* Lightbox controls */}
              <button
                onClick={() => setLightbox(false)}
                className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-lg"
              >
                <X size={18} />
              </button>

              {hasMultiple && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-[-50px] flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-[-50px] flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </motion.div>

            {/* Lightbox counter */}
            {hasMultiple && (
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-1.5 font-body text-sm text-foreground backdrop-blur-sm">
                {current + 1} / {images.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UnitImageGallery;

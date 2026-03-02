import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageSlider({ images = [], alt = "" }) {
  const safe = useMemo(() => (Array.isArray(images) ? images : []), [images]);
  const [idx, setIdx] = useState(0);

  const has = safe.length > 0;
  const current = has ? safe[idx] : null;

  function prev() {
    setIdx((i) => (i - 1 + safe.length) % safe.length);
  }
  function next() {
    setIdx((i) => (i + 1) % safe.length);
  }

  if (!has) {
    return (
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 aspect-[4/5] grid place-items-center text-neutral-400">
        Pas d’image
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900">
      <div className="aspect-[4/5]">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={current}
            alt={alt}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
      </div>

      {/* arrows */}
      {safe.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl border border-neutral-800 bg-black/60 backdrop-blur hover:bg-black/80 transition grid place-items-center"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl border border-neutral-800 bg-black/60 backdrop-blur hover:bg-black/80 transition grid place-items-center"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          {/* dots */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {safe.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-2.5 rounded-full transition ${
                  idx === i ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

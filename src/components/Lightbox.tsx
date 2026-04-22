import { useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  title: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const propsRef = useRef({ images, index, onClose, onChange });
  propsRef.current = { images, index, onClose, onChange };

  const handlePrev = useCallback(() => {
    onChange(Math.max(0, index - 1));
  }, [index, onChange]);

  const handleNext = useCallback(() => {
    onChange(Math.min(images.length - 1, index + 1));
  }, [index, images.length, onChange]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const { images, index, onClose, onChange } = propsRef.current;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange(Math.max(0, index - 1));
      if (e.key === "ArrowRight") onChange(Math.min(images.length - 1, index + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  const image = images[index];
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="w-6 h-6" />
      </button>

      {index > 0 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-2"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {index < images.length - 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-2"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      <img
        src={image.src}
        alt={image.title}
        className="max-w-[90vw] max-h-[85vh] rounded-lg object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

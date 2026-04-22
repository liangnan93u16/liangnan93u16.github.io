import { useEffect, useCallback, useMemo } from "react";
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
  const handlePrev = useCallback(() => {
    onChange(Math.max(0, index - 1));
  }, [index, onChange]);

  const handleNext = useCallback(() => {
    onChange(Math.min(images.length - 1, index + 1));
  }, [index, images.length, onChange]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, handlePrev, handleNext]);

  const image = images[index];
  if (!image) return null;

  const navButtons = useMemo(
    () => [
      {
        show: index > 0,
        position: "left-4" as const,
        Icon: ChevronLeft,
        onClick: handlePrev,
      },
      {
        show: index < images.length - 1,
        position: "right-4" as const,
        Icon: ChevronRight,
        onClick: handleNext,
      },
    ],
    [index, images.length, handlePrev, handleNext]
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>

      {navButtons.map(
        ({ show, position, Icon, onClick }) =>
          show && (
            <button
              key={position}
              className={`absolute ${position} top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-2`}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <Icon className="w-8 h-8" />
            </button>
          )
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

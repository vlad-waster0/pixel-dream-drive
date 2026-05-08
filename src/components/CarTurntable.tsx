import { useEffect, useRef, useState } from "react";

interface Props {
  frames: string[];
  alt: string;
  filter?: string;
  /** Seconds per full 360° revolution */
  durationSec?: number;
  className?: string;
}

/**
 * Frame-by-frame 360° turntable. Preloads all frames, then advances the
 * displayed frame on a fixed cadence. The user can also click-and-drag to
 * scrub the rotation manually.
 */
export function CarTurntable({ frames, alt, filter, durationSec = 18, className = "" }: Props) {
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const draggingRef = useRef<{ startX: number; startIdx: number } | null>(null);
  const autoRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);

  // Preload all frames
  useEffect(() => {
    let mounted = true;
    let loaded = 0;
    frames.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded === frames.length && mounted) setReady(true);
      };
      img.src = src;
    });
    return () => {
      mounted = false;
    };
  }, [frames]);

  // Auto-rotate loop (paused while dragging)
  useEffect(() => {
    if (!ready) return;
    const frameMs = (durationSec * 1000) / frames.length;
    const tick = (t: number) => {
      if (!draggingRef.current) {
        if (t - lastRef.current >= frameMs) {
          lastRef.current = t;
          setIdx((i) => (i + 1) % frames.length);
        }
      } else {
        lastRef.current = t;
      }
      autoRef.current = requestAnimationFrame(tick);
    };
    autoRef.current = requestAnimationFrame(tick);
    return () => {
      if (autoRef.current) cancelAnimationFrame(autoRef.current);
    };
  }, [ready, frames.length, durationSec]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    draggingRef.current = { startX: e.clientX, startIdx: idx };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = draggingRef.current;
    if (!d) return;
    const w = e.currentTarget.clientWidth || 1;
    const dx = e.clientX - d.startX;
    // One full revolution per container width dragged
    const delta = Math.round((dx / w) * frames.length);
    const next = ((d.startIdx + delta) % frames.length + frames.length) % frames.length;
    setIdx(next);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    draggingRef.current = null;
  };

  return (
    <div
      className={`absolute inset-0 select-none touch-none cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-500 ease-out"
          style={{ filter, opacity: i === idx ? 1 : 0 }}
        />
      ))}
      {/* Drag hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.4em] text-white/40 pointer-events-none">
        ◂ ARRASTE PARA GIRAR ▸
      </div>
    </div>
  );
}
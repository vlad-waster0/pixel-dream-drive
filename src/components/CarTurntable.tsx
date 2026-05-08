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
  const [prevIdx, setPrevIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const draggingRef = useRef<{ startX: number; startIdx: number } | null>(null);
  const autoRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const [blending, setBlending] = useState(false);

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
          setIdx((i) => {
            setPrevIdx(i);
            setBlending(true);
            return (i + 1) % frames.length;
          });
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
    setPrevIdx(idx);
    setBlending(true);
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
      <div className="absolute inset-x-[12%] bottom-[16%] h-[18%] rounded-full border border-primary/30 bg-primary/10 blur-3xl opacity-80 pointer-events-none" />
      <div className="absolute left-1/2 bottom-[12%] h-[10px] w-[64%] -translate-x-1/2 rounded-full bg-primary/25 blur-md pointer-events-none" />
      <div className="absolute left-1/2 bottom-[11.5%] h-[2px] w-[58%] -translate-x-1/2 bg-primary/70 pointer-events-none" />

      {frames[prevIdx] && prevIdx !== idx && (
        <img
          src={frames[prevIdx]}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={`absolute left-1/2 bottom-[14%] h-[68%] w-auto max-w-[88%] -translate-x-1/2 object-contain pointer-events-none transition-opacity duration-500 ease-out ${blending ? "opacity-0" : "opacity-100"}`}
          style={{ filter, transformOrigin: "center bottom" }}
        />
      )}
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
          className={`absolute left-1/2 bottom-[14%] h-[68%] w-auto max-w-[88%] -translate-x-1/2 object-contain pointer-events-none transition-[opacity,filter] duration-500 ease-out ${i === idx ? "opacity-100" : "opacity-0"}`}
          style={{ filter, transformOrigin: "center bottom" }}
        />
      ))}
      {/* Drag hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.4em] text-white/40 pointer-events-none">
        ◂ ARRASTE PARA GIRAR ▸
      </div>
    </div>
  );
}
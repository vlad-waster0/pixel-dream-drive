import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { getUser } from "@/lib/auth";
import introVideo from "@/assets/intro.mp4";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Try to unmute & play (modern browsers may block; we keep muted fallback)
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.volume = 1;
      const p = v.play();
      if (p) p.catch(() => { v.muted = true; v.play().catch(() => {}); });
    }
    const t = setTimeout(() => {
      const u = getUser();
      navigate({ to: u ? "/garage" : "/login" });
    }, 5200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        onClick={() => { const u = getUser(); navigate({ to: u ? "/garage" : "/login" }); }}
        className="absolute bottom-8 right-8 text-[10px] tracking-[0.4em] text-white/70 hover:text-white border border-white/30 hover:border-white px-4 py-2 backdrop-blur"
      >PULAR ▸</button>
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => {
      const u = getUser();
      navigate({ to: u ? "/garage" : "/login" });
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-scanlines" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />

      <div className="relative text-center px-6">
        <div className={`transition-all duration-700 ${phase >= 0 ? "opacity-100" : "opacity-0"}`}>
          <div className="text-[10px] tracking-[0.5em] text-muted-foreground mb-4">SVERIGE · SWEDEN · 1994</div>
        </div>
        <h1 className={`font-display text-5xl md:text-8xl font-black tracking-widest text-glow-red transition-all duration-1000 ${phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          KOENIGSEGG
        </h1>
        <div className={`mt-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-1000 ${phase >= 2 ? "w-full opacity-100" : "w-0 opacity-0"}`} />
        <div className={`mt-4 text-xs tracking-[0.4em] text-primary transition-opacity duration-700 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}>
          INICIANDO MOTORES...
        </div>
      </div>
    </div>
  );
}

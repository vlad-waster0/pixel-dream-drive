import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cars } from "@/data/cars";
import { Header } from "@/components/landing/Header";
import { getUser } from "@/lib/auth";
import { playClick, playRev } from "@/lib/engine-sound";
import heroJesko from "@/assets/hero-jesko.jpg";

export const Route = createFileRoute("/garage")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" });
  },
  component: Garage,
});

function Garage() {
  const navigate = useNavigate();
  const [headlights, setHeadlights] = useState(false);
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroIn(true), 100);
    const t2 = setTimeout(() => setHeadlights(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleCar = (id: string) => {
    playClick();
    navigate({ to: "/car/$id", params: { id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className={`absolute inset-0 transition-all duration-[1800ms] ease-out ${heroIn ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}>
          <img src={heroJesko} alt="Koenigsegg" className="w-full h-full object-cover" />
          {/* Headlight flares */}
          <div className={`absolute left-[14%] top-[55%] w-32 h-32 md:w-56 md:h-56 rounded-full bg-white blur-3xl ${headlights ? "animate-headlight" : "opacity-0"}`} />
          <div className={`absolute right-[14%] top-[55%] w-24 h-24 md:w-44 md:h-44 rounded-full bg-primary blur-3xl ${headlights ? "animate-headlight" : "opacity-0"}`} style={{ animationDelay: "0.3s" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="absolute inset-0 bg-scanlines pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />

        <div className="absolute inset-x-0 bottom-0 px-4 md:px-12 pb-12">
          <div className={`transition-all duration-1000 delay-500 ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="text-[10px] md:text-xs tracking-[0.5em] text-primary mb-3">ÄNGELHOLM · 1994 — ∞</div>
            <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-black tracking-widest text-glow-red leading-none">
              KOENIGSEGG
            </h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">
              Toda a linhagem de hipercarros suecos. Do CC8S original ao Jesko Absolut.
            </p>
          </div>
        </div>
      </section>

      {/* MARQUEE — auto-scrolling cards */}
      <section className="relative py-10 border-y border-border overflow-hidden">
        <div className="absolute top-0 left-0 right-0 px-4 md:px-12 pt-2 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.4em] text-muted-foreground">EM MOVIMENTO</span>
          <span className="text-[10px] tracking-[0.4em] text-primary">{cars.length} MODELOS</span>
        </div>
        <div className="flex gap-4 animate-marquee w-max mt-4">
          {[...cars, ...cars].map((c, i) => (
            <button
              key={i}
              onClick={() => handleCar(c.id)}
              className="group relative w-64 md:w-80 h-40 md:h-48 shrink-0 overflow-hidden border border-border hover:border-primary transition"
            >
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <div className="text-[9px] tracking-[0.3em] text-primary">{c.year}</div>
                <div className="font-display text-lg tracking-wider">{c.name}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* GRID — square cards stacked */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[10px] tracking-[0.4em] text-primary">COLEÇÃO</div>
            <h2 className="font-display text-2xl md:text-3xl font-black tracking-wider mt-1">TODOS OS MODELOS</h2>
          </div>
          <div className="text-[10px] tracking-[0.3em] text-muted-foreground">{cars.length} CARROS</div>
        </div>

        <div className="space-y-4">
          {cars.map((c, i) => (
            <CarSquareCard key={c.id} car={c} index={i} onClick={() => handleCar(c.id)} />
          ))}
        </div>

        {/* About brand & factory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <Link to="/brand" className="group relative aspect-square border border-border bg-card hover:border-primary transition overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="relative h-full flex flex-col justify-between p-6">
              <div className="text-[10px] tracking-[0.4em] text-primary">/01</div>
              <div>
                <div className="font-display text-2xl md:text-3xl font-black tracking-wider">HISTÓRIA</div>
                <div className="text-xs tracking-widest text-muted-foreground mt-2">DA MARCA</div>
              </div>
              <div className="text-[10px] tracking-[0.3em] text-primary group-hover:translate-x-2 transition-transform">DESCOBRIR ▸</div>
            </div>
          </Link>
          <Link to="/factory" className="group relative aspect-square border border-border bg-card hover:border-primary transition overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="relative h-full flex flex-col justify-between p-6">
              <div className="text-[10px] tracking-[0.4em] text-primary">/02</div>
              <div>
                <div className="font-display text-2xl md:text-3xl font-black tracking-wider">FÁBRICA</div>
                <div className="text-xs tracking-widest text-muted-foreground mt-2">ÄNGELHOLM, SUÉCIA</div>
              </div>
              <div className="text-[10px] tracking-[0.3em] text-primary group-hover:translate-x-2 transition-transform">VISITAR ▸</div>
            </div>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center">
        <div className="text-[10px] tracking-[0.4em] text-muted-foreground">KOENIGSEGG AUTOMOTIVE AB · SVERIGE</div>
      </footer>
    </div>
  );
}

function CarSquareCard({ car, index, onClick }: any) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={() => { setPressed(true); setTimeout(onClick, 250); playRev(0.5); }}
      className={`group relative w-full aspect-square overflow-hidden border border-border hover:border-primary bg-card transition-all duration-300 ${pressed ? "scale-95 brightness-150" : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <img src={car.image} alt={car.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-scanlines opacity-20" />

      {/* corner brackets */}
      <div className="absolute top-2 left-2 w-5 h-5 border-l-2 border-t-2 border-primary opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute top-2 right-2 w-5 h-5 border-r-2 border-t-2 border-primary opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute bottom-2 left-2 w-5 h-5 border-l-2 border-b-2 border-primary opacity-0 group-hover:opacity-100 transition" />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-r-2 border-b-2 border-primary opacity-0 group-hover:opacity-100 transition" />

      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.4em] text-primary">/{String(index + 1).padStart(2, "0")}</span>
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground">{car.year}</span>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] text-muted-foreground mb-1">{car.tagline}</div>
          <div className="font-display text-3xl md:text-5xl font-black tracking-wider text-glow-red">{car.name.toUpperCase()}</div>
          <div className="mt-2 flex flex-wrap gap-3 text-[10px] tracking-widest text-muted-foreground">
            <span><span className="text-primary">{car.specs.power}</span> POTÊNCIA</span>
            <span><span className="text-primary">{car.specs.topSpeed}</span> MAX</span>
          </div>
        </div>
      </div>
    </button>
  );
}

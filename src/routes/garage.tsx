import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { cars } from "@/data/cars";
import { Header } from "@/components/landing/Header";
import { getUser } from "@/lib/auth";
import { playClick, playRev } from "@/lib/engine-sound";
import historyImg from "@/assets/history.jpg";
import factoryImg from "@/assets/factory.jpg";
import locationsImg from "@/assets/locations.jpg";
import introVideo from "@/assets/intro.mp4";

export const Route = createFileRoute("/garage")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" });
  },
  component: Garage,
});

function Garage() {
  const navigate = useNavigate();
  const [heroIn, setHeroIn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    const p = v.play();
    if (p) p.catch(() => { v.muted = true; setMuted(true); v.play().catch(() => {}); });
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  };

  useEffect(() => {
    const t1 = setTimeout(() => setHeroIn(true), 100);
    return () => { clearTimeout(t1); };
  }, []);

  const handleCar = (id: string) => {
    navigate({ to: "/car/$id", params: { id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden cursor-pointer" onClick={toggleMute}>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className={`absolute inset-0 transition-all duration-[1800ms] ease-out ${heroIn ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}>
          <video
            ref={videoRef}
            src={introVideo}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="absolute inset-0 bg-scanlines pointer-events-none" />
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
              className="group relative w-40 md:w-56 h-24 md:h-32 shrink-0 overflow-hidden border border-border hover:border-primary transition bg-black"
            >
              <img src={c.image} alt={c.name} loading="eager" decoding="async" className="absolute inset-0 w-full h-full object-contain p-1 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 text-left">
                <div className="text-[8px] tracking-[0.3em] text-primary">{c.year}</div>
                <div className="font-display text-sm tracking-wider">{c.name}</div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <ImageCard to="/brand" num="/01" title="HISTÓRIA" sub="DA MARCA" cta="DESCOBRIR ▸" img={historyImg} />
          <ImageCard to="/factory" num="/02" title="FÁBRICA" sub="ÄNGELHOLM, SUÉCIA" cta="VISITAR ▸" img={factoryImg} />
          <ImageCard to="/locations" num="/03" title="LOCAIS" sub="VENDA · ALUGUEL · MUSEUS" cta="EXPLORAR ▸" img={locationsImg} />
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
  const handleClick = () => {
    setPressed(true);
    setTimeout(onClick, 250);
  };

  return (
    <button
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      className={`group relative w-full aspect-square overflow-hidden border border-border hover:border-primary bg-card transition-all duration-300 ${pressed ? "scale-95 brightness-150" : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <img
        src={car.image}
        alt={car.name}
        loading="eager"
        decoding="async"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        className="no-save absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
      />
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

function ImageCard({ to, num, title, sub, cta, img }: { to: string; num: string; title: string; sub: string; cta: string; img: string }) {
  return (
    <Link to={to} className="group relative aspect-square border border-border bg-card hover:border-primary transition overflow-hidden">
      <img src={img} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative h-full flex flex-col justify-between p-6">
        <div className="text-[10px] tracking-[0.4em] text-primary">{num}</div>
        <div>
          <div className="font-display text-2xl md:text-3xl font-black tracking-wider">{title}</div>
          <div className="text-xs tracking-widest text-muted-foreground mt-2">{sub}</div>
        </div>
        <div className="text-[10px] tracking-[0.3em] text-primary group-hover:translate-x-2 transition-transform">{cta}</div>
      </div>
    </Link>
  );
}

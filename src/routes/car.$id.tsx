import { createFileRoute, useParams, Link, redirect, notFound } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { cars } from "@/data/cars";
import { Header } from "@/components/landing/Header";
import { getUser } from "@/lib/auth";
import { playRev, playClick } from "@/lib/engine-sound";
import engineImg from "@/assets/parts/engine.png";
import wheelImg from "@/assets/parts/wheel.png";
import steeringImg from "@/assets/parts/steering.png";
import wingImg from "@/assets/parts/wing.png";
import gearboxImg from "@/assets/parts/gearbox.png";
import brakeImg from "@/assets/parts/brake.png";

export const Route = createFileRoute("/car/$id")({
  beforeLoad: ({ params }) => {
    if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" });
    if (!cars.find((c) => c.id === params.id)) throw notFound();
  },
  component: CarPage,
});

const COLORS = [
  { name: "BLACK", hex: "#0a0a0a", filter: "brightness(0.7) contrast(1.1)" },
  { name: "BLOOD", hex: "#c41e3a", filter: "hue-rotate(0deg) saturate(2) brightness(0.85)" },
  { name: "ARCTIC", hex: "#e8e8e8", filter: "brightness(1.3) saturate(0.3) contrast(0.95)" },
  { name: "STEEL", hex: "#5a6772", filter: "saturate(0.4) brightness(0.95) hue-rotate(180deg)" },
  { name: "ROYAL", hex: "#1e3a8a", filter: "hue-rotate(200deg) saturate(1.5)" },
  { name: "GOLD", hex: "#d4a017", filter: "hue-rotate(40deg) saturate(1.4) brightness(1.1)" },
  { name: "EMERALD", hex: "#0f7a3d", filter: "hue-rotate(120deg) saturate(1.3)" },
];

const PARTS = [
  { img: engineImg, name: "MOTOR V8", spec: "TWIN-TURBO" },
  { img: wheelImg, name: "RODA", spec: "AIRCORE CARBON" },
  { img: steeringImg, name: "VOLANTE", spec: "CARBONO" },
  { img: wingImg, name: "AILERON", spec: "AERO ATIVA" },
  { img: gearboxImg, name: "CÂMBIO", spec: "LST 9-VEL" },
  { img: brakeImg, name: "FREIO", spec: "CARBO-CERÂMICO" },
];

function CarPage() {
  const { id } = useParams({ from: "/car/$id" });
  const car = useMemo(() => cars.find((c) => c.id === id)!, [id]);
  const [colorIdx, setColorIdx] = useState(0);
  const [pendingIdx, setPendingIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const currentColor = COLORS[colorIdx];
  const pendingColor = COLORS[pendingIdx];

  const confirmColor = () => {
    if (pendingIdx === colorIdx) return;
    playRev(2.2);
    setColorIdx(pendingIdx);
    setAnimKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        <Link to="/garage" className="text-[10px] tracking-[0.4em] text-muted-foreground hover:text-primary">← VOLTAR À GARAGEM</Link>
      </div>

      {/* HERO STAGE */}
      <section className="relative max-w-6xl mx-auto px-4 md:px-8 pt-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-[10px] tracking-[0.4em] text-primary">{car.yearsProduced.toUpperCase()}</div>
            <h1 className="font-display text-4xl md:text-7xl font-black tracking-widest text-glow-red leading-none mt-1">
              {car.name.toUpperCase()}
            </h1>
            <div className="text-xs md:text-sm tracking-widest text-muted-foreground mt-2">{car.tagline}</div>
          </div>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden bg-card border border-border">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />

          {/* Car image with drive-by animation on color change */}
          <div key={animKey} className="absolute inset-0 flex items-center justify-center">
            <img
              src={car.image}
              alt={car.fullName}
              className="w-full h-full object-cover animate-drive-by"
              style={{ filter: currentColor.filter }}
            />
          </div>

          {/* Static current image once animation done */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ animation: "none" }}>
            <img
              src={car.image}
              alt=""
              aria-hidden
              className="w-full h-full object-cover opacity-0"
              style={{ filter: currentColor.filter, animation: `fadeIn 0.4s ${1.4}s ease-out forwards` }}
            />
          </div>

          {/* corners */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary" />
          <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-primary" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-primary" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary" />

          {/* Color slider — vertical */}
          <div className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
            <div className="text-[9px] tracking-[0.3em] text-primary">COR</div>
            <input
              type="range"
              min={0}
              max={COLORS.length - 1}
              step={1}
              value={pendingIdx}
              onChange={(e) => { setPendingIdx(Number(e.target.value)); playClick(); }}
              className="vertical-slider"
              style={{
                writingMode: "vertical-lr" as any,
                WebkitAppearance: "slider-vertical" as any,
                width: "8px",
                height: "180px",
                accentColor: pendingColor.hex,
              }}
            />
            <div className="w-7 h-7 rounded-full border-2 border-white/80 shadow-lg" style={{ backgroundColor: pendingColor.hex, boxShadow: `0 0 20px ${pendingColor.hex}` }} />
            <div className="text-[9px] tracking-[0.3em] text-foreground">{pendingColor.name}</div>
            <button
              onClick={confirmColor}
              className="px-3 py-1.5 bg-primary text-primary-foreground text-[10px] tracking-[0.3em] font-bold hover:brightness-125 transition animate-pulse-red"
            >
              OK
            </button>
          </div>

          {/* Speed badge */}
          <div className="absolute left-3 md:left-5 top-3 md:top-5 border border-primary/50 bg-background/70 backdrop-blur px-2 py-1">
            <div className="text-[9px] tracking-[0.3em] text-primary">VEL. MÁX</div>
            <div className="font-display text-base md:text-lg font-black">{car.specs.topSpeed}</div>
          </div>
        </div>

        {/* color quick chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground mr-2">PALETA:</span>
          {COLORS.map((c, i) => (
            <button key={c.name} onClick={() => { setPendingIdx(i); playClick(); }} className={`w-6 h-6 rounded-full border-2 transition ${pendingIdx === i ? "border-primary scale-125" : "border-border"}`} style={{ backgroundColor: c.hex }} aria-label={c.name} />
          ))}
        </div>
      </section>

      {/* SPECS GRID */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
        <SectionHeader num="01" title="ESPECIFICAÇÕES" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border mt-6">
          <Spec label="ANO" value={String(car.year)} />
          <Spec label="ORIGEM" value={car.origin} />
          <Spec label="UNIDADES" value={car.units} />
          <Spec label="MOTOR" value={car.specs.engine} />
          <Spec label="POTÊNCIA" value={car.specs.power} highlight />
          <Spec label="TORQUE" value={car.specs.torque} />
          <Spec label="PESO" value={car.specs.weight} />
          <Spec label="0–100 KM/H" value={car.specs.acceleration} highlight />
          <Spec label="VEL. MÁX" value={car.specs.topSpeed} highlight />
          <Spec label="CÂMBIO" value={car.specs.transmission} />
          <Spec label="TRAÇÃO" value={car.specs.drivetrain} />
          <Spec label="FÁBRICA" value={car.factory} />
        </div>
      </section>

      {/* BLUEPRINT / DIMENSIONS */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
        <SectionHeader num="02" title="DIMENSÕES · BLUEPRINT" />
        <div className="mt-6 border border-border bg-card p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="relative aspect-[2/1]">
                <BlueprintSVG />
              </div>
              <div className="mt-2 text-[10px] tracking-[0.3em] text-muted-foreground text-center">VISTA LATERAL · ESCALA 1:30</div>
            </div>
            <div className="space-y-3">
              <DimRow label="COMPRIMENTO" value={car.specs.length} />
              <DimRow label="LARGURA" value={car.specs.width} />
              <DimRow label="ALTURA" value={car.specs.height} />
              <DimRow label="ENTRE-EIXOS" value={car.specs.wheelbase} />
            </div>
          </div>
        </div>
      </section>

      {/* PARTS — FLOATING */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
        <SectionHeader num="03" title="COMPONENTES" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6">
          {PARTS.map((p, i) => (
            <div key={p.name} className="relative aspect-square border border-border bg-card overflow-hidden group">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" style={{ background: "radial-gradient(circle at center, oklch(0.58 0.24 25 / 0.15), transparent 70%)" }} />
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 m-auto w-3/4 h-3/4 object-contain animate-float-part"
                style={{ animationDelay: `${i * 0.4}s`, mixBlendMode: "screen" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background to-transparent">
                <div className="font-display text-sm tracking-widest">{p.name}</div>
                <div className="text-[9px] tracking-[0.3em] text-primary">{p.spec}</div>
              </div>
              <div className="absolute top-2 right-2 text-[9px] tracking-[0.3em] text-muted-foreground">/{String(i+1).padStart(2,"0")}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HISTORY */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 mt-12 mb-16">
        <SectionHeader num="04" title="HISTÓRIA" />
        <div className="mt-6 space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          <p className="text-foreground font-display text-lg tracking-wider">{car.fullName}</p>
          <p>{car.description}</p>
          <p>{car.history}</p>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center">
        <div className="text-[10px] tracking-[0.4em] text-muted-foreground">KOENIGSEGG · {car.fullName.toUpperCase()}</div>
      </footer>

      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
    </div>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-[10px] tracking-[0.4em] text-primary">/{num}</div>
      <div className="h-px flex-1 bg-gradient-to-r from-primary via-border to-transparent" />
      <div className="font-display text-lg md:text-2xl tracking-wider">{title}</div>
    </div>
  );
}

function Spec({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-card p-4 md:p-5">
      <div className="text-[9px] tracking-[0.3em] text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-base md:text-xl ${highlight ? "text-primary text-glow-red" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

function DimRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2">
      <span className="text-[10px] tracking-[0.3em] text-muted-foreground">{label}</span>
      <span className="font-display text-base text-primary">{value}</span>
    </div>
  );
}

function BlueprintSVG() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" stroke="currentColor" fill="none" strokeWidth="1.2">
      <g className="text-primary">
        {/* simplified hypercar silhouette */}
        <path d="M30 140 Q40 130 60 128 L90 110 Q140 90 200 88 Q260 86 310 105 L340 122 Q360 124 370 138 L370 150 L30 150 Z" strokeWidth="1.5" />
        <circle cx="90" cy="150" r="22" />
        <circle cx="90" cy="150" r="10" />
        <circle cx="310" cy="150" r="22" />
        <circle cx="310" cy="150" r="10" />
        {/* cockpit */}
        <path d="M150 90 Q175 70 220 70 Q260 72 280 90" />
        {/* rear wing */}
        <path d="M340 90 L370 80 L370 95 L340 100" />
      </g>
      <g className="text-muted-foreground" strokeWidth="0.6" strokeDasharray="3 3">
        <line x1="30" y1="180" x2="370" y2="180" />
        <line x1="30" y1="175" x2="30" y2="185" />
        <line x1="370" y1="175" x2="370" y2="185" />
        <line x1="68" y1="60" x2="332" y2="60" />
      </g>
      <g className="text-muted-foreground" fontSize="7" fontFamily="monospace" fill="currentColor" stroke="none">
        <text x="195" y="195" textAnchor="middle">L</text>
        <text x="195" y="55" textAnchor="middle">W</text>
      </g>
    </svg>
  );
}

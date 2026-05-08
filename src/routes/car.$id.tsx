import { createFileRoute, useParams, Link, redirect, notFound } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { cars } from "@/data/cars";
import { Header } from "@/components/landing/Header";
import { getUser } from "@/lib/auth";
import { playClick } from "@/lib/engine-sound";
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

// Pintura — cor do carro (afeta a imagem inteira)
const PAINTS = [
  { name: "BLOOD", hex: "#c41e3a" },
  { name: "ARCTIC", hex: "#e8e8e8" },
  { name: "STEEL", hex: "#5a6772" },
  { name: "ROYAL", hex: "#1e3a8a" },
  { name: "GOLD", hex: "#d4a017" },
  { name: "EMERALD", hex: "#0f7a3d" },
  { name: "BLACK", hex: "#1a1a1a" },
];

// Detalhes — cor de listras/aerofólio/aro (faixa fina sobre o carro, sem brilho)
const DETAILS = [
  { name: "OFF", hex: "transparent" },
  { name: "ELECTRIC", hex: "#3b82f6" },
  { name: "YELLOW", hex: "#facc15" },
  { name: "RED", hex: "#ef4444" },
  { name: "LIME", hex: "#84cc16" },
  { name: "MAGENTA", hex: "#ec4899" },
  { name: "ORANGE", hex: "#f97316" },
  { name: "WHITE", hex: "#ffffff" },
];

const PARTS = [
  { img: engineImg, name: "MOTOR V8", spec: "TWIN-TURBO", info: "Motor V8 5.0L biturbo desenvolvido inteiramente in-house. Bloco em alumínio fundido, virabrequim plano (flat-plane crank) e capacidade de operar com gasolina ou etanol E85, dobrando a potência no biocombustível." },
  { img: wheelImg, name: "RODA", spec: "AIRCORE CARBON", info: "Tecnologia exclusiva da Koenigsegg: roda monobloco em fibra de carbono oca por dentro, pesando até 40% menos que rodas forjadas de alumínio. Reduz massa não-suspensa e melhora tudo." },
  { img: steeringImg, name: "VOLANTE", spec: "CARBONO", info: "Volante de fibra de carbono com display SmartCenter integrado, controles de aileron, modos de condução e launch control. Quick-release, removível para entrar e sair." },
  { img: wingImg, name: "AILERON", spec: "AERO ATIVA", info: "Aerofólio ativo controlado eletronicamente. Reduz arrasto em alta velocidade, ajusta downforce em curvas e atua como freio aerodinâmico ao desacelerar bruscamente." },
  { img: gearboxImg, name: "CÂMBIO", spec: "LST 9-VEL", info: "Light Speed Transmission: caixa de 9 marchas com 7 embreagens que permite trocas instantâneas para qualquer marcha — sem pular sequencialmente. Mais leve que uma transmissão tradicional de 7 marchas." },
  { img: brakeImg, name: "FREIO", spec: "CARBO-CERÂMICO", info: "Discos cerâmicos de carbono ventilados com pinças de 6 pistões na frente e 4 atrás. Resistentes a fade extremo — frenagem repetida acima de 300 km/h sem perda de performance." },
];

function CarPage() {
  const { id } = useParams({ from: "/car/$id" });
  const car = useMemo(() => cars.find((c) => c.id === id)!, [id]);
  const [paintIdx, setPaintIdx] = useState(0);
  const [detailIdx, setDetailIdx] = useState(0);
  const [openPart, setOpenPart] = useState<number | null>(null);

  const currentPaint = PAINTS[paintIdx];
  const currentDetail = DETAILS[detailIdx];

  const applyPaint = (nextIdx: number) => {
    playClick();
    setPaintIdx(nextIdx);
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

          <img
            src={car.image}
            alt={car.fullName}
            loading="eager"
            decoding="async"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* PINTURA — recolore só o carro (o fundo preto permanece preto com mix-blend color) */}
          <div
            className="absolute inset-0 pointer-events-none transition-[background-color] duration-500"
            style={{ backgroundColor: currentPaint.hex, mixBlendMode: "color", opacity: 1 }}
          />
          {/* reforço de saturação para tons puros */}
          <div
            className="absolute inset-0 pointer-events-none transition-[background-color] duration-500"
            style={{ backgroundColor: currentPaint.hex, mixBlendMode: "hue", opacity: 0.6 }}
          />

          {/* DETALHES — só os realces/listras (color-dodge afeta apenas áreas claras) */}
          {currentDetail.hex !== "transparent" && (
            <div
              className="absolute inset-0 pointer-events-none transition-[background-color] duration-500"
              style={{ backgroundColor: currentDetail.hex, mixBlendMode: "color-dodge", opacity: 0.35 }}
            />
          )}

          {/* corners */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary" />
          <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-primary" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-primary" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary" />

          {/* Speed badge */}
          <div className="absolute left-3 md:left-5 top-3 md:top-5 border border-primary/50 bg-background/70 backdrop-blur px-2 py-1">
            <div className="text-[9px] tracking-[0.3em] text-primary">VEL. MÁX</div>
            <div className="font-display text-base md:text-lg font-black">{car.specs.topSpeed}</div>
          </div>
        </div>

        {/* PINTURA — cor do carro */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground mr-2">PINTURA:</span>
          {PAINTS.map((c, i) => (
            <button key={c.name} onClick={() => applyPaint(i)} className={`w-6 h-6 rounded-full border-2 transition ${paintIdx === i ? "border-primary scale-125" : "border-border"}`} style={{ backgroundColor: c.hex }} aria-label={c.name} />
          ))}
          <span className="text-[10px] tracking-[0.3em] text-foreground ml-2">{currentPaint.name}</span>
        </div>

        {/* DETALHES — listras/acabamentos */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground mr-2">DETALHES:</span>
          {DETAILS.map((a, i) => (
            <button
              key={a.name}
              onClick={() => { playClick(); setDetailIdx(i); }}
              className={`relative w-6 h-6 rounded-full border-2 transition ${detailIdx === i ? "border-primary scale-125" : "border-border"}`}
              style={{ backgroundColor: a.hex === "transparent" ? "#222" : a.hex }}
              aria-label={a.name}
              title={a.name}
            >
              {a.hex === "transparent" && <span className="absolute inset-0 flex items-center justify-center text-[8px] text-white/60">✕</span>}
            </button>
          ))}
          <span className="text-[10px] tracking-[0.3em] text-foreground ml-2">{currentDetail.name}</span>
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
        <div className="mt-6 border border-white/15 bg-black p-6 md:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="relative aspect-[2/1]">
                <BlueprintSVG car={car} />
              </div>
              <div className="mt-2 text-[10px] tracking-[0.3em] text-white/40 text-center">VISTA TÉCNICA · {car.fullName.toUpperCase()}</div>
            </div>
            <div className="space-y-2 border-l border-white/15 md:pl-6">
              <BpRow label="ANO" value={String(car.year)} />
              <BpRow label="MOTOR" value={car.specs.engine.split(" ").slice(0,3).join(" ")} />
              <BpRow label="POTÊNCIA" value={car.specs.power} />
              <BpRow label="TORQUE" value={car.specs.torque} />
              <BpRow label="PESO" value={car.specs.weight} />
              <BpRow label="0-100 KM/H" value={car.specs.acceleration} />
              <BpRow label="VEL. MÁX" value={car.specs.topSpeed} />
            </div>
          </div>
        </div>
      </section>

      {/* PARTS — FLOATING */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mt-12">
        <SectionHeader num="03" title="COMPONENTES" />
        <div className="text-[10px] tracking-[0.3em] text-muted-foreground mt-2">CLIQUE EM CADA PEÇA</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6">
          {PARTS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => { playClick(); setOpenPart(openPart === i ? null : i); }}
              className="relative aspect-square border border-border bg-card overflow-hidden group text-left hover:border-primary transition"
            >
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, oklch(0.58 0.24 25 / 0.15), transparent 70%)" }} />
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 m-auto w-3/4 h-3/4 object-contain animate-float-part"
                style={{ animationDelay: `${i * 0.4}s`, mixBlendMode: "screen" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background via-background/80 to-transparent">
                <div className="font-display text-sm tracking-widest">{p.name}</div>
                <div className="text-[9px] tracking-[0.3em] text-primary">{p.spec}</div>
              </div>
              <div className="absolute top-2 right-2 text-[9px] tracking-[0.3em] text-muted-foreground">/{String(i+1).padStart(2,"0")}</div>
            </button>
          ))}
        </div>

        {openPart !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur" onClick={() => setOpenPart(null)}>
            <div className="relative max-w-md w-full border border-primary bg-card p-6 animate-glitch-in" onClick={(e) => e.stopPropagation()}>
              <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-primary" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary" />
              <div className="flex gap-4">
                <img src={PARTS[openPart].img} alt="" className="w-24 h-24 object-contain shrink-0" style={{ mixBlendMode: "screen" }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-[0.3em] text-primary">{PARTS[openPart].spec}</div>
                  <div className="font-display text-xl tracking-wider mt-1">{PARTS[openPart].name}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{PARTS[openPart].info}</p>
              <button onClick={() => setOpenPart(null)} className="mt-5 w-full py-2 bg-primary text-primary-foreground text-[10px] tracking-[0.3em]">FECHAR</button>
            </div>
          </div>
        )}
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

function BpRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[10px] tracking-[0.3em] text-white/50">{label}</span>
      <span className="font-display text-sm text-white">{value}</span>
    </div>
  );
}

function BlueprintSVG({ car }: { car: any }) {
  // White-on-black technical drawing — side view + dimensions, like the reference.
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" stroke="white" fill="none" strokeWidth="1" strokeLinecap="round">
      {/* Body silhouette */}
      <g>
        <path d="M28 142 Q40 132 62 128 L92 108 Q140 86 200 84 Q262 84 312 104 L342 122 Q364 124 374 140 L374 152 L28 152 Z" strokeWidth="1.4" />
        {/* cockpit / glass */}
        <path d="M138 108 Q180 70 230 70 Q270 72 296 100" />
        {/* door line */}
        <path d="M170 108 L185 145" strokeOpacity="0.6" />
        <path d="M250 108 L255 145" strokeOpacity="0.6" />
        {/* rear wing */}
        <path d="M340 92 L380 84 L380 96 L342 102" />
        {/* front splitter */}
        <path d="M28 148 L40 152 L62 152" strokeOpacity="0.6" />
        {/* wheels */}
        <circle cx="92" cy="152" r="22" />
        <circle cx="92" cy="152" r="14" strokeOpacity="0.6" />
        <circle cx="92" cy="152" r="6" />
        <circle cx="312" cy="152" r="22" />
        <circle cx="312" cy="152" r="14" strokeOpacity="0.6" />
        <circle cx="312" cy="152" r="6" />
        {/* spokes */}
        {[0,45,90,135].map((a) => (
          <g key={a}>
            <line x1={92 + 6*Math.cos(a*Math.PI/180)} y1={152 + 6*Math.sin(a*Math.PI/180)} x2={92 + 22*Math.cos(a*Math.PI/180)} y2={152 + 22*Math.sin(a*Math.PI/180)} strokeOpacity="0.4" />
            <line x1={312 + 6*Math.cos(a*Math.PI/180)} y1={152 + 6*Math.sin(a*Math.PI/180)} x2={312 + 22*Math.cos(a*Math.PI/180)} y2={152 + 22*Math.sin(a*Math.PI/180)} strokeOpacity="0.4" />
          </g>
        ))}
      </g>
      {/* Dimension lines */}
      <g strokeOpacity="0.5" strokeWidth="0.5">
        {/* total length */}
        <line x1="28" y1="180" x2="374" y2="180" />
        <line x1="28" y1="176" x2="28" y2="184" />
        <line x1="374" y1="176" x2="374" y2="184" />
        {/* wheelbase */}
        <line x1="92" y1="170" x2="312" y2="170" strokeDasharray="2 2" />
        <line x1="92" y1="166" x2="92" y2="174" />
        <line x1="312" y1="166" x2="312" y2="174" />
        {/* height */}
        <line x1="14" y1="70" x2="14" y2="152" />
        <line x1="10" y1="70" x2="18" y2="70" />
        <line x1="10" y1="152" x2="18" y2="152" />
      </g>
      <g fontSize="7" fontFamily="ui-monospace, monospace" fill="white" stroke="none" fillOpacity="0.85">
        <text x="201" y="192" textAnchor="middle">{car.specs.length}</text>
        <text x="201" y="166" textAnchor="middle" fontSize="6" fillOpacity="0.6">{car.specs.wheelbase}</text>
        <text x="14" y="65" textAnchor="middle" fontSize="6">{car.specs.height}</text>
        <text x="200" y="60" textAnchor="middle" fontSize="6" fillOpacity="0.6">{car.specs.width} (largura)</text>
      </g>
    </svg>
  );
}

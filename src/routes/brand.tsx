import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { getUser } from "@/lib/auth";
import heroJesko from "@/assets/hero-jesko.jpg";
import historyImg from "@/assets/history.jpg";
import factoryImg from "@/assets/factory.jpg";

export const Route = createFileRoute("/brand")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  component: BrandPage,
  head: () => ({ meta: [{ title: "História — Koenigsegg" }, { name: "description", content: "História da Koenigsegg." }] }),
});

const TIMELINE = [
  { year: "1994", title: "FUNDAÇÃO", img: historyImg, text: "Christian von Koenigsegg, aos 22 anos, funda a Koenigsegg Automotive AB em Olofström com a missão de construir o melhor hipercarro do mundo." },
  { year: "1996", title: "PRIMEIRO PROTÓTIPO", img: historyImg, text: "Apresentação do CC Prototype no Cannes Festival, definindo as bases do que viria a ser a marca." },
  { year: "2000", title: "MUDANÇA PARA ÄNGELHOLM", img: factoryImg, text: "A empresa muda-se para um antigo hangar da Força Aérea Sueca em Ängelholm — base operacional até hoje." },
  { year: "2002", title: "CC8S", img: historyImg, text: "Primeiro carro de produção. 6 unidades construídas. Estreia oficial em Genebra." },
  { year: "2005", title: "RECORDE MUNDIAL", img: heroJesko, text: "O CCR atinge 387,87 km/h em Nardò, batendo o recorde do McLaren F1." },
  { year: "2014", title: "ONE:1 MEGACAR", img: heroJesko, text: "Cunha o termo 'Megacar' com relação 1:1 entre potência e peso — 1 megawatt." },
  { year: "2017", title: "447 KM/H", img: heroJesko, text: "O Agera RS atinge 447,19 km/h em Nevada, sendo coroado o carro de produção mais rápido do mundo." },
  { year: "2020", title: "JESKO & GEMERA", img: heroJesko, text: "Apresentação do Jesko (foco em pista e velocidade) e do Gemera (primeiro Mega-GT 4 lugares do mundo)." },
  { year: "2022", title: "CC850", img: heroJesko, text: "Tributo aos 50 anos de Christian. Reinterpreta o CC8S com tecnologia moderna." },
];

function BrandPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative h-[50vh] overflow-hidden">
        <img src={heroJesko} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-10">
          <div className="text-[10px] tracking-[0.5em] text-primary">EST. 1994</div>
          <h1 className="font-display text-4xl md:text-7xl font-black tracking-widest text-glow-red mt-2">A HISTÓRIA</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mt-3">
            <span className="font-display text-foreground tracking-[0.3em]">ÄNGELHOLM</span> · Da Suécia para o mundo. Trinta anos redefinindo o que um hipercarro pode ser.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <div className="space-y-6">
          {TIMELINE.map((item, i) => (
            <div key={item.year} className="relative pl-10 border-l-2 border-border hover:border-primary transition group">
              <div className="absolute -left-[7px] top-1 w-3 h-3 bg-primary rounded-full group-hover:animate-pulse-red" />
              <div className="absolute -left-[80px] top-0 hidden md:block font-display text-3xl text-primary text-glow-red">{item.year}</div>
              <div className="md:hidden text-xs tracking-[0.3em] text-primary mb-1">{item.year}</div>
              <div className="font-display text-xl tracking-wider">{item.title}</div>
              <div className="mt-3 aspect-[16/9] overflow-hidden border border-border">
                <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-border bg-card p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.4em] text-primary">FILOSOFIA</div>
            <h3 className="font-display text-2xl mt-2 tracking-wider">"Don't say no to things you've never tried."</h3>
            <p className="text-sm text-muted-foreground mt-3">— Christian von Koenigsegg, fundador & CEO</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/factory" className="border border-border hover:border-primary transition p-5 group">
            <div className="text-[10px] tracking-[0.4em] text-primary">PRÓXIMO</div>
            <div className="font-display text-xl mt-2">A FÁBRICA ▸</div>
          </Link>
          <Link to="/garage" className="border border-border hover:border-primary transition p-5 group">
            <div className="text-[10px] tracking-[0.4em] text-primary">EXPLORAR</div>
            <div className="font-display text-xl mt-2">OS CARROS ▸</div>
          </Link>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { getUser } from "@/lib/auth";
import factoryImg from "@/assets/factory.jpg";
import historyImg from "@/assets/history.jpg";
import heroJesko from "@/assets/hero-jesko.jpg";

export const Route = createFileRoute("/factory")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  component: FactoryPage,
  head: () => ({ meta: [{ title: "Fábrica — Koenigsegg" }, { name: "description", content: "Fábrica em Ängelholm." }] }),
});

function FactoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative h-[55vh] overflow-hidden">
        <img src={factoryImg} alt="Fábrica Koenigsegg em Ängelholm" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-10">
          <div className="text-[10px] tracking-[0.5em] text-primary">56°15'N · 12°51'E</div>
          <h1 className="font-display text-4xl md:text-7xl font-black tracking-widest text-glow-red mt-2">ÄNGELHOLM</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mt-3">
            Onde cada Koenigsegg nasce — em uma antiga base aérea sueca.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-10 space-y-6">
        <Card label="LOCALIZAÇÃO" title="ÄNGELHOLM, SUÉCIA" img={factoryImg}>
          A fábrica fica numa antiga base da Força Aérea Sueca, no sul da Suécia. A pista de pouso adjacente é usada para testes de velocidade dos hipercarros.
        </Card>

        <Card label="PRIMEIRO CARRO" title="CC8S — 2002" img={historyImg}>
          Embora a empresa tenha sido fundada em 1994 e o primeiro protótipo apresentado em 1996, o primeiro carro de produção — o CC8S — foi entregue em 2002.
        </Card>

        <Card label="PRODUÇÃO" title="ARTESANAL" img={heroJesko}>
          Cada Koenigsegg é construído à mão por uma pequena equipe de mestres artesãos. O Jesko leva cerca de 4000 horas de trabalho para ser concluído.
        </Card>

        <Card label="PISTA PRÓPRIA" img={factoryImg}>
          A antiga pista de pouso da F10 Skånska Flygflottilj foi convertida em pista de teste — onde Koenigseggs ultrapassam regularmente 400 km/h em testes de calibração.
        </Card>

        <Card label="FUNCIONÁRIOS" title="~500 PESSOAS" img={historyImg}>
          Pequena, ágil, integrada verticalmente. A Koenigsegg fabrica internamente quase tudo — incluindo a maioria das peças do motor, transmissões e componentes de carbono.
        </Card>

        <div className="grid grid-cols-2 gap-px bg-border">
          <Stat label="FUNDAÇÃO" value="1994" />
          <Stat label="PRIMEIRO CARRO" value="2002" />
          <Stat label="PAÍS" value="SUÉCIA" />
          <Stat label="CIDADE" value="ÄNGELHOLM" />
        </div>

        <Link to="/garage" className="block border border-border hover:border-primary transition p-5">
          <div className="text-[10px] tracking-[0.4em] text-primary">VOLTAR</div>
          <div className="font-display text-xl mt-2">À GARAGEM ▸</div>
        </Link>
      </section>
    </div>
  );
}

function Card({ label, title, children, img }: any) {
  return (
    <div className="border border-border bg-card p-5 md:p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-12 h-px bg-primary" />
      <div className="text-[10px] tracking-[0.4em] text-primary">{label}</div>
      {title && <div className="font-display text-xl md:text-2xl tracking-wider mt-1">{title}</div>}
      {img && (
        <div className="mt-3 aspect-[16/9] overflow-hidden border border-border">
          <img src={img} alt="" loading="lazy" className="w-full h-full object-cover opacity-85" />
        </div>
      )}
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{children}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4 text-center">
      <div className="text-[9px] tracking-[0.3em] text-muted-foreground">{label}</div>
      <div className="font-display text-lg text-primary mt-1">{value}</div>
    </div>
  );
}

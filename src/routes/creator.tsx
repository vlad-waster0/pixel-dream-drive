import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { getUser } from "@/lib/auth";
import creatorImg from "@/assets/creator.jpg";
import creatorImg2 from "@/assets/creator-2.jpg";
import factoryImg from "@/assets/factory.jpg";
import historyImg from "@/assets/history.jpg";

export const Route = createFileRoute("/creator")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  component: CreatorPage,
  head: () => ({ meta: [{ title: "Criador — Christian von Koenigsegg" }, { name: "description", content: "Christian von Koenigsegg, fundador e CEO da Koenigsegg." }] }),
});

const currentYear = new Date().getFullYear();
const age = currentYear - 1972;

function CreatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative h-[60vh] overflow-hidden">
        <img src={creatorImg} alt="Christian von Koenigsegg" className="no-save absolute inset-0 w-full h-full object-cover object-center opacity-80" draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-10">
          <div className="text-[10px] tracking-[0.5em] text-primary">FUNDADOR · CEO</div>
          <h1 className="font-display text-3xl md:text-6xl font-black tracking-widest text-glow-red mt-2">CHRISTIAN<br/>VON KOENIGSEGG</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mt-3">
            O homem por trás da marca. Fundou a Koenigsegg aos 22 anos com uma única missão — construir o melhor hipercarro do mundo.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-10 space-y-6">
        <div className="space-y-3">
          <div className="aspect-[4/5] overflow-hidden border border-border">
            <img src={creatorImg} alt="Christian von Koenigsegg sentado em um Koenigsegg" loading="lazy" draggable={false} className="no-save w-full h-full object-cover" />
          </div>
          <div className="aspect-[16/9] overflow-hidden border border-border">
            <img src={creatorImg2} alt="Christian von Koenigsegg na fábrica" loading="lazy" draggable={false} className="no-save w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border">
          <Stat label="NASCIMENTO" value="1972" />
          <Stat label="IDADE" value={`${age} ANOS`} />
          <Stat label="NACIONALIDADE" value="SUECO" />
          <Stat label="RESIDÊNCIA" value="ÄNGELHOLM" />
          <Stat label="FUNDOU A MARCA" value="1994" />
          <Stat label="CARGO" value="CEO" />
        </div>

        <Info label="PERFIL" title="QUEM É CHRISTIAN">
          Christian Erland Harald von Koenigsegg nasceu em 2 de julho de 1972, em Estocolmo, Suécia. Filho de uma família ligada à aristocracia sueca de origem alemã, sempre teve fascínio por carros — assistiu, aos 5 anos, a um filme de animação norueguês ("Pinchcliffe Grand Prix") e decidiu ali que um dia construiria seu próprio hipercarro.
        </Info>

        <Info label="JUVENTUDE" title="DE TRADER A ENGENHEIRO">
          Antes da Koenigsegg, Christian dirigiu uma empresa de exportação de alimentos congelados na Europa Oriental, ainda adolescente. Foi o lucro desse negócio que financiou os primeiros passos da fábrica de hipercarros — sem nunca ter formação formal em engenharia automotiva.
        </Info>

        <Info label="FUNDAÇÃO" title="1994 — AOS 22 ANOS" img={historyImg}>
          Em agosto de 1994, com 22 anos, fundou a Koenigsegg Automotive AB em Olofström. Levou 8 anos para entregar o primeiro carro de produção (CC8S, em 2002). Desde então, construiu uma das marcas mais respeitadas do setor.
        </Info>

        <Info label="ATUALMENTE" title="CEO E ENGENHEIRO-CHEFE" img={factoryImg}>
          Hoje, aos {age} anos, Christian segue como CEO e principal designer/engenheiro da marca. Vive em Ängelholm com a esposa Halldora — co-fundadora e Diretora Criativa — e os dois filhos. É conhecido por estar pessoalmente envolvido em quase todos os projetos: do desenho do motor à seleção de couros do interior.
        </Info>

        <Info label="FAMÍLIA" title="HALLDORA VON KOENIGSEGG">
          Casado com Halldora von Koenigsegg, islandesa, ex-modelo, hoje Diretora Criativa da marca. Eles trabalham juntos no design e na identidade visual de cada novo modelo.
        </Info>

        <Info label="LEGADO" title="INVENÇÕES PRÓPRIAS">
          Christian é inventor patenteado: criou o sistema de portas Dihedral Synchrohelix, o motor sem comando de válvulas Freevalve (junto com a empresa-irmã), e a transmissão Light Speed Transmission (LST). Recebeu o título honorário de Doutor pela Linköping University.
        </Info>

        <div className="border border-border bg-card p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.4em] text-primary">PALAVRAS DELE</div>
            <h3 className="font-display text-xl md:text-2xl mt-2 tracking-wider">"Não diga não a coisas que você nunca tentou."</h3>
            <p className="text-sm text-muted-foreground mt-3">— Christian von Koenigsegg</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link to="/brand" className="border border-border hover:border-primary transition p-5">
            <div className="text-[10px] tracking-[0.4em] text-primary">VOLTAR</div>
            <div className="font-display text-xl mt-2">À HISTÓRIA</div>
          </Link>
          <Link to="/factory" className="border border-border hover:border-primary transition p-5">
            <div className="text-[10px] tracking-[0.4em] text-primary">VEJA</div>
            <div className="font-display text-xl mt-2">A FÁBRICA ▸</div>
          </Link>
        </div>
      </section>
    </div>
  );
}

function Info({ label, title, children, img }: { label: string; title?: string; children: React.ReactNode; img?: string }) {
  return (
    <div className="border border-border bg-card p-5 md:p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-12 h-px bg-primary" />
      <div className="text-[10px] tracking-[0.4em] text-primary">{label}</div>
      {title && <div className="font-display text-xl md:text-2xl tracking-wider mt-1">{title}</div>}
      {img && (
        <div className="mt-3 aspect-[16/9] overflow-hidden border border-border">
          <img src={img} alt="" loading="lazy" draggable={false} className="no-save w-full h-full object-cover opacity-85" />
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
      <div className="font-display text-base md:text-lg text-primary mt-1">{value}</div>
    </div>
  );
}

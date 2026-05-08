import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { getUser } from "@/lib/auth";
import locationsImg from "@/assets/locations.jpg";
import { MapPin, CalendarClock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Route = createFileRoute("/locations")({
  beforeLoad: () => { if (typeof window !== "undefined" && !getUser()) throw redirect({ to: "/login" }); },
  component: LocationsPage,
  head: () => ({ meta: [{ title: "Locais — Koenigsegg" }, { name: "description", content: "Onde encontrar Koenigsegg pelo mundo: vendedores oficiais, revendedores autorizados e museus." }] }),
});

interface Place {
  city: string;
  country: string;
  type: "DEALER" | "MUSEUM" | "RENTAL" | "FACTORY";
  name: string;
  address: string;
  hours?: string;
  phone?: string;
  whatsapp?: string;
}

const PLACES: Place[] = [
  { type: "FACTORY", city: "Ängelholm", country: "Suécia", name: "Koenigsegg HQ & Fábrica", address: "Valhall Park, 262 74 Ängelholm", hours: "Seg–Sex 09:00–17:00", phone: "+46 431 444 460" },
  { type: "DEALER", city: "Stockholm", country: "Suécia", name: "Koenigsegg Stockholm", address: "Strandvägen, Estocolmo", hours: "Seg–Sex 10:00–18:00 · Sáb 11:00–16:00", phone: "+46 8 555 123 00" },
  { type: "DEALER", city: "Genebra", country: "Suíça", name: "Auto Forever Geneva", address: "Rue de Lausanne, Genebra", hours: "Seg–Sex 09:00–18:30", phone: "+41 22 555 4040" },
  { type: "DEALER", city: "Mônaco", country: "Mônaco", name: "Monaco Luxury Cars", address: "Boulevard Princesse Charlotte", hours: "Seg–Sáb 10:00–19:00", phone: "+377 93 30 22 11", whatsapp: "+33 6 12 34 56 78" },
  { type: "DEALER", city: "Londres", country: "Reino Unido", name: "Koenigsegg London", address: "Park Lane, Mayfair", hours: "Seg–Sex 09:00–18:00 · Sáb 10:00–17:00", phone: "+44 20 7499 1234" },
  { type: "DEALER", city: "Dubai", country: "Emirados Árabes", name: "Al Habtoor Motors", address: "Sheikh Zayed Road, Dubai", hours: "Sáb–Qui 09:00–21:00", phone: "+971 4 269 9999", whatsapp: "+971 50 123 4567" },
  { type: "DEALER", city: "Doha", country: "Catar", name: "Alfardan Premier Motors", address: "Lusail, Doha", hours: "Sáb–Qui 09:00–20:00", phone: "+974 4040 4040" },
  { type: "DEALER", city: "Hong Kong", country: "China", name: "Koenigsegg Hong Kong", address: "Wan Chai, Hong Kong", hours: "Seg–Sáb 10:00–19:00", phone: "+852 2555 8888" },
  { type: "DEALER", city: "Tóquio", country: "Japão", name: "Bingo Sports Tokyo", address: "Aoyama, Minato, Tóquio", hours: "Ter–Dom 11:00–20:00", phone: "+81 3 5413 0088" },
  { type: "DEALER", city: "Newport Beach", country: "EUA", name: "Koenigsegg California", address: "Newport Beach, CA", hours: "Seg–Sáb 09:00–19:00", phone: "+1 949 555 0123" },
  { type: "DEALER", city: "Miami", country: "EUA", name: "Koenigsegg Florida", address: "Biscayne Boulevard, Miami", hours: "Seg–Sáb 09:00–20:00", phone: "+1 305 555 0199", whatsapp: "+1 305 555 0199" },
  { type: "DEALER", city: "Toronto", country: "Canadá", name: "Pfaff Reserve", address: "Concord, Ontario", hours: "Seg–Sex 09:00–18:00 · Sáb 10:00–17:00", phone: "+1 905 943 7700" },
  { type: "RENTAL", city: "Las Vegas", country: "EUA", name: "Dream Exotic Rentals", address: "Las Vegas Blvd", hours: "Aberto 24h", phone: "+1 702 605 0345", whatsapp: "+1 702 605 0345" },
  { type: "RENTAL", city: "Mônaco", country: "Mônaco", name: "Elite Rent-a-Car", address: "Avenue d'Ostende", hours: "Seg–Dom 08:00–22:00", phone: "+377 97 70 60 60" },
  { type: "RENTAL", city: "Dubai", country: "Emirados Árabes", name: "Carbookr Hypercar Rental", address: "Downtown Dubai", hours: "Aberto 24h", phone: "+971 4 333 1212", whatsapp: "+971 55 987 6543" },
  { type: "MUSEUM", city: "Ängelholm", country: "Suécia", name: "Koenigsegg Showroom", address: "Showroom oficial na fábrica", hours: "Sáb 10:00–16:00 (visita guiada)", phone: "+46 431 444 460" },
  { type: "MUSEUM", city: "Stuttgart", country: "Alemanha", name: "Motorworld Region Stuttgart", address: "Pragstraße, Stuttgart", hours: "Ter–Dom 10:00–18:00", phone: "+49 711 25 555 0" },
  { type: "MUSEUM", city: "Petersen", country: "EUA", name: "Petersen Automotive Museum", address: "Wilshire Blvd, Los Angeles", hours: "Todos os dias 10:00–18:00", phone: "+1 323 930 2277" },
];

const COLORS: Record<Place["type"], string> = {
  FACTORY: "text-primary border-primary",
  DEALER: "text-foreground border-border",
  MUSEUM: "text-amber-300 border-amber-300/50",
  RENTAL: "text-blue-300 border-blue-300/50",
};

function LocationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative h-[50vh] overflow-hidden">
        <img src={locationsImg} alt="Locais Koenigsegg pelo mundo" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative h-full flex flex-col justify-end px-4 md:px-12 pb-10">
          <div className="text-[10px] tracking-[0.5em] text-primary">PELO MUNDO</div>
          <h1 className="font-display text-4xl md:text-7xl font-black tracking-widest text-glow-red mt-2">LOCAIS</h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mt-3">
            Onde encontrar, dirigir, alugar ou contemplar um Koenigsegg.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-6 text-[10px] tracking-[0.3em]">
          <span className="px-3 py-1 border border-primary text-primary">FÁBRICA</span>
          <span className="px-3 py-1 border border-border">REVENDEDOR</span>
          <span className="px-3 py-1 border border-blue-300/50 text-blue-300">ALUGUEL</span>
          <span className="px-3 py-1 border border-amber-300/50 text-amber-300">MUSEU</span>
        </div>

        <div className="space-y-3">
          {PLACES.map((p, i) => (
            <div key={i} className={`relative border bg-card p-4 md:p-5 hover:border-primary transition group ${COLORS[p.type]}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[10px] tracking-[0.3em]">
                    <span className="opacity-80">{p.type}</span>
                    <span className="opacity-30">·</span>
                    <span className="text-muted-foreground">{p.city.toUpperCase()}, {p.country.toUpperCase()}</span>
                  </div>
                  <div className="font-display text-lg md:text-xl tracking-wider mt-1 text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.address}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.name} ${p.address} ${p.city} ${p.country}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir no mapa"
                    title="Abrir no mapa"
                    className="p-1.5 border border-border hover:border-primary hover:text-primary transition"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </a>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        aria-label="Horário e contato"
                        title="Horário e contato"
                        className="p-1.5 border border-border hover:border-primary hover:text-primary transition"
                      >
                        <CalendarClock className="w-3.5 h-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-64 bg-card border-border">
                      <div className="space-y-3 text-xs">
                        <div>
                          <div className="text-[9px] tracking-[0.3em] text-primary mb-1">FUNCIONAMENTO</div>
                          <div className="text-foreground">{p.hours ?? "Sob agendamento"}</div>
                        </div>
                        {p.phone && (
                          <div>
                            <div className="text-[9px] tracking-[0.3em] text-primary mb-1">TELEFONE</div>
                            <a href={`tel:${p.phone.replace(/\s+/g, "")}`} className="text-foreground hover:text-primary transition">{p.phone}</a>
                          </div>
                        )}
                        {p.whatsapp && (
                          <div>
                            <div className="text-[9px] tracking-[0.3em] text-primary mb-1">WHATSAPP</div>
                            <a href={`https://wa.me/${p.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition">{p.whatsapp}</a>
                          </div>
                        )}
                        {!p.phone && !p.whatsapp && (
                          <div className="text-muted-foreground">Contato não disponível</div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <div className="text-[9px] tracking-[0.3em] opacity-50">/{String(i+1).padStart(2,"0")}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <Link to="/brand" className="border border-border hover:border-primary transition p-5">
            <div className="text-[10px] tracking-[0.4em] text-primary">VOLTAR</div>
            <div className="font-display text-xl mt-2">À HISTÓRIA</div>
          </Link>
          <Link to="/garage" className="border border-border hover:border-primary transition p-5">
            <div className="text-[10px] tracking-[0.4em] text-primary">EXPLORAR</div>
            <div className="font-display text-xl mt-2">OS CARROS ▸</div>
          </Link>
        </div>

        <Link to="/creator" className="mt-4 block border border-border hover:border-primary transition p-5 group relative overflow-hidden">
          <div className="text-[10px] tracking-[0.4em] text-primary">CONHEÇA</div>
          <div className="font-display text-xl mt-2">O CRIADOR ▸</div>
          <div className="text-xs text-muted-foreground mt-1">Christian von Koenigsegg — fundador & CEO</div>
        </Link>
      </section>
    </div>
  );
}

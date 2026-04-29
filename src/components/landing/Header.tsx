import { Link, useNavigate } from "@tanstack/react-router";
import { logout, getUser } from "@/lib/auth";
import { playClick } from "@/lib/engine-sound";

export function Header() {
  const navigate = useNavigate();
  const user = getUser();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
        <Link to="/garage" className="font-display text-sm md:text-base font-black tracking-[0.3em] text-glow-red">
          KOENIGSEGG
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.3em] text-muted-foreground">
          <Link to="/garage" className="hover:text-primary transition" activeProps={{ className: "text-primary" }}>GARAGEM</Link>
          <Link to="/brand" className="hover:text-primary transition" activeProps={{ className: "text-primary" }}>HISTÓRIA</Link>
          <Link to="/factory" className="hover:text-primary transition" activeProps={{ className: "text-primary" }}>FÁBRICA</Link>
          <Link to="/locations" className="hover:text-primary transition" activeProps={{ className: "text-primary" }}>LOCAIS</Link>
          <Link to="/creator" className="hover:text-primary transition" activeProps={{ className: "text-primary" }}>CRIADOR</Link>
        </nav>
        <div className="flex items-center gap-3 text-[10px] tracking-[0.2em]">
          <span className="hidden sm:inline text-muted-foreground">{user?.name?.toUpperCase()}</span>
          <button onClick={() => { playClick(); logout(); navigate({ to: "/login" }); }} className="text-primary hover:underline">SAIR</button>
        </div>
      </div>
    </header>
  );
}

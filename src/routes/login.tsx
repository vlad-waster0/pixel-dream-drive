import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { login, signup, randomCreds } from "@/lib/auth";
import { playClick, playRev } from "@/lib/engine-sound";
import heroJesko from "@/assets/hero-jesko.jpg";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    playRev(1.2);
    setTimeout(() => {
      if (mode === "signup") signup(email || randomCreds().email, password || "x", name);
      else login(email || randomCreds().email, password || "x");
      navigate({ to: "/garage" });
    }, 900);
  };

  const handleRandom = () => {
    playClick();
    const c = randomCreds();
    setEmail(c.email); setPassword(c.password); setName("Driver " + Math.floor(Math.random()*100));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center px-4 py-10">
      {/* Background imagery */}
      <div className="absolute inset-0">
        <img src={heroJesko} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />

      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines pointer-events-none" />

      <div className="relative w-full max-w-md animate-glitch-in">
        <div className="text-center mb-8">
          <Link to="/" className="text-[10px] tracking-[0.5em] text-muted-foreground hover:text-primary">← KOENIGSEGG</Link>
          <h1 className="font-display text-3xl md:text-4xl font-black tracking-widest text-glow-red mt-3">
            {mode === "login" ? "ACESSO" : "REGISTRO"}
          </h1>
          <div className="mt-2 text-xs tracking-[0.3em] text-muted-foreground">
            {mode === "login" ? "ENTRE NA GARAGEM" : "CRIE SUA CONTA"}
          </div>
        </div>

        <div className="relative border border-border bg-card/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
          <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-primary" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary" />

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <Field label="NOME" value={name} onChange={setName} placeholder="Seu nome" />
            )}
            <Field label="E-MAIL" value={email} onChange={setEmail} placeholder="qualquer@email.com" type="email" />
            <Field label="SENHA" value={password} onChange={setPassword} placeholder="qualquer senha" type="password" />

            <button type="button" onClick={handleRandom} className="w-full text-[10px] tracking-[0.3em] text-muted-foreground hover:text-primary py-2 border border-dashed border-border hover:border-primary transition">
              ⚡ GERAR ALEATÓRIO
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="relative w-full py-4 bg-primary text-primary-foreground font-display tracking-[0.3em] text-sm overflow-hidden group disabled:opacity-70"
              style={{ boxShadow: "var(--shadow-blood)" }}
            >
              <span className="relative z-10">{submitting ? "ACELERANDO..." : (mode === "login" ? "ENTRAR ▸" : "CRIAR ▸")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <div className="text-center text-[11px] tracking-widest text-muted-foreground">
              {mode === "login" ? "SEM CONTA?" : "JÁ TEM CONTA?"}{" "}
              <button type="button" onClick={() => { playClick(); setMode(mode === "login" ? "signup" : "login"); }} className="text-primary hover:underline">
                {mode === "login" ? "CRIAR" : "ENTRAR"}
              </button>
            </div>
          </form>
        </div>

        <div className="text-center text-[9px] tracking-[0.3em] text-muted-foreground mt-6">
          SEM VERIFICAÇÃO · SEM CONFIRMAÇÃO · ACESSO IMEDIATO
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-input/40 border border-border focus:border-primary focus:outline-none px-3 py-3 text-sm font-body transition-colors"
      />
    </div>
  );
}

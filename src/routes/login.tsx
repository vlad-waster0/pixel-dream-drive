import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { login, signup } from "@/lib/auth";
import loginHero from "@/assets/login-hero.jpg";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      if (mode === "signup") signup(email || `driver${Date.now()}@ks.dev`, password || "x");
      else login(email || `driver${Date.now()}@ks.dev`, password || "x");
      navigate({ to: "/garage" });
    }, 500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex flex-col">
      {/* Hero image — top half */}
      <div className="relative w-full h-[42vh] md:h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0a1a3a] via-[#0a0a1a] to-black"
        />
        <img
          src={loginHero}
          alt=""
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className="no-save pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <div className="text-[10px] tracking-[0.4em] text-white/70">KOENIGSEGG</div>
          <div className="text-[10px] tracking-[0.4em] text-white/50">SVERIGE · 1994</div>
        </div>
      </div>

      {/* Form section */}
      <div className="relative flex-1 px-6 pt-8 pb-10 max-w-md mx-auto w-full">
        <h1 className="font-display text-3xl md:text-4xl font-black tracking-[0.15em] text-white">
          {mode === "login" ? "BEM-VINDO" : "CRIAR CONTA"}
        </h1>
        <div className="text-sm text-white/60 mt-2 tracking-wide">
          {mode === "login" ? "Entre na sua garagem privada." : "Inicie sua coleção."}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[11px] tracking-[0.25em] text-white/80 font-bold mb-2">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-white/[0.04] border border-white/15 focus:border-primary focus:outline-none px-4 py-3 text-sm text-white placeholder:text-white/30 rounded-sm transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] tracking-[0.25em] text-white/80 font-bold mb-2">SENHA</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/[0.04] border border-white/15 focus:border-primary focus:outline-none px-4 py-3 text-sm text-white placeholder:text-white/40 rounded-sm transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full relative px-7 py-3.5 mt-2 font-display tracking-[0.25em] text-sm text-white overflow-hidden group rounded-sm disabled:opacity-70 bg-primary hover:bg-primary/90 transition-colors"
          >
            <span className="relative z-10">{submitting ? "..." : (mode === "login" ? "ENTRAR" : "CRIAR")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <div className="text-center text-[11px] tracking-[0.2em] text-white/50 pt-2">
            {mode === "login" ? "AINDA NÃO TEM CONTA?" : "JÁ TEM CONTA?"}{" "}
            <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary hover:underline ml-1">
              {mode === "login" ? "CRIAR" : "ENTRAR"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

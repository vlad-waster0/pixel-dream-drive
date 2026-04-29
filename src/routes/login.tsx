import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { login, signup, randomCreds } from "@/lib/auth";
import { playClick, playRev } from "@/lib/engine-sound";
import loginHero from "@/assets/login-hero.jpg";

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
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-4 py-10">
      {/* Dark garage background with overhead lights */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-white/40 blur-md" />
        <div className="absolute top-8 left-[18%] right-[18%] h-2 bg-white/15 blur-2xl" />
        <div className="absolute top-24 left-1/3 right-1/3 h-1 bg-white/30 blur-md" />
        <div className="absolute top-32 left-[28%] right-[28%] h-2 bg-white/10 blur-2xl" />
      </div>

      <div className="relative w-full max-w-2xl animate-glitch-in">
        {/* Card */}
        <div className="relative bg-black/70 backdrop-blur-xl border border-white/10 rounded-md p-6 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          <div className="mb-1">
            <Link to="/" className="text-[10px] tracking-[0.5em] text-white/40 hover:text-white">← KOENIGSEGG</Link>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-black tracking-widest text-white mt-3">
            CAR RENTALS
          </h1>
          <div className="text-xs md:text-sm tracking-wide text-white/60 mt-1">Start your engine</div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-8 max-w-md">
            {mode === "signup" && (
              <Field label="NAME" value={name} onChange={setName} placeholder="Your name" />
            )}
            <Field label="EMAIL" value={email} onChange={setEmail} placeholder="name@example.com" type="email" />
            <Field label="PASSWORD" value={password} onChange={setPassword} placeholder="••••••••" type="password" />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="relative px-8 py-3 font-display tracking-[0.3em] text-sm text-white overflow-hidden group disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, #7a1530, #c41e3a)", boxShadow: "0 10px 30px -10px rgba(196,30,58,0.6)" }}
              >
                <span className="relative z-10">{submitting ? "..." : (mode === "login" ? "LOGIN" : "CREATE")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              <button type="button" onClick={handleRandom} className="text-[10px] tracking-[0.3em] text-white/50 hover:text-white">
                ⚡ RANDOM
              </button>
            </div>

            <div className="text-[11px] tracking-widest text-white/50">
              {mode === "login" ? "NO ACCOUNT?" : "HAVE ACCOUNT?"}{" "}
              <button type="button" onClick={() => { playClick(); setMode(mode === "login" ? "signup" : "login"); }} className="text-red-300 hover:underline">
                {mode === "login" ? "CREATE" : "LOGIN"}
              </button>
            </div>
          </form>

          {/* Car overlay — bottom-right, breaks out of card */}
          <img
            src={loginHero}
            alt=""
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="no-save pointer-events-none absolute -right-8 md:-right-16 -bottom-10 md:-bottom-16 w-[70%] md:w-[65%] max-w-[600px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.8)] select-none"
          />
        </div>

        <div className="text-center text-[9px] tracking-[0.3em] text-white/40 mt-6">
          SEM VERIFICAÇÃO · SEM CONFIRMAÇÃO · ACESSO IMEDIATO
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.3em] text-white/60 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/20 focus:border-blue-300 focus:outline-none px-3 py-3 text-sm font-body text-white placeholder:text-white/30 transition-colors"
      />
    </div>
  );
}

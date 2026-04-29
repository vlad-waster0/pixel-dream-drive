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
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-4 py-10">
      {/* Garage backdrop with overhead light strips (like the reference) */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-[8%] left-[15%] right-[15%] h-3 rounded-full bg-white/30 blur-[2px]" />
        <div className="absolute top-[8%] left-[15%] right-[15%] h-12 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute top-[26%] left-[25%] right-[25%] h-2 rounded-full bg-white/25 blur-[2px]" />
        <div className="absolute top-[26%] left-[25%] right-[25%] h-10 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_black_85%)]" />
      </div>

      <div className="relative w-full max-w-[760px] animate-glitch-in">
        {/* Glassmorphism card */}
        <div className="relative bg-black/55 backdrop-blur-md border border-white/10 rounded-md px-7 py-9 md:px-10 md:py-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] overflow-visible">
          {/* Title */}
          <h1 className="font-display text-2xl md:text-3xl font-black tracking-[0.18em] text-white">
            CAR RENTALS
          </h1>
          <div className="text-[13px] md:text-sm text-white/70 mt-1 tracking-wide">Start your engine</div>

          {/* Form — left column only, leaves room for the car on the right */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-5 max-w-[320px] md:max-w-[340px]">
            <div>
              <label className="block text-[12px] tracking-[0.18em] text-white font-bold mb-2">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-transparent border border-white/15 focus:border-[#c41e3a] focus:outline-none px-3 py-2.5 text-sm text-white placeholder:text-white/30 rounded-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-[12px] tracking-[0.18em] text-white font-bold mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.04] border border-white/15 focus:border-[#c41e3a] focus:outline-none px-3 py-2.5 text-sm text-white placeholder:text-white/40 rounded-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="relative px-7 py-2.5 font-display tracking-[0.18em] text-sm text-white overflow-hidden group rounded-sm disabled:opacity-70"
              style={{ background: "#7a1530" }}
            >
              <span className="relative z-10">{submitting ? "..." : (mode === "login" ? "LOGIN" : "CREATE")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <div className="text-[11px] tracking-[0.15em] text-white/50 pt-1">
              {mode === "login" ? "NO ACCOUNT?" : "HAVE ACCOUNT?"}{" "}
              <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-red-300 hover:underline">
                {mode === "login" ? "CREATE" : "LOGIN"}
              </button>
            </div>
          </form>

          {/* Car — overlaps card from bottom-right, breaks out */}
          <img
            src={loginHero}
            alt=""
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="no-save pointer-events-none select-none absolute right-[-10%] bottom-[-14%] md:right-[-8%] md:bottom-[-18%] w-[78%] md:w-[62%] max-w-[560px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.85)]"
          />
        </div>
      </div>
    </div>
  );
}

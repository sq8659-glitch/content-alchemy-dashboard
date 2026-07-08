"use client"

import { useState } from "react"
import { Sparkles, Mail, Lock, User, Loader2, ArrowRight, ShieldCheck } from "lucide-react"

type Mode = "signin" | "signup"

export function AuthScreen({ onAuthenticated }: { onAuthenticated: (name: string) => void }) {
  const [mode, setMode] = useState<Mode>("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    if (!email.trim() || !password.trim() || (mode === "signup" && !name.trim())) {
      setError("Please fill in all fields to continue.")
      return
    }
    setError("")
    setLoading(true)
    setTimeout(() => {
      const derived = mode === "signup" ? name.trim() : email.split("@")[0]
      onAuthenticated(derived || "there")
    }, 1500)
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-[#F8F9FA] py-3 pl-11 pr-3 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition focus:border-[#00A86B] focus:bg-white focus:ring-2 focus:ring-[#00A86B]/20"

  return (
    <main className="min-h-screen h-auto overflow-y-auto bg-white text-[#0F172A]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00A86B] text-white">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-[#0F172A]">Content Alchemy</span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-[#0F172A]">
              {mode === "signin" ? "Secure Sign In" : "Create your account"}
            </h1>
            <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-500">
              {mode === "signin"
                ? "Sign in to access your metrics workspace and asset engine."
                : "Start turning one idea into every channel in seconds."}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-[#F8F9FA] p-1">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m)
                  setError("")
                }}
                className={
                  "rounded-lg py-2 text-sm font-medium transition " +
                  (mode === m ? "bg-white text-[#0F172A] shadow-sm" : "text-slate-500 hover:text-[#0F172A]")
                }
              >
                {m === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className={inputClass}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={inputClass}
              />
            </div>

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00A86B] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#009961] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  {mode === "signin" ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {mode === "signin" ? "Sign In" : "Create Account"}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-[#00A86B]" aria-hidden="true" />
            Protected by enterprise-grade encryption
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Content Alchemy — One idea in. Every channel out.
        </p>
      </div>
    </main>
  )
}

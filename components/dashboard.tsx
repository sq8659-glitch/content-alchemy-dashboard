"use client"

import { useState } from "react"
import {
  Search,
  Sparkles,
  Coins,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart2,
  CheckCircle2,
  Loader2,
  Clock3,
  Briefcase,
  AtSign,
  Mail,
  Camera,
  Music2,
  Copy,
  Check,
  FileText,
  CreditCard,
  LogOut,
  Gift,
} from "lucide-react"

const PLANS = [
  {
    name: "Starter Plan",
    price: "$19",
    popular: false,
    cta: "Start 7-Day Free Trial",
    features: ["20 Generations / mo", "Basic Text Hub", "LinkedIn & Twitter outputs", "Email support"],
  },
  {
    name: "Pro Grower",
    price: "$49",
    popular: true,
    cta: "Start Free Trial",
    features: [
      "100 Generations / mo",
      "Full Video Hooks & Scripts",
      "Multi-platform text engines",
      "Standard API scheduling",
    ],
  },
  {
    name: "Agency Automated",
    price: "$99",
    popular: false,
    cta: "Upgrade Now",
    features: [
      "Unlimited Generations",
      "Auto-Publish automation queues",
      "Multi-User Seats",
      "Priority tokens & analytics exports",
    ],
  },
]

const METRICS = [
  { label: "ASSETS GENERATED", value: "1,284", delta: "+18.2%", tone: "green" as const, icon: Sparkles },
  { label: "AVG. ENGAGEMENT LIFT", value: "3.4x", delta: "+0.6x", tone: "green" as const, icon: TrendingUp },
  { label: "HOURS SAVED", value: "142h", delta: "+22h", tone: "green" as const, icon: Clock },
  { label: "COST PER LEAD", value: "$14.20", delta: "-62%", tone: "gray" as const, icon: DollarSign },
]

const CHANNELS = ["LinkedIn Post", "Twitter Thread", "Instagram Reel", "TikTok Script"]

const OUTPUTS: Record<string, string> = {
  "LinkedIn Post":
    "We saved 142 hours last quarter without hiring a single new person.\n\nThe secret wasn't working harder — it was repurposing smarter.\n\nOne idea now becomes 5 platform-perfect assets automatically:\n→ 3.4x more engagement\n→ 62% lower cost per lead\n→ Zero extra headcount\n\nStop creating content from scratch. Start compounding what already works.\n\nWhat's the one piece of content you'd clone across every channel? 👇\n\n#ContentStrategy #MarketingOps #AI",
  "Twitter Thread":
    "1/ We turned 1 idea into 1,284 assets last month.\n\nHere's the exact repurposing system 🧵\n\n2/ Most teams create content linearly: 1 post = 1 output.\n\nThat's leaving 90% of the value on the table.\n\n3/ Instead, treat every idea as a source file. Split it into hooks, captions, b-roll prompts, and scripts.\n\n4/ Result: 3.4x engagement lift, 142 hours saved, and a 62% drop in cost per lead.\n\n5/ The idea doesn't change. The distribution does. Repurpose everything.",
  "Instagram Reel":
    "HOOK (0-3s): \"You're posting content wrong.\"\n\nSCENE 1: Cluttered desk, overwhelmed creator.\nCAPTION: \"1 idea = 1 post? That's the mistake.\"\n\nSCENE 2: Clean dashboard reveal, content splitting into channels.\nCAPTION: \"1 idea = 5 assets. Automatically.\"\n\nCTA (last 3s): \"Save this for your next content batch.\"\n\nAudio: Trending upbeat lo-fi, 120 BPM.",
  "TikTok Script":
    "[Talking head, fast cuts]\n\n\"I stopped making new content 3 months ago… and my engagement went UP 3.4x.\"\n\n[Cut to screen recording]\n\n\"Here's what I do instead — I take ONE idea and repurpose it into a LinkedIn post, a Twitter thread, a Reel, and this exact TikTok.\"\n\n[Point to camera]\n\n\"142 hours saved. Same brain. Follow for the full workflow.\"",
}

const QUEUE = [
  { name: "LinkedIn", icon: Briefcase, status: "Published", state: "done" as const },
  { name: "Twitter / X", icon: AtSign, status: "Scheduled 2:30 PM", state: "pending" as const },
  { name: "Newsletter", icon: Mail, status: "Rendering", state: "loading" as const },
  { name: "Instagram", icon: Camera, status: "Scheduled 6:00 PM", state: "pending" as const },
  { name: "TikTok", icon: Music2, status: "Draft ready", state: "pending" as const },
]

type GeneratedAsset = { channel: string; text: string }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label="Copy to clipboard"
      className={
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition " +
        (copied
          ? "border-[#00A86B] bg-[#00A86B]/10 text-[#00A86B]"
          : "border-slate-200 bg-white text-slate-400 hover:border-[#00A86B]/40 hover:text-[#00A86B]")
      }
    >
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
    </button>
  )
}

export function Dashboard({
  userName,
  onViewPlans,
  onSignOut,
}: {
  userName: string
  onViewPlans: () => void
  onSignOut: () => void
}) {
  const [selected, setSelected] = useState<string[]>(["LinkedIn Post", "Twitter Thread", "Instagram Reel"])
  const [isGenerating, setIsGenerating] = useState(false)
  const [assets, setAssets] = useState<GeneratedAsset[]>([])

  const initials =
    userName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "CA"

  const toggle = (c: string) =>
    setSelected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  const generate = () => {
    if (selected.length === 0 || isGenerating) return
    setIsGenerating(true)
    setAssets([])
    setTimeout(() => {
      const next = CHANNELS.filter((c) => selected.includes(c)).map((c) => ({
        channel: c,
        text: OUTPUTS[c],
      }))
      setAssets(next)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <main className="min-h-screen h-auto overflow-y-auto bg-white text-[#0F172A]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* 1. Header Navigation */}
        <header className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A86B] text-white">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-[#0F172A]">Content Alchemy</span>
          </div>

          <div className="relative flex-1 sm:mx-6 sm:max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search assets, campaigns, channels..."
              aria-label="Search"
              className="w-full rounded-xl border border-slate-200 bg-[#F8F9FA] py-2.5 pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition focus:border-[#00A86B] focus:ring-2 focus:ring-[#00A86B]/20"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onViewPlans}
              className="flex items-center gap-1.5 rounded-full border border-[#00A86B] bg-white px-3 py-1.5 text-sm font-medium text-[#00A86B] transition hover:bg-[#00A86B]/5"
            >
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">View Plans &amp; Billing</span>
              <span className="sm:hidden">Plans</span>
            </button>
            <div className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-[#F8F9FA] px-3 py-1.5 sm:flex">
              <Coins className="h-4 w-4 text-[#00A86B]" aria-hidden="true" />
              <span className="text-sm font-semibold text-[#0F172A]">8,450</span>
              <span className="text-xs text-slate-400">tokens</span>
            </div>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F172A] text-sm font-semibold text-white"
              aria-label={`Signed in as ${userName}`}
              title={userName}
            >
              {initials}
            </div>
            <button
              type="button"
              onClick={onSignOut}
              aria-label="Sign out"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-[#0F172A]"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Trial banner */}
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[#00A86B]/20 bg-[#00A86B]/5 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00A86B] text-white">
              <Gift className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm text-[#0F172A]">
              <span className="font-semibold">Your 7-Day Free Trial is Active.</span>{" "}
              <span className="text-slate-500">5 Free Credits Remaining.</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onViewPlans}
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#00A86B] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#009961] active:scale-[0.99]"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Upgrade to Pro
          </button>
        </div>

        {/* 2. Horizontal Metrics Grid */}
        <section aria-label="Key metrics" className="mb-2 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {METRICS.map((m) => {
            const Icon = m.icon
            return (
              <button
                key={m.label}
                type="button"
                className="group rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-[#00A86B]/40 hover:shadow-md sm:p-6"
              >
                <div className="mb-3 flex items-center justify-between sm:mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8F9FA] text-[#0F172A] transition group-hover:bg-[#00A86B]/10 group-hover:text-[#00A86B] sm:h-9 sm:w-9">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                  <span
                    className={
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold sm:px-2.5 sm:py-1 sm:text-xs " +
                      (m.tone === "green" ? "bg-[#00A86B]/10 text-[#00A86B]" : "bg-slate-100 text-slate-500")
                    }
                  >
                    {m.delta}
                  </span>
                </div>
                <p className="text-[11px] font-medium tracking-wide text-slate-400 sm:text-xs">{m.label}</p>
                <p className="mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">{m.value}</p>
              </button>
            )
          })}
        </section>

        {/* 3. Main Content Hub */}
        <section className="mt-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            One idea in. Every channel out.
          </h1>
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-slate-500">
            Welcome back, {userName.split(" ")[0]}. Drop in a single piece of content and let Content Alchemy transform
            it into platform-perfect assets for every channel you publish to.
          </p>

          <div className="mt-5">
            <label htmlFor="content-input" className="sr-only">
              Content input
            </label>
            <textarea
              id="content-input"
              rows={4}
              placeholder="Paste your blog link, article text, or video transcript here..."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-[#F8F9FA] p-4 text-sm leading-relaxed text-[#0F172A] placeholder:text-slate-400 outline-none transition focus:border-[#00A86B] focus:bg-white focus:ring-2 focus:ring-[#00A86B]/20"
            />
          </div>

          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Target Channels</p>
            <div className="flex flex-wrap gap-2">
              {CHANNELS.map((c) => {
                const active = selected.includes(c)
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggle(c)}
                    className={
                      "rounded-full border px-4 py-2 text-sm font-medium transition " +
                      (active
                        ? "border-[#00A86B] bg-[#00A86B] text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-[#0F172A]")
                    }
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={generate}
            disabled={isGenerating || selected.length === 0}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00A86B] px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#009961] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Generating Assets...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                Generate Assets
              </>
            )}
          </button>
        </section>

        {/* 4. Output Preview */}
        <section aria-label="Generated output" className="mt-4">
          {isGenerating ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {Array.from({ length: Math.max(selected.length, 2) }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-5 w-24 animate-pulse rounded bg-slate-100" />
                  </div>
                  <div className="space-y-2">
                    <span className="block h-3 w-full animate-pulse rounded bg-slate-100" />
                    <span className="block h-3 w-11/12 animate-pulse rounded bg-slate-100" />
                    <span className="block h-3 w-4/5 animate-pulse rounded bg-slate-100" />
                    <span className="block h-3 w-3/4 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : assets.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {assets.map((a) => (
                <div key={a.channel} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00A86B]/10 text-[#00A86B]">
                        <FileText className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <h2 className="text-sm font-semibold text-[#0F172A]">{a.channel}</h2>
                    </div>
                    <CopyButton text={a.text} />
                  </div>
                  <div className="flex-1 rounded-xl border border-slate-100 bg-[#F8F9FA] p-4">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-[#F8F9FA] p-12 text-center">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#00A86B] shadow-sm">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-base font-semibold text-[#0F172A]">Your generated assets will appear here</h2>
              <p className="mt-1 max-w-sm text-pretty text-sm leading-relaxed text-slate-500">
                Select your target channels above, then hit{" "}
                <span className="font-medium text-[#00A86B]">Generate Assets</span> to spin up platform-perfect copy.
              </p>
            </div>
          )}
        </section>

        {/* 5. Bottom Systems Status Footer */}
        <section aria-label="System status" className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Video Performance Predictor */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00A86B]/10 text-[#00A86B]">
                <BarChart2 className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold text-[#0F172A]">Video Performance Predictor</h2>
            </div>

            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">Retention Score</span>
                  <span className="font-semibold text-[#0F172A]">88%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#00A86B]" style={{ width: "88%" }} />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">Viral Hook Index</span>
                  <span className="font-semibold text-[#0F172A]">Top 5%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#00A86B]" style={{ width: "95%" }} />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">Watch-Through Rate</span>
                  <span className="font-semibold text-[#0F172A]">74%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[#00A86B]" style={{ width: "74%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Auto-Publish Queue Status */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00A86B]/10 text-[#00A86B]">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="text-sm font-semibold text-[#0F172A]">Auto-Publish Queue Status</h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {QUEUE.map((q) => {
                const Icon = q.icon
                return (
                  <div
                    key={q.name}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-[#F8F9FA] p-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#0F172A] shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#0F172A]">{q.name}</p>
                      <p className="flex items-center gap-1 text-xs text-slate-400">
                        {q.state === "done" && <CheckCircle2 className="h-3 w-3 text-[#00A86B]" aria-hidden="true" />}
                        {q.state === "loading" && (
                          <Loader2 className="h-3 w-3 animate-spin text-slate-400" aria-hidden="true" />
                        )}
                        {q.state === "pending" && <Clock3 className="h-3 w-3 text-slate-400" aria-hidden="true" />}
                        <span className="truncate">{q.status}</span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 6. Subscription Packages */}
        <section aria-label="Subscription plans" className="mt-8">
          <div className="mb-6 text-center">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-[#0F172A]">
              Choose the plan that scales with you
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-pretty text-sm leading-relaxed text-slate-500">
              Start free, upgrade any time. Every plan includes the full Content Alchemy engine.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={
                  "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md " +
                  (plan.popular ? "border-[#00A86B] shadow-md md:-translate-y-2" : "border-slate-100")
                }
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00A86B] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Most Popular
                  </span>
                )}
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-[#0F172A]">{plan.price}</span>
                  <span className="text-sm text-slate-400">/mo</span>
                </div>

                <ul className="mt-5 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00A86B]" aria-hidden="true" />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onViewPlans}
                  className={
                    "mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold transition active:scale-[0.99] " +
                    (plan.popular
                      ? "bg-[#00A86B] text-white shadow-sm hover:bg-[#009961]"
                      : "border border-slate-200 bg-white text-[#0F172A] hover:border-[#00A86B] hover:text-[#00A86B]")
                  }
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-400">
          Content Alchemy — One idea in. Every channel out.
        </footer>
      </div>
    </main>
  )
}

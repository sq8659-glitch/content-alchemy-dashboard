"use client"

import { useState } from "react"
import { X, Check, Loader2, Lock, CreditCard, CheckCircle2, Sparkles } from "lucide-react"

type Plan = {
  name: string
  price: string
  tagline: string
  features: string[]
  popular?: boolean
}

const PLANS: Plan[] = [
  {
    name: "STARTER PLAN",
    price: "19",
    tagline: "For solo creators finding their rhythm.",
    features: ["20 AI Generations / mo", "Basic LinkedIn & Twitter outputs", "Standard content templates", "Email support"],
  },
  {
    name: "PRO GROWER",
    price: "49",
    tagline: "For teams scaling across every channel.",
    popular: true,
    features: [
      "Unlimited multi-platform text engines",
      "10 Video Automation briefs",
      "Standard API scheduling",
      "Priority email support",
    ],
  },
  {
    name: "AGENCY AUTOMATION",
    price: "99",
    tagline: "For agencies running full automation.",
    features: [
      "Full Auto-Publish automation queues",
      "Custom AI Voice hooks",
      "Priority token allocation",
      "Deep analytics exports",
    ],
  },
]

type CheckoutState = "idle" | "processing" | "success"

export function PricingModal({ onClose }: { onClose: () => void }) {
  const [activePlan, setActivePlan] = useState<Plan | null>(null)
  const [checkout, setCheckout] = useState<CheckoutState>("idle")

  const startCheckout = (plan: Plan) => {
    setActivePlan(plan)
    setCheckout("processing")
    setTimeout(() => setCheckout("success"), 2400)
  }

  const closeCheckout = () => {
    setCheckout("idle")
    setActivePlan(null)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0F172A]/60 backdrop-blur-sm">
      <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-5xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                Plans &amp; Billing
              </h2>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-500">
                Scale your content engine. Upgrade or downgrade anytime.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close plans"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-[#0F172A]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={
                  "relative flex flex-col rounded-2xl border p-6 shadow-sm transition hover:shadow-md " +
                  (plan.popular ? "border-[#00A86B] bg-white ring-1 ring-[#00A86B]/30" : "border-slate-100 bg-white")
                }
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#00A86B] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    POPULAR
                  </span>
                )}

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{plan.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-bold tracking-tight text-[#0F172A]">${plan.price}</span>
                  <span className="mb-1 text-sm text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-500">{plan.tagline}</p>

                <ul className="mt-5 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00A86B]/10 text-[#00A86B]">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => startCheckout(plan)}
                  className={
                    "mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold transition active:scale-[0.99] " +
                    (plan.popular
                      ? "bg-[#00A86B] text-white shadow-sm hover:bg-[#009961]"
                      : "border border-[#00A86B] bg-white text-[#00A86B] hover:bg-[#00A86B]/5")
                  }
                >
                  Upgrade Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stripe-style checkout sheet */}
      {activePlan && checkout !== "idle" && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#0F172A]/50 p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-md rounded-t-2xl border border-slate-100 bg-white p-6 shadow-sm sm:rounded-2xl sm:p-8">
            {checkout === "processing" ? (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00A86B]/10 text-[#00A86B]">
                  <Loader2 className="h-7 w-7 animate-spin" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-[#0F172A]">Securing your checkout…</h3>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-500">
                  Connecting to Stripe to process your{" "}
                  <span className="font-medium text-[#0F172A]">{activePlan.name}</span> subscription.
                </p>

                <div className="mt-6 w-full rounded-xl border border-slate-100 bg-[#F8F9FA] p-4 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Plan</span>
                    <span className="font-medium text-[#0F172A]">{activePlan.name}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Total due today</span>
                    <span className="font-semibold text-[#0F172A]">${activePlan.price}.00</span>
                  </div>
                </div>

                <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  Payments secured &amp; encrypted by Stripe
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00A86B]/10 text-[#00A86B]">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-[#0F172A]">You&apos;re all set!</h3>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-500">
                  Your <span className="font-medium text-[#0F172A]">{activePlan.name}</span> subscription is active.
                  A receipt has been sent to your inbox.
                </p>
                <button
                  type="button"
                  onClick={closeCheckout}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#00A86B] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#009961] active:scale-[0.99]"
                >
                  <CreditCard className="h-4 w-4" aria-hidden="true" />
                  Back to Plans
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

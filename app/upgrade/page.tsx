"use client"

import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Crown, Star, Zap } from "lucide-react"

type Plan = {
  name: string
  price: string
  subtext: string
  features: string[]
  badge?: string
  highlighted?: boolean
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-black/35 px-7 py-7 shadow-xl backdrop-blur-xl",
        plan.highlighted
          ? "border-[#ffcc33] shadow-[#ffcc33]/10"
          : "border-white/10"
      )}
    >
      {plan.badge ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ffcc33] px-4 py-1 text-xs font-semibold text-black">
            <Crown className="h-3.5 w-3.5" />
            <span>{plan.badge}</span>
          </div>
        </div>
      ) : null}

      <div className="text-center">
        <div className="text-base font-semibold text-white">{plan.name}</div>
        <div className="mt-2 text-2xl font-extrabold tracking-tight text-[#ffcc33]">
          {plan.price}
        </div>
        <div className="mt-2 text-sm text-white/60">{plan.subtext}</div>
      </div>

      <div className="mt-6 space-y-2 text-sm text-white/80">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <Star className="h-4 w-4 text-[#ffcc33]" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          asChild
          className="h-10 w-full rounded-xl bg-[#8a6f1b] px-6 font-semibold text-black hover:bg-[#9a7a22]"
        >
          <Link href="/auth/login?returnUrl=/upgrade">Sign in to subscribe</Link>
        </Button>
      </div>
    </div>
  )
}

function TopUpCard({ plan }: { plan: Plan }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 px-7 py-7 shadow-xl backdrop-blur-xl">
      <div className="text-center">
        <div className="text-base font-semibold text-white">{plan.name}</div>
        <div className="mt-2 text-2xl font-extrabold tracking-tight text-[#ffcc33]">
          {plan.price}
        </div>
        <div className="mt-2 text-sm text-white/60">{plan.subtext}</div>
      </div>

      <div className="mt-6 space-y-2 text-sm text-white/80">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <Zap className="h-4 w-4 text-[#ffcc33]" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button
          asChild
          className="h-10 w-full rounded-xl bg-white/15 px-6 font-semibold text-white/70 hover:bg-white/20"
        >
          <Link href="/auth/login?returnUrl=/upgrade">Sign in to purchase</Link>
        </Button>
      </div>
    </div>
  )
}

export default function UpgradePage() {
  const { user } = useAuth()

  const subscriptionPlans: Plan[] = [
    {
      name: "Starter",
      price: "€19.90/mo",
      subtext: "60 credits/month",
      features: [
        "6 AI video generations per month",
        "60 AI image generations per month",
        "30 dress changes per month",
      ],
    },
    {
      name: "Pro",
      price: "€39.90/mo",
      subtext: "180 credits/month",
      badge: "Most Popular",
      highlighted: true,
      features: [
        "18 AI video generations per month",
        "180 AI image generations per month",
        "90 dress changes per month",
      ],
    },
    {
      name: "Business",
      price: "€79.90/mo",
      subtext: "420 credits/month",
      features: [
        "42 AI video generations per month",
        "420 AI image generations per month",
        "210 dress changes per month",
      ],
    },
  ]

  const topUps: Plan[] = [
    {
      name: "Starter Pack",
      price: "€44.90",
      subtext: "100 credits",
      features: [
        "One-time purchase",
        "10 AI video generations",
        "100 AI image generations",
        "50 dress changes",
      ],
    },
    {
      name: "Value Pack",
      price: "€64.90",
      subtext: "200 credits",
      features: [
        "One-time purchase",
        "20 AI video generations",
        "200 AI image generations",
        "100 dress changes",
      ],
    },
    {
      name: "Pro Pack",
      price: "€74.90",
      subtext: "300 credits",
      features: [
        "One-time purchase",
        "30 AI video generations",
        "300 AI image generations",
        "150 dress changes",
      ],
    },
  ]

  return (
    <div className="relative min-h-screen text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute -left-40 -top-40 h-130 w-130 rounded-full bg-[radial-gradient(circle,rgba(255,153,0,0.35)_0%,rgba(255,153,0,0.0)_65%)] blur-3xl" />
        <div className="absolute -bottom-56 -right-35 h-170 w-170 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.30)_0%,rgba(168,85,247,0.0)_62%)] blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/35 to-black/75" />
      </div>

      <main className="mx-auto w-full max-w-7xl px-6 py-6  pb-24">
        <section className="text-center">
          <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
            Subscription Plans
          </h1>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
            Choose a monthly plan that fits your needs
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
            Credit Top-ups
          </h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
            Buy additional credits when you need them
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {topUps.map((plan) => (
            <TopUpCard key={plan.name} plan={plan} />
          ))}
        </section>
      </main>
    </div>
  )
}

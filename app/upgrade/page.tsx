"use client"

import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckoutModal } from "@/components/checkout-modal"
import { GradientBackground } from "@/components/gradient-background"
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

function PlanCard({
  plan,
  user,
  tier,
  isLoading,
  onSubscribe
}: {
  plan: Plan
  user: any
  tier: string
  isLoading: boolean
  onSubscribe: (plan: Plan) => void
}) {
  const isCurrentPlan = user && tier === 'pro' && plan.name === 'Pro'

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
        {!user ? (
          <Button
            asChild
            className="h-10 w-full rounded-xl bg-[#8a6f1b] px-6 font-semibold text-black hover:bg-[#9a7a22]"
          >
            <Link href="/auth/login?returnUrl=/upgrade">Sign in to subscribe</Link>
          </Button>
        ) : isCurrentPlan ? (
          <Button
            disabled
            className="h-10 w-full rounded-xl bg-white/10 px-6 font-semibold text-white/50"
          >
            Current Plan
          </Button>
        ) : (
          <Button
            onClick={() => onSubscribe(plan)}
            disabled={isLoading || plan.name !== 'Pro'}
            className="h-10 w-full rounded-xl bg-[#8a6f1b] px-6 font-semibold text-black hover:bg-[#9a7a22] disabled:opacity-50"
          >
            {plan.name === 'Pro' ? 'Subscribe' : 'Coming Soon'}
          </Button>
        )}
      </div>
    </div>
  )
}

function TopUpCard({ plan, user }: { plan: Plan; user: any }) {
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
        {user ? (
          <Button
            className="h-10 w-full rounded-xl bg-white/15 px-6 font-semibold text-white/70 hover:bg-white/20"
            onClick={() => {
              // TODO: Implement actual purchase logic
              console.log('Purchase:', plan.name)
            }}
          >
            Purchase Now
          </Button>
        ) : (
          <Button
            asChild
            className="h-10 w-full rounded-xl bg-white/15 px-6 font-semibold text-white/70 hover:bg-white/20"
          >
            <Link href="/auth/login?returnUrl=/upgrade">Sign in to purchase</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default function UpgradePage() {
  const { user } = useAuth()
  const { tier, isLoading: subLoading, upgradeToPro } = useSubscription()
  const [checkoutModal, setCheckoutModal] = useState<{ isOpen: boolean; plan: Plan | null }>({
    isOpen: false,
    plan: null,
  })

  const handleSubscribe = (plan: Plan) => {
    setCheckoutModal({ isOpen: true, plan })
  }

  const handleCheckoutSuccess = async () => {
    await upgradeToPro()
  }

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
      <GradientBackground />

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
            <PlanCard
              key={plan.name}
              plan={plan}
              user={user}
              tier={tier}
              isLoading={subLoading}
              onSubscribe={handleSubscribe}
            />
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
            <TopUpCard key={plan.name} plan={plan} user={user} />
          ))}
        </section>
      </main>

      {checkoutModal.plan && (
        <CheckoutModal
          isOpen={checkoutModal.isOpen}
          onClose={() => setCheckoutModal({ isOpen: false, plan: null })}
          onSuccess={handleCheckoutSuccess}
          planName={checkoutModal.plan.name}
          price={checkoutModal.plan.price}
        />
      )}
    </div>
  )
}

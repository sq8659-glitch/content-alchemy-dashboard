"use client"

import { useState } from "react"
import { AuthScreen } from "@/components/auth-screen"
import { Dashboard } from "@/components/dashboard"
import { PricingModal } from "@/components/pricing-modal"

export default function Page() {
  const [userName, setUserName] = useState<string | null>(null)
  const [showPlans, setShowPlans] = useState(false)

  if (!userName) {
    return <AuthScreen onAuthenticated={(name) => setUserName(name)} />
  }

  return (
    <>
      <Dashboard
        userName={userName}
        onViewPlans={() => setShowPlans(true)}
        onSignOut={() => setUserName(null)}
      />
      {showPlans && <PricingModal onClose={() => setShowPlans(false)} />}
    </>
  )
}

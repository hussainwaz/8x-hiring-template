"use client"

import { Button } from "@/components/ui/button"
import { GradientBackground } from "@/components/gradient-background"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CreditCard, LogOut, Trash2, Sparkles, Loader2, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useSubscription } from "@/contexts/subscription-context"
import { toast } from "sonner"

interface ProfileClientProps {
  user: {
    id: string
    email: string
  }
}

export function ProfileClient({ user }: ProfileClientProps) {
  const { isPro, downgradeToFree } = useSubscription()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isDowngrading, setIsDowngrading] = useState(false)
  const [showDowngradeDialog, setShowDowngradeDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    try {
      await fetch("/api/auth/signout", { method: "POST" })
    } catch {
      // Continue with redirect even if request fails
    }

    window.location.href = "/"
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)

    try {
      const response = await fetch("/api/account/delete", {
        method: "POST",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete account")
      }

      setShowDeleteDialog(false)
      window.location.href = "/"
    } catch {
      toast.error("Failed to delete account. Please try again.")
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleDowngrade = async () => {
    setIsDowngrading(true)

    try {
      await downgradeToFree()
      setShowDowngradeDialog(false)
      toast.success("You've been downgraded to the Free plan.")
    } catch {
      toast.error("Failed to downgrade. Please try again.")
    } finally {
      setIsDowngrading(false)
    }
  }

  return (
    <div className="relative min-h-screen text-white">
      <GradientBackground />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            {/* Profile Avatar */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/50 bg-primary/20">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2 text-[#c6a02c]">Your Profile</h1>
            <p className="text-white/60">{user.email}</p>
          </div>

          {/* Subscription Management */}
          <div className="rounded-2xl border border-white/10 bg-black/35 p-8 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-5 h-5 text-[#ffcc33]" />
              <h2 className="text-2xl font-semibold text-white">Subscription</h2>
            </div>

            {isPro ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <div>
                    <p className="font-medium text-white">Current Plan</p>
                    <p className="text-sm text-white/60 mt-1 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#ffcc33]" />
                      Pro Plan
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/60">Status</p>
                    <p className="text-sm font-medium text-green-400">Active</p>
                  </div>
                </div>

                <AlertDialog open={showDowngradeDialog} onOpenChange={setShowDowngradeDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-white/60 border-white/20 bg-transparent hover:bg-white/5" disabled={isDowngrading}>
                      Downgrade to Free
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Downgrade to Free?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You'll lose access to Pro features immediately. You can upgrade again anytime.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDowngrading}>Keep Pro</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.preventDefault()
                          handleDowngrade()
                        }}
                        disabled={isDowngrading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {isDowngrading ? "Downgrading..." : "Confirm Downgrade"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <div>
                    <p className="font-medium text-white">Current Plan</p>
                    <p className="text-sm text-white/60 mt-1">Free</p>
                  </div>
                  <Link href="/upgrade">
                    <Button className="bg-primary hover:bg-primary/90 text-white">Upgrade to Pro</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="rounded-2xl border border-white/10 bg-black/35 p-8 shadow-xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-6 text-white">Account Actions</h2>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-white border-white/20 bg-transparent hover:bg-white/5"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 mr-3" />
                )}
                {isLoggingOut ? "Signing out..." : "Sign Out"}
              </Button>

              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-400 border-white/20 hover:text-red-300 hover:bg-red-500/10 bg-transparent"
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Account?</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>This action is permanent and cannot be undone.</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Your profile will be permanently deleted</li>
                          <li>Your subscription data will be removed</li>
                          <li>You won&apos;t be able to recover your account</li>
                        </ul>
                        <p className="font-semibold text-destructive pt-2">
                          This action cannot be undone.
                        </p>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Keep Account</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault()
                        handleDeleteAccount()
                      }}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? "Deleting..." : "Delete Account"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

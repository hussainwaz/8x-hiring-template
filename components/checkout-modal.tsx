"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type CheckoutModalProps = {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => Promise<void>
    planName: string
    price: string
}

export function CheckoutModal({ isOpen, onClose, onSuccess, planName, price }: CheckoutModalProps) {
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null

    const handleCheckout = async () => {
        setIsProcessing(true)
        setError(null)

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1500))

        try {
            await onSuccess()
            setIsSuccess(true)

            // Close modal after showing success
            setTimeout(() => {
                onClose()
                setIsSuccess(false)
                setIsProcessing(false)
            }, 2000)
        } catch (err) {
            console.error("Checkout error:", err)
            setError(err instanceof Error ? err.message : "Failed to process subscription. Please try again.")
            setIsProcessing(false)
        }
    }

    const handleClose = () => {
        if (!isProcessing) {
            setError(null)
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-black/90 p-8 shadow-2xl backdrop-blur-xl">
                {!isSuccess ? (
                    <>
                        <button
                            onClick={handleClose}
                            disabled={isProcessing}
                            className="absolute right-4 top-4 rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-50"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white">Checkout</h2>
                            <p className="mt-2 text-sm text-white/60">Complete your subscription</p>
                        </div>

                        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-white">{planName}</div>
                                    <div className="text-sm text-white/60">Monthly subscription</div>
                                </div>
                                <div className="text-xl font-bold text-[#ffcc33]">{price}</div>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}

                        <div className="mt-6 space-y-3 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#ffcc33]" />
                                <span>Instant activation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#ffcc33]" />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#ffcc33]" />
                                <span>Full access to all features</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <Button
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                className="h-12 w-full rounded-xl bg-[#ffcc33] text-base font-semibold text-black hover:bg-yellow-300 disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    `Subscribe for ${price}/mo`
                                )}
                            </Button>

                            <button
                                onClick={handleClose}
                                disabled={isProcessing}
                                className="w-full rounded-xl py-3 text-sm font-medium text-white/60 hover:text-white disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>

                        <p className="mt-4 text-center text-xs text-white/40">
                            This is a demo checkout. No actual payment will be processed.
                        </p>
                    </>
                ) : (
                    <div className="py-8 text-center">
                        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-500/20">
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-white">Success!</h3>
                        <p className="mt-2 text-sm text-white/60">You're now a Pro member</p>
                    </div>
                )}
            </div>
        </div>
    )
}

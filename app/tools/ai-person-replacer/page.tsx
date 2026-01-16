"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"
import { Upload, Loader2, UserRound, Chrome, Sparkles, ArrowRight, Users } from "lucide-react"

export default function AIPersonReplacerPage() {
    const { user } = useAuth()
    const [sourceImage, setSourceImage] = useState<File | null>(null)
    const [targetImage, setTargetImage] = useState<File | null>(null)
    const [sourcePreview, setSourcePreview] = useState<string | null>(null)
    const [targetPreview, setTargetPreview] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const sourceInputRef = useRef<HTMLInputElement>(null)
    const targetInputRef = useRef<HTMLInputElement>(null)

    const handleSourceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSourceImage(file)
            setSourcePreview(URL.createObjectURL(file))
        }
    }

    const handleTargetSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setTargetImage(file)
            setTargetPreview(URL.createObjectURL(file))
        }
    }

    const handleGenerate = async () => {
        if (!sourceImage || !targetImage) return
        setIsGenerating(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsGenerating(false)
    }

    return (
        <div className="relative min-h-screen text-white">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-black" />
                <div className="absolute -left-40 -top-40 h-130 w-130 rounded-full bg-[radial-gradient(circle,rgba(255,153,0,0.30)_0%,rgba(255,153,0,0.0)_65%)] blur-3xl" />
                <div className="absolute -bottom-56 -right-35 h-170 w-170 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.26)_0%,rgba(168,85,247,0.0)_62%)] blur-3xl" />
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/35 to-black/75" />
            </div>

            <main className="mx-auto w-full max-w-7xl px-6 pb-24">
                {/* Header */}
                <div className="pt-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#c6a02c]">
                        AI Person Replacer
                    </h1>
                    <p className="mt-3 text-sm text-white/65 sm:text-base">
                        Replace a person in your photo with someone else using AI face-swap technology.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    {/* Left Panel - Upload Controls */}
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <Users className="h-6 w-6 text-[#ffcc33]" />
                            <div>
                                <div className="text-lg font-semibold">Upload Photos</div>
                                <p className="mt-1 text-sm text-white/60">
                                    Upload source and target face photos
                                </p>
                            </div>
                        </div>

                        {/* Two Image Uploads */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {/* Source Image */}
                            <div>
                                <div className="mb-2 text-sm font-semibold text-white/70">Source Face</div>
                                <input
                                    ref={sourceInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleSourceSelect}
                                />
                                <button
                                    type="button"
                                    onClick={() => sourceInputRef.current?.click()}
                                    className="w-full overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10"
                                    style={{ aspectRatio: "1/1" }}
                                >
                                    {sourcePreview ? (
                                        <img src={sourcePreview} alt="Source" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
                                            <Upload className="h-8 w-8 text-white/50" />
                                            <div className="text-center text-xs text-white/50">
                                                Face to use
                                            </div>
                                        </div>
                                    )}
                                </button>
                            </div>

                            {/* Target Image */}
                            <div>
                                <div className="mb-2 text-sm font-semibold text-white/70">Target Photo</div>
                                <input
                                    ref={targetInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleTargetSelect}
                                />
                                <button
                                    type="button"
                                    onClick={() => targetInputRef.current?.click()}
                                    className="w-full overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10"
                                    style={{ aspectRatio: "1/1" }}
                                >
                                    {targetPreview ? (
                                        <img src={targetPreview} alt="Target" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
                                            <Upload className="h-8 w-8 text-white/50" />
                                            <div className="text-center text-xs text-white/50">
                                                Photo to modify
                                            </div>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
                            <div className="text-sm font-semibold text-white/70">How it works:</div>
                            <ol className="mt-2 space-y-2 text-sm text-white/60">
                                <li className="flex items-start gap-2">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffcc33]/20 text-xs font-bold text-[#ffcc33]">1</span>
                                    <span>Upload a clear photo of the face you want to use (source)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffcc33]/20 text-xs font-bold text-[#ffcc33]">2</span>
                                    <span>Upload the photo where you want to replace the face (target)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffcc33]/20 text-xs font-bold text-[#ffcc33]">3</span>
                                    <span>Click generate and let AI do the magic</span>
                                </li>
                            </ol>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8">
                            {!user ? (
                                <div className="text-center">
                                    <p className="mb-4 text-sm text-white/60">Sign in to use AI person replacer</p>
                                    <Button
                                        asChild
                                        className="h-12 w-full rounded-xl bg-white/10 font-semibold text-white hover:bg-white/20"
                                    >
                                        <Link href="/auth/login?returnUrl=/tools/ai-person-replacer">
                                            <Chrome className="w-4 h-4" />
                                            Sign in with Google
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !sourceImage || !targetImage}
                                    className="h-12 w-full rounded-xl bg-[#ffcc33] text-base font-semibold text-black hover:bg-yellow-300 disabled:opacity-50"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-5 w-5" />
                                            Generate
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                        <div className="text-lg font-semibold">Result Preview</div>
                        <p className="mt-1 text-sm text-white/60">Your generated image will appear here</p>

                        <div className="mt-6 overflow-hidden rounded-xl bg-black/50" style={{ aspectRatio: "1/1" }}>
                            <div className="flex h-full items-center justify-center">
                                <div className="text-center text-white/40">
                                    <UserRound className="mx-auto h-16 w-16 opacity-50" />
                                    <p className="mt-4 px-8">Upload both source face and target photo to generate</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                            <Sparkles className="h-5 w-5 shrink-0 text-yellow-500" />
                            <p className="text-sm text-yellow-200/80">
                                For best results, use high-quality photos with clear, front-facing faces
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

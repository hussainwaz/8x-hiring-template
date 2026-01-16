"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"
import { Upload, Loader2, Shirt, Chrome, Sparkles, ArrowRight } from "lucide-react"

const outfitStyles = [
    { id: "casual", label: "Casual", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80" },
    { id: "formal", label: "Formal", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    { id: "sporty", label: "Sporty", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80" },
    { id: "vintage", label: "Vintage", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&q=80" },
    { id: "streetwear", label: "Streetwear", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=200&q=80" },
    { id: "elegant", label: "Elegant", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80" },
]

export default function AIDressChangerPage() {
    const { user } = useAuth()
    const [selectedStyle, setSelectedStyle] = useState<string>("casual")
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleGenerate = async () => {
        if (!selectedImage) return
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
                        AI Dress Changer
                    </h1>
                    <p className="mt-3 text-sm text-white/65 sm:text-base">
                        Transform your outfit with AI. Upload a photo and try different styles instantly.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    {/* Left Panel - Upload & Controls */}
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <Shirt className="h-6 w-6 text-[#ffcc33]" />
                            <div>
                                <div className="text-lg font-semibold">Upload Your Photo</div>
                                <p className="mt-1 text-sm text-white/60">
                                    Upload a full-body photo for best results
                                </p>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="mt-6">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageSelect}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10"
                                style={{ aspectRatio: "3/4" }}
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
                                        <Upload className="h-12 w-12 text-white/50" />
                                        <div className="text-center">
                                            <div className="font-medium text-white/70">Click to upload</div>
                                            <div className="mt-1 text-sm text-white/50">PNG, JPG up to 10MB</div>
                                        </div>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Style Selection */}
                        <div className="mt-6">
                            <div className="text-sm font-semibold text-white/70">Choose Outfit Style</div>
                            <div className="mt-3 grid grid-cols-3 gap-3">
                                {outfitStyles.map((style) => (
                                    <button
                                        key={style.id}
                                        type="button"
                                        onClick={() => setSelectedStyle(style.id)}
                                        className={cn(
                                            "group relative overflow-hidden rounded-xl border transition-all",
                                            selectedStyle === style.id
                                                ? "border-[#ffcc33] ring-2 ring-[#ffcc33]"
                                                : "border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        <div className="aspect-square">
                                            <img src={style.image} alt={style.label} className="h-full w-full object-cover" />
                                        </div>
                                        <div className={cn(
                                            "absolute inset-x-0 bottom-0 py-2 text-center text-xs font-semibold",
                                            selectedStyle === style.id ? "bg-[#ffcc33] text-black" : "bg-black/60 text-white"
                                        )}>
                                            {style.label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8">
                            {!user ? (
                                <div className="text-center">
                                    <p className="mb-4 text-sm text-white/60">Sign in to transform your outfit</p>
                                    <Button
                                        asChild
                                        className="h-12 w-full rounded-xl bg-white/10 font-semibold text-white hover:bg-white/20"
                                    >
                                        <Link href="/auth/login?returnUrl=/tools/ai-dress-changer">
                                            <Chrome className="w-4 h-4" />
                                            Sign in with Google
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !selectedImage}
                                    className="h-12 w-full rounded-xl bg-[#ffcc33] text-base font-semibold text-black hover:bg-yellow-300 disabled:opacity-50"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Transforming...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-5 w-5" />
                                            Transform Outfit
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                        <div className="text-lg font-semibold">Result Preview</div>
                        <p className="mt-1 text-sm text-white/60">Your transformed image will appear here</p>

                        <div className="mt-6 overflow-hidden rounded-xl bg-black/50" style={{ aspectRatio: "3/4" }}>
                            <div className="flex h-full items-center justify-center">
                                <div className="text-center text-white/40">
                                    <Shirt className="mx-auto h-16 w-16 opacity-50" />
                                    <p className="mt-4">Upload a photo and select a style to see the transformation</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 p-4">
                            <Sparkles className="h-5 w-5 text-[#ffcc33]" />
                            <p className="text-sm text-white/70">
                                Pro tip: Use well-lit photos with clear visibility of your current outfit
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

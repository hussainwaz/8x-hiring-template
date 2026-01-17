"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { GradientBackground } from "@/components/gradient-background"
import { cn } from "@/lib/utils"
import { Upload, Loader2, Car, Chrome, Sparkles, Palette } from "lucide-react"

const carColors = [
    { id: "red", label: "Red", color: "#ef4444" },
    { id: "blue", label: "Blue", color: "#3b82f6" },
    { id: "black", label: "Black", color: "#1f2937" },
    { id: "white", label: "White", color: "#f9fafb" },
    { id: "silver", label: "Silver", color: "#9ca3af" },
    { id: "green", label: "Green", color: "#22c55e" },
    { id: "yellow", label: "Yellow", color: "#eab308" },
    { id: "orange", label: "Orange", color: "#f97316" },
]

const carStyles = [
    { id: "original", label: "Original" },
    { id: "sports", label: "Sports" },
    { id: "luxury", label: "Luxury" },
    { id: "vintage", label: "Vintage" },
    { id: "custom", label: "Custom" },
]

export default function AICarChangerPage() {
    const { user } = useAuth()
    const [selectedColor, setSelectedColor] = useState<string>("red")
    const [selectedStyle, setSelectedStyle] = useState<string>("original")
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
            <GradientBackground />

            <main className="mx-auto w-full max-w-7xl px-6 pb-24">
                {/* Header */}
                <div className="pt-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#c6a02c]">
                        AI Car Changer
                    </h1>
                    <p className="mt-3 text-sm text-white/65 sm:text-base">
                        Change your car's color and style with AI. Upload a photo and customize it instantly.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    {/* Left Panel - Upload & Controls */}
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <Car className="h-6 w-6 text-[#ffcc33]" />
                            <div>
                                <div className="text-lg font-semibold">Upload Your Car Photo</div>
                                <p className="mt-1 text-sm text-white/60">
                                    Upload a clear photo of your car for best results
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
                                style={{ aspectRatio: "16/9" }}
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

                        {/* Color Selection */}
                        <div className="mt-6">
                            <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
                                <Palette className="h-4 w-4" />
                                Choose Color
                            </div>
                            <div className="mt-3 flex flex-wrap gap-3">
                                {carColors.map((color) => (
                                    <button
                                        key={color.id}
                                        type="button"
                                        onClick={() => setSelectedColor(color.id)}
                                        className={cn(
                                            "group relative h-10 w-10 rounded-full border-2 transition-all",
                                            selectedColor === color.id
                                                ? "border-[#ffcc33] ring-2 ring-[#ffcc33] ring-offset-2 ring-offset-black"
                                                : "border-white/20 hover:border-white/50"
                                        )}
                                        style={{ backgroundColor: color.color }}
                                        title={color.label}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Style Selection */}
                        <div className="mt-6">
                            <div className="text-sm font-semibold text-white/70">Choose Style</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {carStyles.map((style) => (
                                    <button
                                        key={style.id}
                                        type="button"
                                        onClick={() => setSelectedStyle(style.id)}
                                        className={cn(
                                            "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                                            selectedStyle === style.id
                                                ? "border-[#ffcc33] bg-[#ffcc33] text-black"
                                                : "border-white/10 bg-black/30 text-white/70 hover:bg-black/50"
                                        )}
                                    >
                                        {style.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8">
                            {!user ? (
                                <div className="text-center">
                                    <p className="mb-4 text-sm text-white/60">Sign in to customize your car</p>
                                    <Button
                                        asChild
                                        className="h-12 w-full rounded-xl bg-white/10 font-semibold text-white hover:bg-white/20"
                                    >
                                        <Link href="/auth/login?returnUrl=/tools/ai-car-changer">
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
                                            Transform Car
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                        <div className="text-lg font-semibold">Result Preview</div>
                        <p className="mt-1 text-sm text-white/60">Your transformed car will appear here</p>

                        <div className="mt-6 overflow-hidden rounded-xl bg-black/50" style={{ aspectRatio: "16/9" }}>
                            <div className="flex h-full items-center justify-center">
                                <div className="text-center text-white/40">
                                    <Car className="mx-auto h-16 w-16 opacity-50" />
                                    <p className="mt-4">Upload a car photo and select options to see the transformation</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                                <div className="text-xs font-semibold text-white/60">Selected Color</div>
                                <div className="mt-2 flex items-center gap-2">
                                    <div
                                        className="h-6 w-6 rounded-full border border-white/20"
                                        style={{ backgroundColor: carColors.find(c => c.id === selectedColor)?.color }}
                                    />
                                    <span className="font-medium capitalize">{selectedColor}</span>
                                </div>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                                <div className="text-xs font-semibold text-white/60">Selected Style</div>
                                <div className="mt-2 font-medium capitalize">{selectedStyle}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

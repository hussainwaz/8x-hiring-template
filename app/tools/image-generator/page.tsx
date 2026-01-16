"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Lightbulb, Upload, Loader2, ImageIcon, Chrome } from "lucide-react"

type GenerationType = "text" | "image"
type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4"
type Resolution = "1K" | "2K" | "4K"

const aspectRatios: { value: AspectRatio; label: string }[] = [
    { value: "1:1", label: "Square (1:1)" },
    { value: "16:9", label: "Landscape (16:9)" },
    { value: "9:16", label: "Portrait (9:16)" },
    { value: "4:3", label: "Standard (4:3)" },
    { value: "3:4", label: "Portrait (3:4)" },
]

const resolutions: { value: Resolution; label: string; credits: number }[] = [
    { value: "1K", label: "1K (1 Credit)", credits: 1 },
    { value: "2K", label: "2K (2 Credits)", credits: 2 },
    { value: "4K", label: "4K (4 Credits)", credits: 4 },
]

export default function ImageGeneratorPage() {
    const { user } = useAuth()
    const { isPro } = useSubscription()
    const [generationType, setGenerationType] = useState<GenerationType>("text")
    const [prompt, setPrompt] = useState("")
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1")
    const [resolution, setResolution] = useState<Resolution>("1K")
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleGenerate = async () => {
        if (!prompt.trim()) return
        setIsGenerating(true)
        // Simulate generation
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsGenerating(false)
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
        }
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
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#c6a02c] italic">
                        Image Generator
                    </h1>
                    <p className="mt-3 text-sm text-white/65 sm:text-base">
                        Generate photorealistic images from text descriptions using advanced AI models.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    {/* Left Panel - Controls */}
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🎨</span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-semibold">Image Generator</span>
                                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/70">
                                        Login Required
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-white/60">
                                    Generate photorealistic AI images. See what's possible with photorealistic AI generated images
                                </p>
                            </div>
                        </div>

                        {/* Generation Type Toggle */}
                        <div className="mt-6">
                            <div className="text-sm font-semibold text-white/70">Select Generation Type</div>
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setGenerationType("text")}
                                    className={cn(
                                        "flex flex-col items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                                        generationType === "text"
                                            ? "border-[#ffcc33] bg-[#ffcc33] text-black"
                                            : "border-white/10 bg-black/35 text-white/90 hover:bg-black/45"
                                    )}
                                >
                                    <span className="font-bold">GENERATE FROM TEXT</span>
                                    <span className="mt-1 text-xs font-normal opacity-70">
                                        Create new images from text descriptions
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setGenerationType("image")}
                                    className={cn(
                                        "flex flex-col items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                                        generationType === "image"
                                            ? "border-[#ffcc33] bg-[#ffcc33] text-black"
                                            : "border-white/10 bg-black/35 text-white/90 hover:bg-black/45"
                                    )}
                                >
                                    <span className="font-bold">GENERATE FROM IMAGE</span>
                                    <span className="mt-1 text-xs font-normal opacity-70">
                                        Modify existing images with AI
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Image Upload (if generate from image) */}
                        {generationType === "image" && (
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
                                    className="w-full rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-8 hover:bg-white/10"
                                >
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <Upload className="h-8 w-8 text-white/70" />
                                        <div className="text-sm font-medium text-white/70">
                                            {selectedImage ? selectedImage.name : "Click to upload an image"}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        )}

                        {/* Prompt */}
                        <div className="mt-6">
                            <div className="text-sm font-semibold text-white/70">Prompt</div>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                rows={4}
                                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-white/85 placeholder:text-white/40 outline-none focus:border-[#ffcc33]/50"
                                placeholder="A beautiful sunset over mountains, cinematic lighting, photorealistic, 8K resolution, highly detailed"
                            />
                        </div>

                        {/* Aspect Ratio */}
                        <div className="mt-6">
                            <div className="text-sm font-semibold text-white/70">Aspect Ratio</div>
                            <Select value={aspectRatio} onValueChange={(v) => setAspectRatio(v as AspectRatio)}>
                                <SelectTrigger className="mt-2 h-12 rounded-xl border-[#ffcc33] bg-black/30 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {aspectRatios.map((ratio) => (
                                        <SelectItem key={ratio.value} value={ratio.value}>
                                            {ratio.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Resolution */}
                        <div className="mt-6">
                            <div className="text-sm font-semibold text-white/70">Resolution</div>
                            <Select value={resolution} onValueChange={(v) => setResolution(v as Resolution)}>
                                <SelectTrigger className="mt-2 h-12 rounded-xl border-white/10 bg-black/30 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {resolutions.map((res) => (
                                        <SelectItem key={res.value} value={res.value}>
                                            {res.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8">
                            {!user ? (
                                <div className="text-center">
                                    <p className="mb-4 text-sm text-white/60">Sign in to generate images</p>
                                    <Button
                                        asChild
                                        className="h-12 w-full rounded-xl bg-white/10 font-semibold text-white hover:bg-white/20"
                                    >
                                        <Link href="/auth/login?returnUrl=/tools/image-generator">
                                            <Chrome className="w-4 h-4" />
                                            Sign in with Google
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !prompt.trim()}
                                    className="h-12 w-full rounded-xl bg-[#ffcc33] text-base font-semibold text-black hover:bg-yellow-300 disabled:opacity-50"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon className="h-5 w-5" />
                                            Generate Image
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                        <div className="text-lg font-semibold">Example Generation</div>

                        <div className="mt-2 flex items-center gap-2 text-sm text-white/60">
                            <Lightbulb className="h-4 w-4 text-[#ffcc33]" />
                            <span>Pro tip: Use detailed descriptions with lighting, style, and mood for best results</span>
                        </div>

                        <div className="mt-6">
                            <div className="relative overflow-hidden rounded-xl bg-black" style={{ aspectRatio: "1/1" }}>
                                <img
                                    src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80"
                                    alt="Example astronaut image"
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4 rounded-lg bg-[#ffcc33] px-3 py-1 text-xs font-semibold text-black">
                                    1:1
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
                            <div className="text-xs font-semibold text-white/60">Prompt:</div>
                            <div className="mt-2 text-sm text-white/85">
                                "Astronaut having dinner in the space, floating with tea in one hand and food in the other, realistic photo, bold colors."
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

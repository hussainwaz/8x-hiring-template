"use client"

import type { ReactNode } from "react"
import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { Button } from "@/components/ui/button"
import { ToggleSwitch } from "@/components/ui/toggle-switch"
import { cn } from "@/lib/utils"
import { Globe, Play, Upload, Video, Loader2, AlertCircle, Crown, CheckCircle2, Sparkles } from "lucide-react"

type Model = "veo" | "sora"

type AspectRatio = "16:9" | "9:16"

type Person = {
    id: string
    name: string
    handle: string
    avatarUrl: string
}

const people: Person[] = [
    {
        id: "jake",
        name: "Jake Paul",
        handle: "jakepaul",
        avatarUrl: "https://i.pravatar.cc/160?img=12",
    },
    {
        id: "sam",
        name: "Sam Altman",
        handle: "sama",
        avatarUrl: "https://i.pravatar.cc/160?img=13",
    },
    {
        id: "ricky",
        name: "Ricky Berwick",
        handle: "rickyberwick",
        avatarUrl: "https://i.pravatar.cc/160?img=14",
    },
    {
        id: "xqc",
        name: "XQC",
        handle: "xqc",
        avatarUrl: "https://i.pravatar.cc/160?img=15",
    },
    {
        id: "justine",
        name: "iJustine",
        handle: "ijustine",
        avatarUrl: "https://i.pravatar.cc/160?img=16",
    },
]

function SelectButton({
    active,
    children,
    onClick,
}: {
    active: boolean
    children: ReactNode
    onClick: () => void
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "h-11 w-full rounded-xl border px-4 text-sm font-semibold transition-colors",
                active
                    ? "border-transparent bg-[#ffcc33] text-black"
                    : "border-white/10 bg-black/35 text-white/90 hover:bg-black/45"
            )}
        >
            {children}
        </button>
    )
}

export function VideoGenerationClient() {
    const { user } = useAuth()
    const { tier, isPro, isLoading: subLoading } = useSubscription()
    const [model, setModel] = useState<Model>("sora")
    const [ratio, setRatio] = useState<AspectRatio>("16:9")
    const [removeWatermark, setRemoveWatermark] = useState(true)
    const [generateFromImages, setGenerateFromImages] = useState(false)
    const [selectedIds, setSelectedIds] = useState<string[]>(["ricky", "justine"])
    const [promptBody, setPromptBody] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [selectedImages, setSelectedImages] = useState<File[]>([])

    // State for generated video result (separate from example)
    const [generatedVideo, setGeneratedVideo] = useState<{
        url: string
        prompt: string
        model: string
        aspectRatio: string
    } | null>(null)
    const [showSuccess, setShowSuccess] = useState(false)

    const selectedPeople = useMemo(
        () => people.filter((p) => selectedIds.includes(p.id)),
        [selectedIds]
    )

    const mentionLine = useMemo(
        () => selectedPeople.map((p) => `@${p.handle}`).join(" "),
        [selectedPeople]
    )

    const previewLabel = useMemo(() => {
        if (generatedVideo) {
            return generatedVideo.model === "sora" ? "Sora 2" : "Veo 3.1"
        }
        return model === "sora" ? "Sora 2 Example" : "Veo 3.1 Example"
    }, [model, generatedVideo])

    function togglePerson(id: string) {
        setSelectedIds((prev) => {
            const exists = prev.includes(id)
            if (exists) return prev.filter((x) => x !== id)
            if (prev.length >= 3) return prev
            return [...prev, id]
        })
    }

    function onPickImages(files: FileList | null) {
        if (!files) return
        const next = Array.from(files)
        setSelectedImages(next)
    }

    const handleGenerate = async () => {
        setError(null)

        // Validate prompt
        const fullPrompt = `${mentionLine} ${promptBody}`.trim()

        if (!promptBody.trim()) {
            setError("Please enter a prompt to describe your video")
            return
        }

        if (promptBody.trim().length < 10) {
            setError("Prompt must be at least 10 characters long")
            return
        }

        setIsGenerating(true)

        try {
            const response = await fetch("/api/generate-video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: fullPrompt,
                    model,
                    aspectRatio: ratio,
                    removeWatermark: isPro && removeWatermark,
                    generateFromImages,
                    selectedPeople: selectedPeople.map(p => p.name),
                    images: selectedImages.length,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate video")
            }

            // Set the generated video result
            setGeneratedVideo({
                url: data.video.url,
                prompt: data.video.prompt,
                model: data.video.model,
                aspectRatio: data.video.aspectRatio,
            })

            // Show success notification
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 5000)

            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate video")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-6 pb-24">
            <div className="pt-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#c6a02c]">Video Generation</h1>
                <p className="mt-3  text-sm text-white/65 sm:text-base">
                    Create stunning videos from text prompts or transform your images into dynamic
                    video content.
                </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                    <div className="flex items-start gap-3">
                        <Play className="mt-1 h-5 w-5 text-[#ffcc33]" />
                        <div>
                            <div className="text-lg font-semibold">Generate Video</div>
                            <div className="mt-1 text-sm text-white/60">
                                Transform your ideas into professional videos in seconds.
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="text-sm font-semibold text-white/70">AI Model</div>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <SelectButton active={model === "veo"} onClick={() => setModel("veo")}>
                                Google Veo 3.1
                            </SelectButton>
                            <SelectButton active={model === "sora"} onClick={() => setModel("sora")}>
                                OpenAI Sora 2
                            </SelectButton>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="text-sm font-semibold text-white/70">Aspect Ratio</div>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            <SelectButton active={ratio === "16:9"} onClick={() => setRatio("16:9")}>
                                16:9 (Landscape)
                            </SelectButton>
                            <SelectButton active={ratio === "9:16"} onClick={() => setRatio("9:16")}>
                                9:16 (Portrait)
                            </SelectButton>
                        </div>
                    </div>

                    <div className="mt-5 space-y-3">
                        <ToggleSwitch
                            label="Remove Watermark"
                            checked={removeWatermark}
                            onCheckedChange={setRemoveWatermark}
                        />
                        {user && !isPro && removeWatermark && (
                            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 shrink-0 text-yellow-500" />
                                    <div className="text-sm">
                                        <div className="font-semibold text-yellow-500">Pro Feature</div>
                                        <div className="mt-1 text-white/70">
                                            Watermark removal is only available for Pro users.
                                            <Link href="/upgrade" className="ml-1 font-semibold text-[#ffcc33] hover:underline">
                                                Upgrade now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <ToggleSwitch
                            label="Generate from Images"
                            checked={generateFromImages}
                            onCheckedChange={setGenerateFromImages}
                        />
                    </div>

                    <div className="mt-8">
                        <div className="text-sm font-semibold text-white/70">
                            Select Characters to Star in Your Video (Up to 3)
                        </div>
                        <div className="mt-4 flex flex-wrap gap-5">
                            {people.map((person) => {
                                const selected = selectedIds.includes(person.id)
                                return (
                                    <button
                                        key={person.id}
                                        type="button"
                                        onClick={() => togglePerson(person.id)}
                                        className="group flex flex-col items-center gap-2"
                                        aria-pressed={selected}
                                    >
                                        <div
                                            className={cn(
                                                "relative h-16 w-16 overflow-hidden rounded-full ring-2 transition-colors",
                                                selected ? "ring-[#ffcc33]" : "ring-white/10"
                                            )}
                                        >
                                            <img
                                                src={person.avatarUrl}
                                                alt={person.name}
                                                className="h-full w-full object-cover"
                                            />
                                            {selected ? (
                                                <div className="absolute inset-0 grid place-items-center bg-black/35">
                                                    <div className="grid h-7 w-7 place-items-center rounded-full bg-[#ffcc33] text-xs font-bold text-black">
                                                        ✓
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="text-xs text-white/70 group-hover:text-white/85">
                                            {person.name}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold text-white/70">Describe your video</div>
                            <div className="h-1.5 w-1.5 rounded-full bg-[#ffcc33]" />
                        </div>

                        {generateFromImages ? (
                            <div className="mt-4">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => onPickImages(e.target.files)}
                                />

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className={cn(
                                        "group w-full rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-6 text-left",
                                        "hover:bg-white/10"
                                    )}
                                >
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <Upload className="h-8 w-8 text-white/70" />
                                        <div className="rounded-xl bg-black/40 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/10">
                                            Upload Image
                                        </div>
                                        <div className="text-xs text-white/45">
                                            Upload an image to generate a video
                                        </div>
                                        {selectedImages.length ? (
                                            <div className="text-xs text-white/60">
                                                {selectedImages.length} image{selectedImages.length === 1 ? "" : "s"} selected
                                            </div>
                                        ) : null}
                                    </div>
                                </button>
                            </div>
                        ) : null}

                        <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
                            <div className="px-1 pb-2 text-xs font-semibold text-white/55">
                                {mentionLine || "@example"}
                            </div>
                            <textarea
                                value={promptBody}
                                onChange={(e) => setPromptBody(e.target.value)}
                                rows={5}
                                className="w-full resize-none bg-transparent text-sm text-white/85 outline-none"
                                placeholder="A dog running through a sunny meadow, cinematic style, golden hour lighting, high quality, 4K resolution"
                            />
                        </div>

                        <div className="mt-3 text-xs text-white/45">
                            Be specific about subjects, actions, settings, camera angles, and visual style for best results.
                        </div>
                    </div>

                    <div className="mt-8">
                        {!user ? (
                            <Button
                                asChild
                                className="h-12 w-full rounded-xl bg-[#ffcc33] text-base font-semibold text-black hover:bg-yellow-300"
                            >
                                <Link href="/auth/login?returnUrl=/tools/video-generation">
                                    <Globe className="h-4 w-4" />
                                    Sign in to generate
                                </Link>
                            </Button>
                        ) : (
                            <>
                                {error && (
                                    <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                                            <div className="text-sm text-red-500">{error}</div>
                                        </div>
                                    </div>
                                )}
                                <Button
                                    className="h-12 w-full rounded-xl bg-[#ffcc33] text-base font-semibold text-black hover:bg-yellow-300 disabled:opacity-50"
                                    disabled={isGenerating || subLoading}
                                    onClick={handleGenerate}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Play className="h-4 w-4" />
                                            Generate Video{!isPro && removeWatermark ? ' (with watermark)' : ''}
                                        </>
                                    )}
                                </Button>
                            </>
                        )}

                        {user && !isPro && (
                            <div className="mt-4 rounded-xl border border-[#ffcc33]/20 bg-[#ffcc33]/10 p-4">
                                <div className="flex items-start gap-3">
                                    <Crown className="h-5 w-5 shrink-0 text-[#ffcc33]" />
                                    <div className="text-sm">
                                        <div className="font-semibold text-[#ffcc33]">Upgrade to Pro</div>
                                        <div className="mt-1 text-white/70">
                                            Get watermark-free videos, priority processing, and unlimited generations.
                                        </div>
                                        <Button
                                            asChild
                                            className="mt-3 h-9 rounded-lg bg-[#ffcc33] text-sm font-semibold text-black hover:bg-yellow-300"
                                        >
                                            <Link href="/upgrade">
                                                View Plans
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold">Preview</div>
                        {showSuccess && (
                            <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Video generated!
                            </div>
                        )}
                    </div>

                    <div
                        className="mt-4 overflow-hidden rounded-xl bg-black relative"
                        style={{ aspectRatio: "16 / 9" }}
                    >
                        {/* Generating overlay */}
                        {isGenerating && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                                <div className="relative">
                                    <div className="h-16 w-16 rounded-full border-4 border-[#ffcc33]/20" />
                                    <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-[#ffcc33]" />
                                    <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-[#ffcc33] animate-pulse" />
                                </div>
                                <div className="mt-4 text-sm font-semibold text-white">Generating your video...</div>
                                <div className="mt-2 text-xs text-white/60">This may take a few moments</div>
                            </div>
                        )}

                        {/* Success overlay - shows briefly after generation */}
                        {showSuccess && !isGenerating && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                                <div className="flex flex-col items-center">
                                    <div className="grid h-16 w-16 place-items-center rounded-full bg-green-500/20">
                                        <CheckCircle2 className="h-8 w-8 text-green-400" />
                                    </div>
                                    <div className="mt-3 text-sm font-semibold text-white">Video Ready!</div>
                                </div>
                            </div>
                        )}

                        <div className="relative h-full w-full">
                            <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white/80">
                                {previewLabel}
                            </div>
                            <div className="grid h-full w-full place-items-center bg-black">
                                <div
                                    className={cn(
                                        "h-full",
                                        (generatedVideo?.aspectRatio || ratio) === "16:9" ? "w-full" : "w-[56.25%]"
                                    )}
                                    style={{ aspectRatio: (generatedVideo?.aspectRatio || ratio) === "16:9" ? "16 / 9" : "9 / 16" }}
                                >
                                    <video
                                        key={generatedVideo?.url || ratio}
                                        className="h-full w-full object-cover"
                                        src={
                                            generatedVideo?.url ||
                                            (ratio === "16:9"
                                                ? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                                                : "https://babiceva.ai/video-examples/sora2-example.mp4?v=1768570150847")
                                        }
                                        controls
                                        playsInline
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
                        <div className="text-xs font-semibold text-white/60">Prompt:</div>
                        <div className="mt-2 text-sm text-white/85">
                            {generatedVideo ? (
                                <span>{generatedVideo.prompt}</span>
                            ) : (
                                <>
                                    <span className="font-semibold text-white/80">@example</span>
                                    {" is holding a mug and speaking in a short, clear sentence."}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-2 text-xs text-white/45">
                        Selected model: {generatedVideo?.model || (model === "sora" ? "OpenAI Sora 2" : "Google Veo 3.1")}
                        {removeWatermark ? " • Remove watermark" : ""}
                        {generateFromImages ? " • From images" : ""}
                    </div>
                </div>
            </div>

            <div className="mt-14">
                <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/20 px-6 py-14 text-center shadow-xl backdrop-blur-xl">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                        <Video className="h-6 w-6 text-white/70" />
                    </div>
                    <div className="mt-4 text-sm text-white/65">Sign in to view your video history</div>
                </div>
            </div>
        </div>
    )
}

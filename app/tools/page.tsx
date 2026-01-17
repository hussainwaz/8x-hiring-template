"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { GradientBackground } from "@/components/gradient-background"
import { Video, Image as ImageIcon, Shirt, Car, UserRound, ArrowRight } from "lucide-react"

const tools = [
    {
        href: "/tools/video-generation",
        label: "Video Generation",
        description: "Create stunning videos from text prompts using AI",
        icon: Video,
        color: "from-orange-500/20 to-red-500/20",
    },
    {
        href: "/tools/image-generator",
        label: "Image Generator",
        description: "Generate photorealistic images from text descriptions",
        icon: ImageIcon,
        color: "from-blue-500/20 to-purple-500/20",
    },
    {
        href: "/tools/ai-dress-changer",
        label: "AI Dress Changer",
        description: "Transform your outfit with AI styling",
        icon: Shirt,
        color: "from-pink-500/20 to-rose-500/20",
    },
    {
        href: "/tools/ai-car-changer",
        label: "AI Car Changer",
        description: "Change your car's color and style instantly",
        icon: Car,
        color: "from-green-500/20 to-emerald-500/20",
    },
    {
        href: "/tools/ai-person-replacer",
        label: "AI Person Replacer",
        description: "Replace faces in photos using AI face-swap",
        icon: UserRound,
        color: "from-violet-500/20 to-indigo-500/20",
    },
]

export default function ToolsPage() {
    return (
        <div className="relative min-h-screen text-white">
            <GradientBackground />

            <main className="mx-auto w-full max-w-7xl px-6 pb-24">
                {/* Header */}
                <div className="pt-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#c6a02c]">
                        AI Tools
                    </h1>
                    <p className="mt-3 text-sm text-white/65 sm:text-base">
                        Explore our collection of powerful AI tools to enhance your creative projects
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-6 shadow-xl backdrop-blur-xl transition-all hover:border-[#ffcc33]/50 hover:shadow-[#ffcc33]/10"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 transition-opacity group-hover:opacity-100`} />

                            <div className="relative">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#ffcc33] ring-1 ring-white/10 transition-colors group-hover:bg-[#ffcc33]/20">
                                    <tool.icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-4 text-lg font-semibold">{tool.label}</h3>
                                <p className="mt-2 text-sm text-white/60">{tool.description}</p>

                                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#ffcc33]">
                                    <span>Try now</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    )
}

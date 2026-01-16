import { Sparkles } from "lucide-react"

type Tip = {
    title: string
    description: string
}

const tips: Tip[] = [
    {
        title: "Subject and Context",
        description: "Be specific about what you want and where it happens",
    },
    {
        title: "Action and Movement",
        description: "Describe in detail what the subject is doing",
    },
    {
        title: "Style and Mood",
        description: "Include style and mood keywords",
    },
]

export function ProfessionalTips({ className }: { className?: string }) {
    return (
        <div className={className}>
            <div className="mx-auto w-full max-w-6xl lg:max-w-7xl">
                <div className="rounded-2xl border border-white/10 bg-black/40 px-6 py-6 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-[#ffcc33]" />
                        <h2 className="text-lg font-semibold tracking-tight">
                            Professional tips for better results
                        </h2>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {tips.map((tip) => (
                            <div key={tip.title}>
                                <div className="text-sm font-semibold text-[#ffcc33]">
                                    {tip.title}
                                </div>
                                <div className="mt-2 text-sm text-white/70">{tip.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

import { VideoGenerationClient } from "@/components/video-generation-client"
import { GradientBackground } from "@/components/gradient-background"

export default function VideoGenerationPage() {
    return (
        <div className="relative min-h-screen text-white">
            <GradientBackground />

            <VideoGenerationClient />
        </div>
    )
}

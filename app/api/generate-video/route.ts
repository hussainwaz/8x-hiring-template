import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to generate videos." },
                { status: 401 }
            )
        }

        // Get request body
        const body = await request.json()
        const {
            prompt,
            model,
            aspectRatio,
            removeWatermark,
            generateFromImages,
            selectedPeople,
            images
        } = body

        // Validate prompt
        if (!prompt || prompt.trim().length === 0) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            )
        }

        if (prompt.trim().length < 10) {
            return NextResponse.json(
                { error: "Prompt must be at least 10 characters long" },
                { status: 400 }
            )
        }

        // Get user's subscription tier
        const { data: subscription } = await supabase
            .from("subscriptions")
            .select("tier")
            .eq("user_id", user.id)
            .single()

        const isPro = subscription?.tier === "pro"

        // Check if user is trying to use Pro features without subscription
        if (removeWatermark && !isPro) {
            return NextResponse.json(
                { error: "Watermark removal is only available for Pro users" },
                { status: 403 }
            )
        }

        // Simulate video generation processing time
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Return dummy video links based on aspect ratio
        const videoUrl = aspectRatio === "16:9"
            ? "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            : "https://babiceva.ai/video-examples/sora2-example.mp4?v=1768570150847"

        // Return success response with video data
        return NextResponse.json({
            success: true,
            video: {
                url: videoUrl,
                prompt: prompt,
                model: model,
                aspectRatio: aspectRatio,
                hasWatermark: !isPro || !removeWatermark,
                generatedAt: new Date().toISOString(),
                metadata: {
                    selectedPeople: selectedPeople || [],
                    fromImages: generateFromImages || false,
                }
            }
        })

    } catch {
        return NextResponse.json(
            { error: "Failed to generate video. Please try again." },
            { status: 500 }
        )
    }
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeGallery } from "@/components/home-gallery"
import { ProfessionalTips } from "@/components/professional-tips"
import { Brain, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white">
      <div className="fixed inset-0 -z-10">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://gxqoceymulonokammivi.supabase.co/storage/v1/object/public/video-examples/bgvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/35 to-black/70" />
      </div>

      <main className="relative">
        <section className="mx-auto flex min-h-[53vh] w-full max-w-5xl flex-col items-center justify-center pb-8 px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-yellow-200 ring-1 ring-white/15 backdrop-blur">
            <Sparkles className="text-[#ffcc33] w-4 h-4" />
            <span>Powered by babiceva.ai</span>
            <Brain className="text-[#ffcc33] w-4 h-4" />
          </div>

          <h1 className="mt-8 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Generate <span className="text-yellow-300">your</span>
            <br />
            AI Video
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-lg text-white/80 sm:text-lg">
            Transform your ideas into professional videos in seconds.
          </p>

          <div className="mt-8">
            <Button
              asChild
              className="h-11 rounded-full bg-[#ffcc33] px-9 text-base font-semibold text-black hover:bg-yellow-300"
            >
              <Link href="/auth/signup">Start Now</Link>
            </Button>
          </div>
        </section>

        <section className="pb-16">
          <HomeGallery />
        </section>

        <section className="pb-24">
          <ProfessionalTips />
        </section>
      </main>
    </div>
  )
}

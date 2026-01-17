"use client"

import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"

type GalleryItem = {
    src: string
    className?: string
}

const items: GalleryItem[] = [
    {
        src: "https://babiceva.ai/video-examples/vhs-fisheye.mp4",
        className: "md:col-start-1 md:row-start-1 md:row-span-2",
    },
    {
        src: "https://babiceva.ai/video-examples/running-man.mp4",
        className: "md:col-start-2 md:row-start-1",
    },
    {
        src: "https://babiceva.ai/video-examples/girl-porsche.mp4",
        className: "hidden md:block md:col-start-2 md:row-start-2",
    },
    {
        src: "https://babiceva.ai/video-examples/timelapse-people.mp4",
        className: "md:col-start-3 md:row-start-1 md:row-span-2",
    },
    {
        src: "https://babiceva.ai/video-examples/couple-cafe.mp4",
        className: "md:col-start-4 md:row-start-1",
    },
    {
        src: "https://babiceva.ai/video-examples/80s-man.mp4",
        className: "md:col-start-4 md:row-start-2",
    },
    {
        src: "https://babiceva.ai/video-examples/vintage-woman.mp4",
        className: "md:col-start-5 md:row-start-1 md:row-span-2",
    },
]

function LazyVideo({ src }: { src: string }) {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: "100px" }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef} className="h-full w-full">
            {isVisible ? (
                <video
                    className="h-full w-full object-cover"
                    src={src}
                    muted
                    loop
                    playsInline
                    autoPlay
                />
            ) : (
                <div className="h-full w-full bg-white/5 animate-pulse" />
            )}
        </div>
    )
}

export function HomeGallery({ className }: { className?: string }) {
    return (
        <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>
            <div className="grid grid-cols-3 auto-rows-[140px] gap-3 md:grid-cols-5 md:auto-rows-[200px]">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            "overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10",
                            "md:rounded-xl",
                            item.className
                        )}
                    >
                        <LazyVideo src={item.src} />
                    </div>
                ))}
            </div>
        </div>
    )
}

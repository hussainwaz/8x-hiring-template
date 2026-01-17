"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Camera,
    Globe,
    ChevronDown,
    Play,
    Video,
    Image as ImageIcon,
    Shirt,
    Car,
    UserRound,
    Home,
    Chrome,
    LogOut,
    Loader2,
    User,
} from "lucide-react"

const aiTools = [
    { href: "/tools/video-generation", label: "Video Generation", icon: Video },
    { href: "/tools/image-generator", label: "Image Generator", icon: ImageIcon },
    { href: "/tools/ai-dress-changer", label: "AI Dress Changer", icon: Shirt },
    { href: "/tools/ai-car-changer", label: "AI Car Changer", icon: Car },
    { href: "/tools/ai-person-replacer", label: "AI Person Replacer", icon: UserRound },
]

export function SiteHeader() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, isLoading, isSigningOut, signOut } = useAuth()

    const isHome = pathname === "/"
    const isPricing = pathname === "/upgrade"
    const isTools = pathname.startsWith("/tools")

    const handleSignOut = () => {
        if (isSigningOut) return
        signOut()
        router.push("/")
        router.refresh()
    }

    return (
        <header className="relative z-50">
            <div className="bg-gray-400/20 backdrop-blur-xl supports-backdrop-filter:bg-black/15 border">
                <div className="mx-auto flex w-full max-w-7xl px-3 md:px-6 xl:px-0 items-center justify-between py-3 text-white">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                            <Camera className="h-4 w-4" />
                        </div>
                        <span className="text-xl font-semibold tracking-tight hidden sm:block">Babičeva AI</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/15"
                            aria-label="Change language"
                        >
                            <Globe className="h-5 w-5" />
                        </button>

                        {isLoading ? (
                            <Skeleton className="h-10 w-28 rounded-xl bg-white/10" />
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                {/* Profile Avatar */}
                                <Link
                                    href="/profile"
                                    className={cn(
                                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                                        pathname === "/profile"
                                            ? "border-[#ffcc33] bg-[#ffcc33]/20 text-[#ffcc33]"
                                            : "border-white/20 bg-white/5 text-white/80 hover:border-[#ffcc33]/50 hover:bg-[#ffcc33]/10 hover:text-white"
                                    )}
                                    title="Profile"
                                >
                                    <User className="w-5 h-5" />
                                </Link>
                                <Button
                                    type="button"
                                    onClick={handleSignOut}
                                    disabled={isSigningOut}
                                    className="h-10 rounded-xl bg-white/15 px-5 font-semibold text-white hover:bg-white/20 disabled:opacity-70"
                                >
                                    {isSigningOut ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Signing out...
                                        </>
                                    ) : (
                                        <>
                                            <LogOut className="w-4 h-4" />
                                            Sign out
                                        </>
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <Button
                                asChild
                                className="h-10 rounded-xl bg-[#ffcc33] px-5 font-semibold text-black hover:bg-yellow-300"
                            >
                                <Link href="/auth/login">
                                    <Chrome className="w-4 h-4" />
                                    Sign in
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-7xl pb-5 pt-8 text-white px-3 md:px-6 xl:px-0 ">
                <nav className="relative p-1 rounded-xl bg-gray-400/20 backdrop-blur-xl supports-backdrop-filter:bg-black/15 border">
                    <div className="grid grid-cols-3 items-center gap-1">
                        <Link
                            href="/"
                            className={cn(
                                "flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-semibold",
                                isHome
                                    ? "bg-[#ffcc33] text-black"
                                    : "text-white/90 hover:bg-white/10"
                            )}
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    suppressHydrationWarning
                                    className={cn(
                                        "group flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-semibold outline-none",
                                        isTools
                                            ? "bg-[#ffcc33] text-black"
                                            : "text-white/90 hover:bg-white/10"
                                    )}
                                >
                                    <Play className="h-4 w-4" />
                                    <span className="hidden sm:inline">AI Tools</span>
                                    <span className="inline sm:hidden">AI</span>
                                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="center" className="w-65">
                                {aiTools.map((tool) => {
                                    const isActive = pathname === tool.href
                                    return (
                                        <DropdownMenuItem
                                            key={tool.href}
                                            asChild
                                            className={isActive ? "bg-[#ffcc33] text-black focus:bg-[#ffcc33] focus:text-black" : ""}
                                        >
                                            <Link href={tool.href} className="cursor-pointer">
                                                <tool.icon className="h-4 w-4" />
                                                <span className="font-medium">{tool.label}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    )
                                })}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/tools" className="cursor-pointer">
                                        <span className="ml-7 text-white/80">View all tools</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link
                            href="/upgrade"
                            className={cn(
                                "flex h-10 items-center justify-center rounded-xl text-sm font-semibold",
                                isPricing
                                    ? "bg-[#ffcc33] text-black"
                                    : "text-white/90 hover:bg-white/10"
                            )}
                        >
                            Pricing
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

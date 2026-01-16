export function GradientBackground() {
    return (
        <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-black" />
            <div className="absolute -left-40 -top-40 h-130 w-130 rounded-full bg-[radial-gradient(circle,rgba(255,153,0,0.35)_0%,rgba(255,153,0,0.0)_65%)] blur-3xl" />
            <div className="absolute -bottom-56 -right-35 h-170 w-170 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.30)_0%,rgba(168,85,247,0.0)_62%)] blur-3xl" />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/35 to-black/75" />
        </div>
    )
}

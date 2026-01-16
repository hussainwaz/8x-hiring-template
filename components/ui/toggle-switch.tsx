"use client"

import { cn } from "@/lib/utils"

export function ToggleSwitch({
    label,
    checked,
    onCheckedChange,
    disabled,
    className,
}: {
    label: string
    checked: boolean
    onCheckedChange: (next: boolean) => void
    disabled?: boolean
    className?: string
}) {
    return (
        <label
            className={cn(
                "flex w-full items-center gap-3",
                disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
                className
            )}
        >
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                disabled={disabled}
                onChange={(e) => onCheckedChange(e.target.checked)}
                aria-label={label}
            />

            <span
                className={cn(
                    "relative h-7 w-12 shrink-0 rounded-full border border-white/10 transition-colors",
                    checked ? "bg-[#ffcc33]" : "bg-gray-900"
                )}
            >
                <span
                    className={cn(
                        "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-black shadow-sm transition-transform duration-200",
                        checked ? "translate-x-6" : "translate-x-1"
                    )}
                />
            </span>

            <span className="text-sm font-medium text-white/75">{label}</span>
        </label>
    )
}

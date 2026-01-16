"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

function DropdownMenu(
    props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>
) {
    return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuTrigger(
    props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>
) {
    return (
        <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
    )
}

function DropdownMenuContent({
    className,
    sideOffset = 8,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                data-slot="dropdown-menu-content"
                sideOffset={sideOffset}
                className={cn(
                    "z-50 min-w-52 overflow-hidden rounded-xl border border-white/10 bg-black/80 p-1 text-white shadow-xl backdrop-blur-xl",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                    "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
                    className
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    )
}

function DropdownMenuItem({
    className,
    inset,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
}) {
    return (
        <DropdownMenuPrimitive.Item
            data-slot="dropdown-menu-item"
            className={cn(
                "relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none",
                "focus:bg-white/10 data-disabled:pointer-events-none data-disabled:opacity-50",
                inset && "pl-8",
                className
            )}
            {...props}
        />
    )
}

function DropdownMenuSeparator({
    className,
    ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
    return (
        <DropdownMenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn("-mx-1 my-1 h-px bg-white/10", className)}
            {...props}
        />
    )
}

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
}

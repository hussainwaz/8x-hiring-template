import type React from "react"
import type { Metadata } from "next"
import { SubscriptionProvider } from "@/contexts/subscription-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "Babičeva AI - AI Video & Image Generation",
  description: "Create stunning videos and images with AI-powered tools.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans relative isolate antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <SubscriptionProvider>
            <div className="flex-1 flex flex-col">
              <SiteHeader />
              {children}
            </div>
            <Footer />
          </SubscriptionProvider>
        </AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}

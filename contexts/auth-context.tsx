"use client"

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"
import { supabase } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isSigningOut: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isSigningOut: false,
  signOut: async () => { },
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningOut, setIsSigningOut] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    const init = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          setUser(null)
          setIsLoading(false)
          return
        }

        if (session) {
          const { data: { user }, error: userError } = await supabase.auth.getUser()
          setUser(userError ? null : user)
        } else {
          setUser(null)
        }

        setIsLoading(false)
      } catch {
        setUser(null)
        setIsLoading(false)
      }
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  const signOut = useCallback(async () => {
    setIsSigningOut(true)
    // Clear user immediately for instant UI feedback
    setUser(null)
    setIsSigningOut(false)

    // Then do cleanup in background
    try {
      await fetch("/api/auth/signout", { method: "POST" })
    } catch {
      // Ignore
    }
    try {
      await supabase.auth.signOut()
    } catch {
      // Ignore
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isSigningOut, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

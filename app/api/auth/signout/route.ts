import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  const supabase = await createClient()

  // Sign out on the server side - this properly clears cookies
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("[signout] Error signing out:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

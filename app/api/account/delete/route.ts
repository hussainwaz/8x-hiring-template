import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { stripe } from "@/lib/stripe"

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = user.id

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .single()

    if (subscription?.stripe_customer_id) {
      try {
        await stripe.customers.del(subscription.stripe_customer_id)
      } catch {
        // Continue even if Stripe deletion fails
      }
    }

    const adminClient = createAdminClient()

    try {
      const { error: deleteError } = await adminClient.auth.admin.deleteUser(userId)

      if (deleteError) {
        return NextResponse.json(
          { error: "Failed to delete user account" },
          { status: 500 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: "Failed to delete user account" },
        { status: 500 }
      )
    }

    await supabase.auth.signOut()

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully"
    })

  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}

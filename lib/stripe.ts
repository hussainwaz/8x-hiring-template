// Stripe stub for development
// Replace with actual Stripe implementation when ready for production

type StripeCustomer = {
    id: string
    deleted?: boolean
}

type StripeStub = {
    customers: {
        del: (customerId: string) => Promise<StripeCustomer>
    }
}

// Check if Stripe is configured
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

// Create a stub that logs warnings in development
export const stripe: StripeStub = {
    customers: {
        del: async (customerId: string) => {
            if (!stripeSecretKey) {
                console.warn(`[Stripe Stub] Would delete customer ${customerId} - Stripe not configured`)
                return { id: customerId, deleted: true }
            }

            // When Stripe is configured, use the real SDK:
            // import Stripe from 'stripe'
            // const stripeClient = new Stripe(stripeSecretKey)
            // return stripeClient.customers.del(customerId)

            console.warn(`[Stripe Stub] Stripe key found but SDK not installed - would delete customer ${customerId}`)
            return { id: customerId, deleted: true }
        }
    }
}

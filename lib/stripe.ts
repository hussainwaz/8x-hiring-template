type StripeCustomer = {
    id: string
    deleted?: boolean
}

type StripeStub = {
    customers: {
        del: (customerId: string) => Promise<StripeCustomer>
    }
}

export const stripe: StripeStub = {
    customers: {
        del: async (customerId: string) => {
            return { id: customerId, deleted: true }
        }
    }
}

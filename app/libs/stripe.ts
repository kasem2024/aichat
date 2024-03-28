import Stripe from 'stripe'

export const stripe: Stripe = new Stripe(process.env.STRIPE_API_KEYS!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

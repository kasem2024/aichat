// import getCurrentUser from '@/app/actions/getCurrentUser'
// import { NextResponse } from 'next/server'

// import prismadb from '@/app/libs/prismadb'
// import { stripe } from '@/app/libs/stripe'
// import { absoluteUrl } from '@/app/libs/utils'

// const settingsUrl = absoluteUrl('/settings')

// export async function GET() {
//   try {
//     const curretnUser = await getCurrentUser()

//     if (!curretnUser?.id || !curretnUser?.id) {
//       return new NextResponse('Unauthorized', { status: 401 })
//     }

//     const userSubscription = await prismadb?.userSubscription?.findUnique({
//       where: {
//         userId: curretnUser?.id,
//       },
//     })

//     if (userSubscription && userSubscription.stripeCustomerId) {
//       const stripeSession = await stripe.billingPortal.sessions.create({
//         customer: userSubscription.stripeCustomerId,
//         return_url: settingsUrl,
//       })

//       return new NextResponse(JSON.stringify({ url: stripeSession.url }))
//     }

//     const stripeSession = await stripe.checkout.sessions.create({
//       success_url: settingsUrl,
//       cancel_url: settingsUrl,
//       payment_method_types: ['card'],
//       mode: 'subscription',
//       billing_address_collection: 'auto',
//       // customer_email: user.emailAddresses[0].emailAddress,
//       line_items: [
//         {
//           price_data: {
//             currency: 'USD',
//             product_data: {
//               name: 'Genius Pro',
//               description: 'Unlimited AI Generations',
//             },
//             unit_amount: 2000,
//             recurring: {
//               interval: 'month',
//             },
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: {
//     userId: curretnUser?.id,
//       },
//     })

//     return new NextResponse(JSON.stringify({ url: stripeSession.url }))
//   } catch (error) {
//     console.log('[STRIPE_ERROR]', error)
//     return new NextResponse('Internal Error', { status: 500 })
//   }
// }

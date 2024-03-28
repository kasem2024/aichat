// import getCurrentUser from '@/app/actions/getCurrentUser'
// import prismadb from '@/app/libs/prismadb'

// const DAY_IN_MS = 86_400_000

// export const checkSubscription = async () => {
//   const currentUser = await getCurrentUser()

//   if (!currentUser?.id) {
//     return false
//   }

//   const userSubscription = await prismadb.userSubscription.findUnique({
//     where: {
//       userId: currentUser.id,
//     },
//     select: {
//       stripeSubscriptionId: true,
//       stripeCurrentPeriodEnd: true,
//       stripeCustomerId: true,
//       stripePriceId: true,
//     },
//   })

//   if (!userSubscription) {
//     return false
//   }

//   const isValid =
//     userSubscription.stripePriceId &&
//     userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

//   return !!isValid
// }

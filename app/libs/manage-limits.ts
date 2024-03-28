import getCurrentUser from '@/app/actions/getCurrentUser'

import prismadb from './prismadb'

import { MAX_FREE_REQUEST } from '@/constant'

export const increaseUserRequest = async () => {
  const currentUser = await getCurrentUser()
  
  if (!currentUser?.id) {
    return undefined
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId:currentUser.id,
    },
  })
  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: currentUser.id },
      data: { count: userApiLimit.count + 1 },
    })
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: currentUser.id, count: 1 },
    })
  }
}

export const checkLimit = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) {
    return false
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: currentUser.id,
    },
  })

  if (!userApiLimit || userApiLimit.count < MAX_FREE_REQUEST) {
    return true
  } else {
    return false
  }
}

export const getUserCount = async () => {

  const currentUser = await getCurrentUser()
  if (!currentUser?.id) {
    return 0
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId:currentUser.id,
    },
  })
  if (!userApiLimit) {
    return 0
  }

  return userApiLimit?.count
}

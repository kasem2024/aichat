import { checkLimit, increaseUserRequest } from '@/app/libs/manage-limits'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'

import Replicate from 'replicate'

const replicate = new Replicate({
  // auth: process.env.API_TOKEN_FOR_MUSIC_VIDEO_GENERATION,
})

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await req.json()
    console.log(body)
    const { prompt } = body
    console.log(prompt)
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (!prompt) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const freeTrail = await checkLimit()

    if (!freeTrail) {
      return new NextResponse('freeTrail has expired ', { status: 403 })
    }

    const output = await replicate.run(
      'meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38',
      {
        input: {
          model_version: 'stereo-melody-large',
          prompt,
        },
      }
    )
    console.log(output)
    await increaseUserRequest()
    return NextResponse.json(output)
  } catch (error) {
    console.log('[MUSIC_ERROR', error)
    return new NextResponse('Unauthorized', { status: 401 })
  }
}

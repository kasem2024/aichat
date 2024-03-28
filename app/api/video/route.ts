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
    const freeTrial = await checkLimit()

    if (!freeTrial) {
      return new NextResponse('freeTrail has expired', { status: 403 })
    }

    const output = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          fps: 24,
          model: 'xl',
          width: 1024,
          height: 576,
          prompt,
          batch_size: 3,
          num_frames: 24,
          init_weight: 0.5,
          guidance_scale: 17.5,
          negative_prompt:
            'very blue, dust, noisy, washed out, ugly, distorted, broken',
          remove_watermark: false,
          num_inference_steps: 50,
        },
      }
    )
    console.log(output)
    await increaseUserRequest()
    return NextResponse.json(output)
  } catch (error) {
    console.log('[VIDEO_ERROR', error)
    return new NextResponse('Unauthorized', { status: 401 })
  }
}

import { checkLimit, increaseUserRequest } from '@/app/libs/manage-limits'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  // apiKey: process.env.MY_NEW_API,
  // organization: 'org-2ah7BVdA5FUjMA7qMANJ4CKk',
})

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await req.json()
    console.log(body)
    const { prompt, amount, resolution } = body
    console.log(prompt)
    console.log(amount)
    console.log(resolution)
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (!openai.apiKey) {
      return new NextResponse('OpenAi API key not configured', { status: 500 })
    }
    if (!prompt) {
      return new NextResponse('Image Details is required', { status: 400 })
    }
    if (!amount) {
      return new NextResponse('Photos Numbers is required', { status: 400 })
    }
    if (!resolution) {
      return new NextResponse('Image Resolution is required', { status: 400 })
    }
    const freeTrial = await checkLimit()

    if (!freeTrial) {
      return new NextResponse('your freeTrail has expired', { status: 403 })
    }

    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
    })
    await increaseUserRequest()
    return NextResponse.json(image.data)
  } catch (error) {
    console.log('[Image Error]', error)
    return new NextResponse('Unauthorized', { status: 401 })
  }
}

import getCurrentUser from '@/app/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

import { checkLimit, increaseUserRequest } from '@/app/libs/manage-limits'

const openai = new OpenAI({
  // apiKey: process.env.MY_NEW_API,
  // organization: 'org-2ah7BVdA5FUjMA7qMANJ4CKk',
})

const instructionMess = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets do not try to comment it keep it active. use code comment for explanation',
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await req.json()
    console.log(body)
    const { messages } = body
    console.log(messages)
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (!openai.apiKey) {
      return new NextResponse('OpenAi API key not configured', { status: 500 })
    }
    if (!messages) {
      return new NextResponse('message are required', { status: 400 })
    }

    const freeTrial = await checkLimit()

    if (!freeTrial) {
      return new NextResponse('your freeTrail has expired', { status: 403 })
    }

    const response = await openai.chat.completions.create({
      messages: [instructionMess, ...messages],
      model: 'gpt-3.5-turbo',
    })
    await increaseUserRequest()

    return NextResponse.json(response.choices[0].message.content)
  } catch (error) {
    console.log('[codeError]', error)
    return new NextResponse('Unauthorized', { status: 401 })
  }
}

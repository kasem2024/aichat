'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import HeaderCo from '@/components/HeaderCo'
import { Code, MessageSquare } from 'lucide-react'
import { BiArrowToTop } from 'react-icons/bi'
import ReactMarkdown from 'react-markdown'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import React, { useState } from 'react'

import { cn } from '@/app/libs/utils'
import UserAvatar from '@/components/UserAvatar'
import BotAvatar from '@/components/BotAvatar'
import Image from 'next/image'
import Loading from '@/components/Loading'
import { useModal } from '@/app/hooks/manage-model'
import toast from 'react-hot-toast'

type HeadingType = {
  label: string
  icon: any
  desc: string
  color: string
  bgColor: string
}

const HeadingLabel: HeadingType = {
  label: 'Code Room',
  icon: Code,
  desc: 'You may need some help, I am here for you !',
  color: 'text-green-700',
  bgColor: 'bg-green-700/10',
}

// const CodeBlock = ({ language, code }) => {
//   return (
//     <SyntaxHighlighter language={language} style={solarizedlight}>
//       {code}
//     </SyntaxHighlighter>
//   )
// }

const CodePage = () => {
  const { onOpen } = useModal()
  const router = useRouter()
  const [messages, setMessages] = useState<{ role: string; content: any }[]>([])
  // 1 Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting
  // 2 Define submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      const userMessage = {
        role: 'user',
        content: values.prompt,
      }

      const newMessages = [...messages, userMessage]

      const response = await axios.post('/api/code', {
        messages: newMessages,
      })

      const messageresponse = { role: 'system', content: response.data }

      setMessages((current) => [...current, userMessage, messageresponse])
      console.log('response', response, messages)
      form.reset()
    } catch (error: any) {
      if (error.response.status === 403) {
        onOpen()
      } else {
        toast.error('Something went wrong')
      }
      console.log(error)
    } finally {
      router.refresh()
    }
  }
  console.log(messages)
  return (
    <div>
      <HeaderCo {...HeadingLabel} />
      <div className="p-3 w-full mt-8 md:w-[80%] md:m-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex bg-gray-300 p-4 items-center justify-center gap-2 rounded-2xl">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex-1 p-2 focus-visible:ring-0 border-0 outline-none">
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="w-full focus-visible:ring-0 border-0 outline-none p-4 text-1xl "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-white hover:bg-gray-300">
                <BiArrowToTop
                  style={{ color: 'black', backgroundColor: 'white' }}
                  size={20}
                />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        <div
          className={`flex flex-col-reverse gap-y-4 relative ${
            isLoading || messages.length === 0
              ? 'justify-center items-center'
              : ''
          }`}
        >
          {messages?.length === 0 && !isLoading && (
            <div className="w-[300px] h-[400px] absolute top-10 m-auto rounded-md">
              <Image fill alt="let" src="/let.png" className="w-full h-full" />
            </div>
          )}
          {isLoading && <Loading />}
          {messages?.map((message: any, idx) => (
            <div key={idx} className="flex">
              <div>
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
              </div>
              <div
                className={cn(
                  'text-base bg-gray-700 text-zinc-50 p-4 ml-3 mr-3 shadow-md',
                  message.role === 'system'
                    ? 'bg-gray-700 text-zinc-50 rounded-md  border-x-4 border-zinc-950'
                    : 'bg-gray-900 text-zinc-50  rounded-sm border-x-4 border-gray-700'
                )}
              >
                <div>
                  {/* <div className="overflow-auto w-[900px]">
                    <CodeBlock
                      language="javascript"
                      code={`${message.content}`}
                    />
                  </div> */}

                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...prop }) => (
                        <div className="mt-8 overflow-auto py-4 mb-4 px-7 rounded-md bg-slate-800 text-neutral-50">
                          <pre {...prop} />
                        </div>
                      ),
                      code: ({ ...prop }) => (
                        <code
                          className="bg-black p-1 text-white rounded-md hover:bg-slate-400 hover:text-black  cursor-pointer transition"
                          {...prop}
                        />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* test section */}
      {/* <TestForm /> */}
    </div>
  )
}

export default CodePage

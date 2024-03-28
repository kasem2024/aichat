'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import HeaderCo from '@/components/HeaderCo'
import { Music, VideoIcon } from 'lucide-react'
import { BiArrowToTop } from 'react-icons/bi'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import React, { useState } from 'react'

import LoadingMusic from '@/components/LoadingImage'
import AudioPlayer from '@/components/Audio'
import LoadingVideo from '@/components/LoadingVideo'
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
  label: 'Video Room',
  icon: VideoIcon,
  desc: 'You may need some help, I am here for you !',
  color: 'text-orange-700',
  bgColor: 'bg-orange-700/10',
}

const VideoPage = () => {
  const { onOpen } = useModal()
  const router = useRouter()
  const [video, setVideo] = useState<{ response: string; value: string }[]>([])

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
      const response = await axios.post('/api/video', values)
      console.log(response.data)
      const newObject: { response: string; value: string } = {
        response: response.data,
        value: values.prompt,
      }
      setVideo((current) => [...current, newObject])

      console.log('response', response)
      form.reset()
    } catch (error: any) {
      if (error.response.stauts === 403) {
        onOpen()
      } else {
        toast.error('Something went wrong')
      }
      console.log(error)
    } finally {
      router.refresh()
    }
  }

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

      {/* //redner the video */}
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="w-[150px] m-auto">
            <LoadingVideo />
          </div>
        )}
        <div className=" px-6 md:px-10 lg:px-40 flex flex-col-reverse w-full justify-center  m-auto">
          {video?.map((src) => (
            <div key={src.value} className=" flex flex-col mb-3">
              <p className=" ml-6 p-2 text-slate-900 font-serif text-xl  ">
                {src.value}
              </p>
              <video controls>
                <source src={src.response} />
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoPage

'use client'

import Link from 'next/link'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import HeaderCo from '@/components/HeaderCo'
import { Download, ImageIcon, MessageSquare } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'
import React, { useState } from 'react'

import { cn } from '@/app/libs/utils'

import Image from 'next/image'

import LoadingImage from '@/components/LoadingImage'

import { Card, CardContent, CardFooter } from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { photosNumber, photosResolution } from './constants'
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
  label: 'Image Room',
  icon: ImageIcon,
  desc: 'You may need some help, I am here for you !',
  color: 'text-pink-700',
  bgColor: 'bg-pink-700/10',
}

const ImagePage = () => {
  const { onOpen } = useModal()
  const router = useRouter()
  const [images, setImages] = useState<
    {
      revised_prompt: string
      url: string
    }[]
  >([])
  // 1 Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512×512',
    },
  })

  const isLoading = form.formState.isSubmitting

  // 2 Define submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // setImages([])
      console.log(values)
      const response = await axios.post('/api/image', values)
      // const urls = response.data.map((image: { url: string }) => image.url)
      // console.log(urls)
      setImages((current) => [...current, ...response.data])
      console.log(response.data)
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

  return (
    <div className=" ">
      <HeaderCo {...HeadingLabel} />
      <div className="p-3 w-full mt-8 md:w-[80%] md:m-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" p-8 items-center bg-gray-150 text-zinc-900 rounded-2xl grid grid-cols-6 md:grid-cols-8 gap-2">
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className=" col-span-6 md:col-span-4 outline-none border border-sky-500 rounded-md">
                    <FormControl>
                      <Input
                        placeholder="Start creating your own Images and Download it"
                        {...field}
                        className="w-full  p-4 text-1xl "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1  focus-visible:ring-0  col-span-6 md:col-span-2 outline-none border border-sky-500 rounded-md">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="1 photo"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {photosNumber.map((item) => (
                          <SelectItem key={item.label} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="flex-1 col-span-6 md:col-span-2 outline-none border border-sky-500 rounded-md">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder="512*512"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {photosResolution.map((item) => (
                          <SelectItem key={item.label} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-5 py-6 text-gray-200 bg-slate-800 hover:bg-gray-500 hover:text-gray-100 col-span-4  md:col-start-6 md:col-end-8 transition shadow-lg"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className=" flex space-y-4 mt-4 justify-center items-center m-auto ">
        <div>{isLoading && <LoadingImage />}</div>
      </div>
      <div className="p-3 m-3 grid grid-cols-12 gap-3 ">
        {images.map((image) => (
          <div
            key={image.revised_prompt}
            className="col-span-6 md:col-span-4 lg-span-3 "
          >
            <Card className="bg-slate-100 flex flex-col items-center justify-center pt-6 shadow-md">
              <CardContent>
                <Image width={500} height={400} alt="img" src={image?.url} />
              </CardContent>
              <CardFooter>
                <Button
                  className=" p-6 bg-slate-200 text-gray-800 hover:bg-slate-500 hover:text-gray-200"
                  onClick={() => window.open(image.url)}
                >
                  DownLoad
                  <Download className="ml-4 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* test section */}
      {/* <TestForm /> */}
    </div>
  )
}

export default ImagePage

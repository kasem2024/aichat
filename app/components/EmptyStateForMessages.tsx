'use client'
import React from 'react'
import { Boxes } from '@/app/components/ui/background-boxes'
import { cn } from '@/app/libs/utils'

export function EmptyStateForMessages() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
      <div className="absolute inset-0 w-full h-full bg-green-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn('md:text-4xl text-xl text-white relative z-20')}>
        Messages
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        As you can see all the letest messages are listed here
      </p>
    </div>
  )
}

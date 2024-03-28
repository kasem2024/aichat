'use client'

import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from './ui/button'
import { MAX_FREE_REQUEST } from '@/constant'
import { Zap } from 'lucide-react'
import { useModal } from '@/app/hooks/manage-model'

interface TupGrade {
  counter: number
}
const Upgrade = ({ counter }: TupGrade) => {
  const { isOpen, onOpen, onClose } = useModal()
  return (
    <div className="p-2  rounded-md ">
      <div className="text-zinc-100  p-2 flex justify-between text-md">
        <p>
          {counter}/{MAX_FREE_REQUEST}
        </p>
        {5 - counter === 1 ? <p>Last Try</p> : <p>left {5 - counter}</p>}
      </div>
      <Progress value={counter * 20} />
      <button
        type="button"
        onClick={() => onOpen()}
        className=" flex justify-between w-full text-zinc-200 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-14 py-2 mt-2  rounded-lg"
      >
        Upgrad
        <Zap />
      </button>
    </div>
  )
}
export default Upgrade

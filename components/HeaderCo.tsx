import { cn } from '@/app/libs/utils'
import React from 'react'

interface InterHead {
  label: string
  icon: any
  desc: string
  color: string
  bgColor: string
}

const HeaderCo = ({ label, icon: Icon, desc, color, bgColor }: InterHead) => {
  return (
    <div className="flex p-2 gap-x-3 items-center justify-center ">
      {/* Icons display */}
      <div className="w-fit p-2 ">
        <Icon className={cn('w-8 h-8 ', bgColor, color)} />
      </div>
      {/* text Display  */}

      <div>
        <div className="text-3xl md:text-4xl font-bold  ">{label}</div>
        <div className="text-md md:text-lg text-muted-foreground  ">{desc}</div>
      </div>
    </div>
  )
}

export default HeaderCo

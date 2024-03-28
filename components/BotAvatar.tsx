import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

const BotAvatar = () => {
  return (
    <div>
      <Avatar>
        <AvatarImage src="/logo.png" alt="Ai" />
      </Avatar>
    </div>
  )
}

export default BotAvatar

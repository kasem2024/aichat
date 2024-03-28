import getCurrentUser from '@/app/actions/getCurrentUser'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserAvatar = () => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={'../public/pro.png'} />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserAvatar

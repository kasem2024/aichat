'use client'

import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Conversation, User } from '@prisma/client'

import useOtherUser from '@/app/hooks/useOtherUser'
import useActiveList from '@/app/hooks/useActiveList'

import Avatar from '@/app/components/Avatar'
import AvatarGroup from '@/app/components/AvatarGroup'
import ProfileDrawer from './ProfileDrawer'

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return isActive ? 'Active' : 'Offline'
  }, [conversation, isActive])

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      {/* animate-shimmer
      bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]
      bg-[length:200%_100%] px-6 font-medium text-slate-200 transition-colors */}
      <div
        className="
        animate-shimmer
        bg-[linear-gradient(110deg,#060606,45%,#00ff0f,55%,#060606)] bg-[length:200%_100%]  font-medium text-white
        transition-colors
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            lg:hidden 
            block 
            text-slate-100 
            hover:text-green-400 
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-md font-light text-neutral-100">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={40}
          onClick={() => setDrawerOpen(true)}
          className="
          text-slate-100
          cursor-pointer
          hover:text-green-400
          transition
        "
        />
      </div>
    </>
  )
}

export default Header

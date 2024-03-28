'use client'
import React from 'react'
import Link from 'next/Link'
import Image from 'next/Image'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from 'lucide-react'
import { cn } from '@/app/libs/utils'
import Upgrade from './Upgrade'

const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin'],
})

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/ai-services/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/ai-services/conversation',
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    href: '/ai-services/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    href: '/ai-services/video',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    href: '/ai-services/music',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    href: '/ai-services/code',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/ai-services/settings',
  },
]

interface Tsidebar {
  counter: number
}

const Sidebar = ({ counter = 0 }: Tsidebar) => {
  const pathname = usePathname()
  return (
    <div className="relative ">
      <Link
        href="/ai-services"
        className="flex px-3 py-2 justify-start items-center"
      >
        <div className="relative w-40 h-20 -ml-7">
          <Image fill alt="logo" src="/logo4.png" />
        </div>
        <div className={cn(' text-2xl text-white', montserrat.className)}>
          Wizard
        </div>
      </Link>
      <div>
        {routes.map((section) => (
          <div
            key={section.label}
            className={cn(
              'flex my-8 mx-3 p-3 items-center text-white hover:bg-gray-100  hover:text-black hover:rounded hover:border-none transition',
              pathname === section.href ? 'text-black bg-white' : null
            )}
          >
            <div className="px-4">
              <section.icon className={section.color} />
            </div>
            <div>
              <Link href={section.href}>{section.label}</Link>
            </div>
          </div>
        ))}
      </div>
      {/* <div className=" bg-black p-0 absolute bottom-[-250px] left-0  w-[90%] ml-[5%] rounded-md">
        <Upgrade counter={counter} />
      </div> */}
    </div>
  )
}
export default Sidebar

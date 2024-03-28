'use client'
import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/app/libs/utils'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/ai-services/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    bgimage: '/first.webp',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/ai-services/music',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    bgimage: '/second.webp',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/ai-services/image',
    bgimage: '/third.webp',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/ai-services/video',
    bgimage: '/fourth.webp',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/ai-services/code',
    bgimage: '/fifth.webp',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/ai-services/code',
    bgimage: '/first.webp',
  },
]

const AiServiceLanding = () => {
  const rooter = useRouter()
  return (
    <div className="flex justify-start items-center flex-col bg-zinc-900 h-fit">
      {/* the heading for dashboard page  */}
      <div className="flex flex-col justify-center items-center">
        <div className="text-md md:text-3xl font-bold text-center p-y-3 text-white">
          Explore Artificial Intelligence With US
        </div>
        <p className="text-gray-100 text-sm md:text-xl">
          Feel free to ask about any thing you would like to know or to share
          with your friends
        </p>
      </div>
      {/* this is card representation */}
      <div className="mt-9 w-full flex flex-wrap justify-center items-center">
        {tools.map((item) => (
          <Card
            onClick={() => rooter.push(item.href)}
            key={item.label}
            className=" m-3 placeholder:cursor-pointer rounded w-[500px]"
          >
            <div className="text-white px-4">
              <button>imagine</button>
              <div>text</div>
              <div>description</div>
            </div>
            <div>
              <Image width={400} height={400} src={item.bgimage} alt="image" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AiServiceLanding

//            <div className=" bg-gray-500 flex-1 p-3 flex items-center ">
//               <div
//                 className={cn(
//                   'w-8 h-8  flex justify-center items-center',
//                   item.bgColor
//                 )}
//               >
//                 {<item.icon className={item.color} />}
//               </div>
//               <div className="text-white p-3 ">{item.label}</div>
//             </div>
//             <div className="flex justify-center items-center">
//               <ArrowRight />
//             </div>

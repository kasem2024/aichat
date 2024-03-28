'use client'
import { Reorder } from 'framer-motion'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useModal } from '@/app/hooks/manage-model'
import {
  CheckSquare,
  Code,
  ImageIcon,
  LayoutDashboard,
  LayoutGrid,
  MessageCircleHeart,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
  Zap,
} from 'lucide-react'
import 'animate.css'
const routes = [
  {
    value: 0,
    label: 'Conversation',
    icon: MessageSquare,
    href: 'ai-services/conversation',
    color: 'text-violet-500',
  },
  {
    value: 1,
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    href: 'ai-services/image',
  },
  {
    value: 2,
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    href: 'ai-services/video',
  },
  {
    value: 3,
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    href: 'ai-services/music',
  },
  {
    value: 4,
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    href: 'ai-services/code',
  },
]
// import { Circle } from '@/components/Circle'
import { Badge } from '@/components/ui/badge'
import axios from 'axios'
import toast from 'react-hot-toast'

const ProModal = () => {
  const { isOpen, onClose } = useModal()
  const [items, setItems] = useState([0, 1, 2, 3, 4])
  const [loading, setLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center gap-x-4">
            Upgrade to <Badge variant="exclusive">Pro</Badge>
          </DialogTitle>
          <DialogDescription>
            <Reorder.Group values={items} onReorder={setItems}>
              {routes.map((item) => (
                <Reorder.Item key={item.value} value={item.value}>
                  <div className="flex flex-col">
                    <div className="p-3 my-2 bg-slate-900 rounded-lg flex justify-between text-lg text-zinc-50">
                      <item.icon className={item.color} />
                      {item.label}
                      <CheckSquare color="green" />
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </DialogDescription>

          <DialogTrigger
            type="button"
            disabled={loading}
            onClick={onSubscribe}
            className="outline-none flex justify-between w-full text-zinc-200 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-14 py-2 mt-2  rounded-lg border-none"
          >
            Upgrade
            <Zap color="black" />
          </DialogTrigger>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { BsRobot } from 'react-icons/bs'
import { signOut } from 'next-auth/react'
import useConversation from './useConversation'

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
      },
      {
        label: 'Aiservices',
        href: '/ai-services',
        icon: BsRobot,
        active: pathname === 'ai-services',
      },
      {
        label: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId]
  )

  return routes
}

export default useRoutes

'use client'
import { EmptyStateForMessages } from '../components/EmptyStateForMessages'
import clsx from 'clsx'

import useConversation from '../hooks/useConversation'

const Home = () => {
  const { isOpen } = useConversation()

  return (
    <div
      className={clsx('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
    >
      <EmptyStateForMessages />
    </div>
  )
}

export default Home

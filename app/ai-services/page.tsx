'use client'

import clsx from 'clsx'

import useConversation from '../hooks/useConversation'

import CrispProvider from '@/components/CrispProvider'
import AiServiceLanding from '../components/AiServiceLanding'

const Home = () => {
  const { isOpen } = useConversation()

  return (
    <div>
      <CrispProvider />
      <AiServiceLanding />
    </div>
  )
}

export default Home

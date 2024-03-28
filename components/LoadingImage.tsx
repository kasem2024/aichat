import Image from 'next/image'
import React from 'react'

const LoadingMusic = () => {
  return (
    <div>
      <Image width={150} height={150} src="/music.gif" alt="Loading..." />
    </div>
  )
}

export default LoadingMusic

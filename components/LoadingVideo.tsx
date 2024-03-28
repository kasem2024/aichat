import Image from 'next/image'
import React from 'react'

const LoadingVideo = () => {
  return (
    <div>
      <Image width={150} height={150} src="/video.gif" alt="Loading..." />
    </div>
  )
}

export default LoadingVideo

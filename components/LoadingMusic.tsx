import Image from 'next/image'
import React from 'react'

const LoadingImage = () => {
  return (
    <div>
      <Image width={150} height={150} src="/Image.gif" alt="Loading..." />
    </div>
  )
}

export default LoadingImage

import React from 'react'
import './loading.css'
import Image from 'next/image'
const Loading = () => {
  return (
    // <div className="loading">
    //   <div className="first"></div>
    //   <div className="second"></div>
    //   <div className="third"></div>
    //   <div className="fourth"></div>
    //   <div className="fifth"></div>
    // </div>
    <Image width={150} height={150} src="/animation.gif" alt="Loading..." />
  )
}

export default Loading

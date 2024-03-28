// "use client";
import React from 'react'
// import { UserButton } from '@clerk/nextjs'
import Mobileside from './Mobileside'
import { getUserCount } from '@/app/libs/manage-limits'
const Navbar = ({ counter }: { counter: number }) => {
  return (
    <nav className="flex items-center ">
      <Mobileside counter={counter} />
      <div className=" hidden p-4 w-full md:flex md:justify-start">
        <section>how are you today</section>
      </div>
    </nav>
  )
}

export default Navbar

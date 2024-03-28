'use client'

import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from './Sidebar'
// import { getUserCount } from '@/app/libs/manage-limits'
const Mobileside = ({ counter   }:{counter: number}) => {
  // this what we can descrip it as a hideration errors it make our code clean
  const [moutain, setMoutain] = useState(false)
  useEffect(() => setMoutain(true), [])
  if (!moutain) {
    return null
  }

  return (
    <div className="md:hidden px-5 ">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="w-72 bg-black" side={'left'}>
          <Sidebar counter={counter} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Mobileside

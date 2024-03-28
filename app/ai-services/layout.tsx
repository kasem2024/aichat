import { getUserCount } from '@/app/libs/manage-limits'
import React from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import MainSidebar from '../components/sidebar/MainSidebar'
import getCurrentUser from '../actions/getCurrentUser'
import ModalProvider from '@/components/ui/ModalProvider'
import Upgrade from '@/components/Upgrade'

type Tcounter = () => number
const DashbordLayout = async ({ children }: { children: React.ReactNode }) => {
  const counter = await getUserCount()
  const currentUser = await getCurrentUser()
  // counter={counter}
  return (
    <MainSidebar currentUser={currentUser}>
      <ModalProvider />
      <div className=" relative flex  ">
        {/* <div className="hidden h-screen md:flex md:flex-col fixed md:inset-y-0 md:w-72  bg-black">
          <Sidebar counter={counter} />
        </div> */}
        <main className="flex-1 ">
          <Navbar counter={counter} />
          {children}
        </main>
        <div className="hidden md:block md:fixed md:bottom-0  bg-black p-0 rounded-md">
          <Upgrade counter={counter} />
        </div>
      </div>
    </MainSidebar>
  )
}
export default DashbordLayout

//  <Sidebar>
//       <div className="h-full">
//         <UserList items={users} />
//         {children}
//       </div>
//   </Sidebar>

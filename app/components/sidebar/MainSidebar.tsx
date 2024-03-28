import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'

function MainSidebar({
  children,
  currentUser,
}: {
  children: React.ReactNode
  currentUser: any
}) {
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full ">{children}</main>
    </div>
  )
}

export default MainSidebar

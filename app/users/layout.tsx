import getCurrentUser from '../actions/getCurrentUser'
import getUsers from '../actions/getUsers'
import MainSidebar from '../components/sidebar/MainSidebar'
import UserList from './components/UserList'

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  const users = await getUsers()
  return (
    <MainSidebar currentUser={currentUser}>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </MainSidebar>
  )
}

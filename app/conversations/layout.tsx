import getConversations from '../actions/getConversations'
import getCurrentUser from '../actions/getCurrentUser'
import getUsers from '../actions/getUsers'
import MainSidebar from '../components/sidebar/MainSidebar'

import ConversationList from './components/ConversationList'

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations()
  const users = await getUsers()
  const currentUser = await getCurrentUser()
  return (
    <MainSidebar currentUser={currentUser}>
      <div className="h-full">
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
        {children}
      </div>
    </MainSidebar>
  )
}

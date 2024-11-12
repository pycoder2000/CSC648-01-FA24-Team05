import Conversation from '@/app/components/inbox/Conversation';
import { getUserId } from '@/app/lib/actions';
import apiService from '@/app/services/apiService';

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
};

export type ConversationType = {
  id: string;
  users: UserType[];
  lastMessage?: string;
  unreadCount?: number;
  lastMessageTimestamp?: string;
};

const InboxPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="mx-auto w-full px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Access Denied</h2>
        <p className="mt-4 text-gray-600">
          You need to be authenticated to view your conversations.
        </p>
      </main>
    );
  }

  let conversations: ConversationType[] = [];

  try {
    conversations = await apiService.get('/api/chat/');
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
  }

  return (
    <main className="mx-auto w-full space-y-4 px-6 pb-6">
      <h1 className="my-6 text-3xl font-bold text-gray-800">Inbox</h1>

      {conversations && conversations.length > 0 ? (
        conversations.map((conversation: ConversationType) => {
          const lastMessage = conversation.lastMessage || '';
          const unreadCount = conversation.unreadCount || 0;
          const lastMessageTimestamp = conversation.lastMessageTimestamp || '';

          return (
            <Conversation
              userId={userId}
              key={conversation.id}
              conversation={conversation}
              lastMessage={lastMessage}
              unreadCount={unreadCount}
              lastMessageTimestamp={lastMessageTimestamp}
            />
          );
        })
      ) : (
        <p className="text-gray-600">No conversations found.</p>
      )}
    </main>
  );
};

export default InboxPage;

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
};

const InboxPage = async () => {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="mx-auto w-full max-w-7xl px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Access Denied</h2>
        <p className="mt-4 text-gray-600">
          You need to be authenticated to view your conversations.
        </p>
      </main>
    );
  }

  const conversations = await apiService.get('/api/chat/');

  return (
    <main className="mx-auto max-w-7xl space-y-4 px-6 pb-6">
      <h1 className="my-6 text-3xl font-bold text-gray-800">Inbox</h1>

      {conversations.map((conversation: ConversationType) => (
        <Conversation userId={userId} key={conversation.id} conversation={conversation} />
      ))}
    </main>
  );
};

export default InboxPage;

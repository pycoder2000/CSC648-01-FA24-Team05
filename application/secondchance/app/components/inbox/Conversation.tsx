'use client';

import { ConversationType } from '@/app/inbox/page';
import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
  lastMessage: string;
  unreadCount: number;
  lastMessageTimestamp: string;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  userId,
  lastMessage,
  unreadCount,
  lastMessageTimestamp,
}) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id !== userId);
  const formattedTimestamp = new Date(lastMessageTimestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleGoToConversation = async () => {
    try {
      await apiService.post(`/api/chat/${conversation.id}/mark_read/`, {});
      router.push(`/inbox/${conversation.id}`);
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  return (
    <div
      className="flex cursor-pointer items-center space-x-4 rounded-xl border p-4 transition hover:bg-indigo-50"
      onClick={handleGoToConversation}
    >
      {otherUser?.avatar_url && (
        <div className="h-12 w-12 overflow-hidden rounded-full border">
          <Image
            src={otherUser.avatar_url}
            width={48}
            height={48}
            className="object-cover"
            alt="User Avatar"
          />
        </div>
      )}
      <div className="flex-1">
        <p className="text-lg font-semibold text-gray-800">{otherUser?.name}</p>
        <p className="truncate text-sm text-gray-500">{lastMessage}</p>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-400">{formattedTimestamp}</span>
        {unreadCount > 0 && (
          <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default Conversation;

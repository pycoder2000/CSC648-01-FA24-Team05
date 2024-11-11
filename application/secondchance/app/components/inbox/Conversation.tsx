'use client';

import { ConversationType } from '@/app/inbox/page';
import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Conversation: React.FC<ConversationProps> = ({ conversation, userId }) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id !== userId);

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
      className="flex cursor-pointer items-center space-x-4 rounded-xl border border-gray-300 p-4 transition hover:bg-gray-100"
      onClick={handleGoToConversation}
    >
      {otherUser?.avatar_url && (
        <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-300">
          <Image
            src={otherUser.avatar_url}
            width={48}
            height={48}
            className="h-full w-full object-cover"
            alt="User Avatar"
          />
        </div>
      )}
      <div className="flex-1">
        <p className="text-lg font-semibold text-gray-800">{otherUser?.name}</p>
        <p className="text-sm text-gray-600">Click to view conversation</p>
      </div>
    </div>
  );
};

export default Conversation;

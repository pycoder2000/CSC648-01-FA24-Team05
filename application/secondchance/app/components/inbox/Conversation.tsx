"use client";

import { ConversationType } from "@/app/inbox/page";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  userId,
}) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id !== userId);
  const handleGoToConversation = async () => {
    try {
      await apiService.post(`/api/chat/${conversation.id}/mark_read/`, {});
      router.push(`/inbox/${conversation.id}`);
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  return (
    <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl hover:bg-gray-100 transition">
      <p className="mb-6 text-xl">{otherUser?.name}</p>

      <p
        onClick={handleGoToConversation}
        className="text-secondchance-dark underline"
      >
        Go to conversation
      </p>
    </div>
  );
};

export default Conversation;

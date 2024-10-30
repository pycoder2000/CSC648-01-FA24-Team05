"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";

interface ContactButtonProps {
  userId: string | null;
  sellerId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ userId, sellerId }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const startConversation = async () => {
    if (userId) {
      const conversation = await apiService.get(`/api/chat/start/${sellerId}/`);

      if (conversation.conversation_id) {
        router.push(`/inbox/${conversation.conversation_id}`);
      }
    } else {
      loginModal.open();
    }
  };

  return (
    <div className="mt-4 flex gap-4 justify-center w-full">
      <button
        className="bg-green-500 text-white font-medium py-2 px-8 rounded-full hover:bg-green-700 transition"
        onClick={() => alert("Follow feature is not implemented yet!")}
      >
        Follow
      </button>

      <button
        onClick={startConversation}
        className="border border-gray-400 text-gray-600 font-medium py-2 px-8 rounded-full hover:bg-blue-600 hover:text-white transition"
      >
        Contact
      </button>
    </div>
  );
};

export default ContactButton;

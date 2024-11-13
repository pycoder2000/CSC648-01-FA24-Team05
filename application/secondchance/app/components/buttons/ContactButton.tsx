'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';

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

  const isOwnProfile = userId === sellerId;

  return (
    <div className="mt-4 flex w-full justify-center gap-4">
      <button
        className="rounded-full bg-green-500 px-8 py-2 font-medium text-white transition hover:bg-green-700"
        onClick={() => alert('Follow feature is not implemented yet!')}
      >
        Follow
      </button>

      <button
        onClick={startConversation}
        className={`rounded-full border px-8 py-2 font-medium transition ${
          isOwnProfile
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : 'border-gray-400 text-gray-600 hover:bg-blue-600 hover:text-white'
        }`}
        disabled={isOwnProfile}
      >
        Contact
      </button>
    </div>
  );
};

export default ContactButton;

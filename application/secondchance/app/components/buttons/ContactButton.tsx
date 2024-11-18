'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';

interface ContactButtonProps {
  /**
   * The ID of the currently logged-in user. Can be null if the user is not logged in.
   */
  userId: string | null;

  /**
   * The ID of the seller whose profile or item is being viewed.
   */
  sellerId: string;
}

/**
 * ContactButton Component
 *
 * A component that displays two buttons: "Follow" and "Contact".
 * - The "Follow" button is a placeholder and shows an alert when clicked.
 * - The "Contact" button allows starting a conversation with the seller.
 *
 * Props:
 * - userId: The ID of the currently logged-in user. If null, prompts the user to log in.
 * - sellerId: The ID of the seller to start a conversation with.
 *
 * Features:
 * - Prevents users from contacting themselves.
 * - Opens a login modal for unauthenticated users when they try to contact.
 * - Redirects to the conversation page if a chat is successfully initiated.
 */
const ContactButton: React.FC<ContactButtonProps> = ({ userId, sellerId }) => {
  /**
   * Hook to manage the login modal.
   */
  const loginModal = useLoginModal();

  /**
   * Router instance for navigation.
   */
  const router = useRouter();

  /**
   * Handles the process of starting a conversation with the seller.
   * - If the user is logged in, calls the API to start a conversation and redirects to the chat page.
   * - If the user is not logged in, opens the login modal.
   */
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

  /**
   * Determines if the profile being viewed belongs to the logged-in user.
   */
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

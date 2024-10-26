'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiService from "@/app/services/apiService";

interface ContactButtonProps {
    userId: string | null;
    sellerId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    sellerId
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const startConversation = async () => {
        if (userId) {
            const conversation = await apiService.get(`/api/chat/start/${sellerId}/`)

            if (conversation.conversation_id) {
                router.push(`/inbox/${conversation.conversation_id}`)
            }
        } else {
            loginModal.open();
        }
    }

    return (
        <div
            onClick={startConversation}
            className="mt-6 py-4 px-6 cursor-pointer bg-secondchance text-white rounded-xl hover:bg-secondchance-dark transition"
        >
            Contact
        </div>
    )
}

export default ContactButton;
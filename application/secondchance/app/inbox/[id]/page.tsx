"use client";

import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "@/app/inbox/page";
import { getAccessToken, getUserId } from "@/app/lib/actions";
import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";

export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  created_by: UserType;
  read?: boolean;
  read_at?: string | null;
};

const ConversationPage = ({ params }: { params: { id: string } }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [conversation, setConversation] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUserId = (await getUserId()) ?? null;
      const fetchedToken = (await getAccessToken()) ?? null;
      setUserId(fetchedUserId);
      setToken(fetchedToken);

      if (fetchedUserId && fetchedToken) {
        const conversationData = await apiService.get(
          `/api/chat/${params.id}/`
        );
        setConversation(conversationData);
        await apiService.post(`/api/chat/${params.id}/mark_read/`, {});
      }
    };

    fetchUserData();
  }, [params.id]);

  if (!userId || !token) {
    return (
      <main className="w-full mx-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }

  return (
    <main className="w-full mx-auto px-6 pb-6">
      {conversation && (
        <ConversationDetail
          token={token}
          userId={userId}
          messages={conversation.messages}
          conversation={conversation.conversation}
        />
      )}
    </main>
  );
};

export default ConversationPage;

'use client';

import ConversationDetail from '@/app/components/inbox/ConversationDetail';
import { UserType } from '@/app/inbox/page';
import { getAccessToken, getUserId } from '@/app/lib/actions';
import apiService from '@/app/services/apiService';
import { useEffect, useState } from 'react';

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
        const conversationData = await apiService.get(`/api/chat/${params.id}/`);
        setConversation(conversationData);
        await apiService.post(`/api/chat/${params.id}/mark_read/`, {});
      }
    };

    fetchUserData();
  }, [params.id]);

  if (!userId || !token) {
    return (
      <main className="mx-auto w-full px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Access Denied</h2>
        <p className="mt-4 text-gray-600">
          You need to be authenticated to view this conversation.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full px-6 pb-6">
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

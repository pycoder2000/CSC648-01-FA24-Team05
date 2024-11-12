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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUserId = (await getUserId()) ?? null;
        const fetchedToken = (await getAccessToken()) ?? null;
        setUserId(fetchedUserId);
        setToken(fetchedToken);

        if (fetchedUserId && fetchedToken) {
          const conversationData = await apiService.get(`/api/chat/${params.id}/`);
          setConversation(conversationData);
          await apiService.post(`/api/chat/${params.id}/mark_read/`, {});
        }
      } catch (err) {
        setError('Failed to load conversation. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.id]);

  if (loading) {
    return (
      <main className="mx-auto w-full px-6 py-12 text-center">
        <p className="text-gray-600">Loading conversation...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-red-500">Error</h2>
        <p className="mt-4 text-gray-600">{error}</p>
      </main>
    );
  }

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
      {conversation && conversation.messages.length > 0 ? (
        <ConversationDetail
          token={token}
          userId={userId}
          messages={conversation.messages}
          conversation={conversation.conversation}
        />
      ) : (
        <p className="text-center text-gray-500">No messages in this conversation yet.</p>
      )}
    </main>
  );
};

export default ConversationPage;

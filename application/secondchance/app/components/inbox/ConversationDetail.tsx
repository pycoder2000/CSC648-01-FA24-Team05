'use client';

import { MessageType } from '@/app/inbox/[id]/page';
import { ConversationType, UserType } from '@/app/inbox/page';
import { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import CustomButton from '../buttons/CustomButton';

interface ConversationDetailProps {
  token: string;
  userId: string;
  conversation: ConversationType;
  messages: MessageType[];
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  userId,
  token,
  messages,
  conversation,
}) => {
  const messagesDiv = useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const myUser = conversation.users?.find((user) => user.id === userId);
  const otherUser = conversation.users?.find((user) => user.id !== userId);
  const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    },
  );

  useEffect(() => {
    console.log('Connection state changed', readyState);
  }, [readyState]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === 'object' &&
      'name' in lastJsonMessage &&
      'body' in lastJsonMessage
    ) {
      const message: MessageType = {
        id: '',
        name: lastJsonMessage.name as string,
        body: lastJsonMessage.body as string,
        sent_to: otherUser as UserType,
        created_by: myUser as UserType,
        conversationId: conversation.id,
        read: false,
        read_at: null,
      };

      setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
    }

    scrollToBottom();
  }, [lastJsonMessage]);

  const sendMessage = async () => {
    sendJsonMessage({
      event: 'chat_message',
      data: {
        body: newMessage,
        name: myUser?.name,
        sent_to_id: otherUser?.id,
        conversation_id: conversation.id,
      },
    });

    setNewMessage('');
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  const scrollToBottom = () => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  };

  return (
    <>
      <div ref={messagesDiv} className="flex max-h-[400px] flex-col space-y-4 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`w-[80%] rounded-xl px-6 py-4 ${
              message.created_by.name === myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'
            }`}
          >
            <p className="font-bold text-gray-500">{message.created_by.name}</p>
            <p>{message.body}</p>
            {message.read && <p className="text-xs text-gray-400">✔️ Read</p>}
          </div>
        ))}

        {realtimeMessages.map((message, index) => (
          <div
            key={index}
            className={`w-[80%] rounded-xl px-6 py-4 ${
              message.name === myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'
            }`}
          >
            <p className="font-bold text-gray-500">{message.name}</p>
            <p>{message.body}</p>
            {message.read && <p className="text-xs text-gray-400">✔️ Read</p>}
          </div>
        ))}
      </div>

      <div className="mt-4 flex space-x-4 rounded-xl border border-gray-300 px-6 py-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-xl bg-gray-200 p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <CustomButton label="Send" onClick={sendMessage} className="w-[100px]" />
      </div>
    </>
  );
};

export default ConversationDetail;

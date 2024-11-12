'use client';

import { MessageType } from '@/app/inbox/[id]/page';
import { ConversationType, UserType } from '@/app/inbox/page';
import { useEffect, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import CustomButton from '../buttons/CustomButton';

interface ConversationDetailProps {
  token: string;
  userId: string;
  conversation: ConversationType;
  messages: MessageType[];
}

interface WebSocketMessage {
  type: string;
  name?: string;
  body?: string;
  typing?: boolean;
  conversation_id?: string;
  user_id?: string;
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
  const [isTyping, setIsTyping] = useState(false);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    },
  );

  useEffect(() => {
    if (lastJsonMessage && typeof lastJsonMessage === 'object') {
      const message = lastJsonMessage as WebSocketMessage;
      if (message.type === 'message' && message.name && message.body) {
        const newMessage: MessageType = {
          id: '',
          name: message.name,
          body: message.body,
          sent_to: otherUser as UserType,
          created_by: myUser as UserType,
          conversationId: conversation.id,
          read: false,
          read_at: new Date().toISOString(), // Use read_at for timestamp
        };
        setRealtimeMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (message.type === 'typing' && message.name === otherUser?.name) {
        setIsTyping(!!message.typing);
      } else if (message.type === 'read' && message.user_id === otherUser?.id) {
        setRealtimeMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.sent_to.id === message.user_id ? { ...msg, read: true } : msg,
          ),
        );
      }
    }
    scrollToBottom();
  }, [lastJsonMessage]);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    sendJsonMessage({
      type: 'typing',
      data: {
        name: myUser?.name,
        typing: e.target.value.length > 0,
      },
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

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

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex h-screen flex-col">
      <div ref={messagesDiv} className="flex-1 space-y-4 overflow-auto px-4 py-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`w-[80%] rounded-xl px-6 py-4 shadow ${
              message.created_by.name === myUser?.name ? 'ml-[20%] bg-blue-100' : 'bg-gray-100'
            }`}
          >
            <p className="font-bold text-gray-600">{message.created_by.name}</p>
            <p>{message.body}</p>
            <p className="text-xs text-gray-400">{formatTimestamp(message.read_at || '')}</p>
            {message.read && <p className="text-xs text-gray-400">✔️ Read</p>}
          </div>
        ))}

        {realtimeMessages.map((message, index) => (
          <div
            key={index}
            className={`w-[80%] rounded-xl px-6 py-4 shadow ${
              message.name === myUser?.name ? 'ml-[20%] bg-blue-100' : 'bg-gray-100'
            }`}
          >
            <p className="font-bold text-gray-600">{message.name}</p>
            <p>{message.body}</p>
            <p className="text-xs text-gray-400">{formatTimestamp(message.read_at || '')}</p>
            {message.read && <p className="text-xs text-gray-400">✔️ Read</p>}
          </div>
        ))}

        {isTyping && (
          <div className="text-sm italic text-gray-500">{otherUser?.name} is typing...</div>
        )}
      </div>

      <div className="flex items-center space-x-4 bg-gray-50 px-4 py-2 shadow-lg">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-2xl bg-gray-100 p-3 shadow-inner focus:outline-none"
          value={newMessage}
          onChange={handleTyping}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
        >
          <svg
            className="h-5 w-5 rotate-90 transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConversationDetail;

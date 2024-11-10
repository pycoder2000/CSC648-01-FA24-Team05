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
    console.log('Connection state changed', readyState);
  }, [readyState]);

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
          read_at: null,
        };
        setRealtimeMessages((prevMessages) => [...prevMessages, newMessage]);
      } else if (message.type === 'typing' && message.name === otherUser?.name) {
        setIsTyping(!!message.typing);
      } else if (message.type === 'read' && message.user_id === otherUser?.id) {
        // Update read status for messages as soon as the read notification is received
        setRealtimeMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.sent_to.id === message.user_id ? { ...msg, read: true } : msg
          )
        );
      }
    }
    scrollToBottom();
  }, [lastJsonMessage]);

  useEffect(() => {
    // Send a "read" event to the WebSocket when the conversation is loaded or new messages arrive
    if (realtimeMessages.length > 0) {
      sendJsonMessage({
        type: 'read',
        data: {
          conversation_id: conversation.id,
        },
      });
    }
  }, [realtimeMessages]);

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

        {isTyping && (
          <div className="text-sm italic text-gray-500">{otherUser?.name} is typing...</div>
        )}
      </div>

      <div className="mt-4 flex space-x-4 rounded-xl border border-gray-300 px-6 py-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-xl bg-gray-200 p-2"
          value={newMessage}
          onChange={handleTyping}
        />

        <CustomButton label="Send" onClick={sendMessage} className="w-[100px]" />
      </div>
    </>
  );
};

export default ConversationDetail;

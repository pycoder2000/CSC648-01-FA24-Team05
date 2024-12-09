'use client';

import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { marked } from 'marked';
import { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';

interface ChatMessage {
  type: 'message';
  body?: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string | undefined }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState('');

  const messagesDiv = useRef<HTMLDivElement | null>(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WS_HOST}/ws/chatbot/`,
    {
      share: false,
      shouldReconnect: () => true,
    },
  );

  useEffect(() => {
    if (isWaiting) {
      const interval = setInterval(() => {
        setTypingIndicator((prev) => (prev === '...' ? '.' : prev + '.'));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setTypingIndicator('');
    }
  }, [isWaiting]);

  useEffect(() => {
    if (lastJsonMessage) {
      const message = lastJsonMessage as ChatMessage;

      if (message.type === 'message' && message.body) {
        setIsWaiting(false);
        typeWriterEffect(message.body);
        scrollToBottom();
      }
    }
  }, [lastJsonMessage]);

  const typeWriterEffect = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { user: '', bot: text }]);

    let index = 0;
    const fullText = text;

    const typeLetter = () => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const lastMessageIndex = newMessages.length - 1;

        const displayText = fullText.slice(0, index + 1);

        newMessages[lastMessageIndex] = {
          ...newMessages[lastMessageIndex],
          bot: displayText,
        };

        return newMessages;
      });

      index++;
      if (index < fullText.length) {
        setTimeout(typeLetter, 25);
      }
    };

    typeLetter();
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = input;
    setMessages((prevMessages) => [...prevMessages, { user: userMessage, bot: undefined }]);
    setInput('');
    setIsWaiting(true);

    sendJsonMessage({
      message: userMessage,
    });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  };

  const formatResponse = (response: string) => {
    return marked.parse(response);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border bg-black text-sm font-medium text-white shadow-lg hover:bg-gray-700"
      >
        <FontAwesomeIcon icon={faComments} size="lg" />
      </button>

      {/* Chat Window with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, transformOrigin: 'bottom right' }}
            exit={{ opacity: 0, scale: 0, transformOrigin: 'bottom right' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-[calc(4rem+1.5rem)] right-4 flex h-[500px] w-[440px] flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
          >
            <div className="flex flex-col space-y-1.5 pb-4">
              <h2 className="text-lg font-semibold tracking-tight">EcoBuddy 🌿</h2>
            </div>

            <div className="h-[360px] overflow-y-auto pr-4" ref={messagesDiv}>
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50, transition: { duration: 0.15 } }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="mb-2"
                  >
                    {/* User Message */}
                    {msg.user && (
                      <div className="mb-2 flex items-start gap-3 text-sm text-gray-600">
                        <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full border bg-gray-100 p-1">
                          <svg
                            stroke="none"
                            fill="black"
                            viewBox="0 0 16 16"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                          </svg>
                        </span>
                        <div>
                          <p className="font-bold text-gray-700">You</p>
                          <p className="leading-relaxed">{msg.user}</p>
                        </div>
                      </div>
                    )}

                    {msg.bot && (
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full border bg-gray-100 p-1">
                          <svg
                            stroke="none"
                            fill="black"
                            viewBox="0 0 24 24"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                          </svg>
                        </span>
                        <div>
                          <p className="font-bold text-gray-700">EcoBuddy</p>
                          <div
                            className="leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: formatResponse(msg.bot || ''),
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center pt-4">
              <input
                className="flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type your message"
                value={input}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={sendMessage}
                className="ml-2 inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white hover:bg-gray-800"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;

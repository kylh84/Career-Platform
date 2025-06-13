import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaArrowRight } from 'react-icons/fa';
import chatbotLogo from '../../assets/icons/chatbotLogo.png';

interface AssistantProps {
  isFullPage?: boolean;
}

const SUGGESTIONS = ['What skills should I learn?', 'How can I improve my CV?', 'Is backend development right for me?', "I'm a tester, should I switch to Data Engineer?"];

const mockBotReply = (msg: string) => {
  if (msg.toLowerCase().includes('cv')) return 'Let me review your CV and suggest improvements!';
  if (msg.toLowerCase().includes('skill')) return 'You should focus on both technical and soft skills.';
  if (msg.toLowerCase().includes('backend')) return 'Backend development is great if you enjoy logic and data.';
  if (msg.toLowerCase().includes('tester')) return 'Data Engineer is a great career path if you enjoy data analysis and programming.';

  return 'I am here to help with your career questions!';
};

const Assistant: React.FC<AssistantProps> = ({ isFullPage = false }) => {
  const [open, setOpen] = useState(isFullPage ? true : false);
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (msg?: string) => {
    const text = msg || input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: mockBotReply(text) }]);
    }, 700);
  };

  if (!open && !isFullPage) {
    return (
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Open AI Assistant"
      >
        <img src={chatbotLogo} alt="ChatbotLogo" className="w-10 h-10 object-contain" />
      </button>
    );
  }

  const chatInterface = (
    <>
      <div className="relative">
        {!isFullPage && (
          <button onClick={() => setOpen(false)} aria-label="Close assistant" className="absolute top-3 right-3">
            <FaTimes className="text-gray-400 hover:text-gray-600 text-lg" />
          </button>
        )}
        <div className={isFullPage ? 'font-bold text-center text-xl sm:text-2xl md:text-3xl pt-4 pb-2' : 'font-semibold text-center text-3xl pt-5 pb-2'}>AI Career Copilot</div>
      </div>
      <div className={isFullPage ? 'text-center text-base sm:text-lg md:text-xl mb-2 sm:mb-4' : 'px-5 text-gray-700 text-lg text-center mb-2'}>How can I assist you today?</div>
      {messages.length === 0 && (
        <div className={isFullPage ? 'flex flex-col gap-2 sm:gap-4 px-2 sm:px-8 md:px-16 mb-4 sm:mb-8' : 'flex flex-col gap-2 px-14 mb-3'}>
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              className={
                isFullPage
                  ? 'rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-sm md:text-base border border-gray-200 hover:bg-gray-100 transition w-full text-left'
                  : 'hover:bg-gray-100 rounded-lg px-3 py-2 text-left text-sm border border-gray-200 transition-colors'
              }
              onClick={() => handleSend(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <div className={isFullPage ? 'flex-1 overflow-y-auto px-2 sm:px-8 md:px-16 max-h-[40vh] sm:max-h-[50vh]' : 'flex-1 overflow-y-auto px-5'} style={{ maxHeight: isFullPage ? undefined : 260 }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} my-1`}>
            <div
              className={
                isFullPage
                  ? `rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-sm md:text-base max-w-[90%] ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`
                  : `rounded-xl px-3 py-2 text-sm max-w-[80%] ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className={isFullPage ? 'relative flex items-center gap-2 sm:gap-4 px-2 sm:px-8 md:px-16 py-2 sm:py-4 ' : 'relative px-5 py-4 '}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          className={
            isFullPage
              ? 'flex-1 rounded-xl border border-gray-200 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-12'
              : 'flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-12'
          }
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          type="submit"
          className={
            isFullPage
              ? 'absolute right-2 sm:right-20 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-full p-2 sm:p-3 flex items-center justify-center'
              : 'absolute right-8 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-full p-2 flex items-center justify-center'
          }
          aria-label="Send message"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        >
          <FaArrowRight className={isFullPage ? 'text-white text-xl sm:text-xl' : 'text-white text-lg'} />
        </button>
      </form>
      <div className={isFullPage ? 'flex justify-center pb-4 sm:pb-6' : 'flex justify-center pb-3'}>
        <div
          className={
            isFullPage
              ? 'rounded-full border border-gray-100 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center mt-1'
              : 'rounded-full border border-gray-100 w-16 h-16 flex items-center justify-center mt-1'
          }
        >
          <img src={chatbotLogo} alt="ChatbotLogo" className={isFullPage ? 'w-20 h-20 sm:w-28 sm:h-28 object-contain' : 'w-12 h-12 object-contain'} />
        </div>
      </div>
    </>
  );

  if (isFullPage) {
    return chatInterface;
  }

  return (
    <>
      <div className="fixed bottom-6 mb-16 right-6 z-40 w-[350px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-fadeIn">{chatInterface}</div>
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setOpen(false)}
        aria-label="Close AI Assistant"
        type="button"
      >
        <FaTimes className="text-white text-2xl" />
      </button>
    </>
  );
};

export default Assistant;

// frontend/components/ChatSidebar.js
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import useStore from '../state/store';

export default function ChatSidebar({ setCode }) {
  const [prompt, setPrompt] = useState('');
  const bottomRef = useRef(null);

  const chatHistory = useStore((s) => s.chatHistory);
  const setChatHistory = useStore((s) => s.setChatHistory);
  const currentSession = useStore((s) => s.currentSession);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    if (!currentSession?._id) {
      alert('Please create or select a session first.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to continue.');
      return;
    }

    const newMessages = [...chatHistory, { from: 'user', text: prompt }];
    setChatHistory(newMessages);
    setPrompt('');

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/chat/prompt`,
        {
          prompt,
          sessionId: currentSession._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { jsx, css } = res.data;
      setChatHistory([
        ...newMessages,
        { from: 'ai', text: '✅ Component generated!' },
      ]);
      setCode({ jsx, css });
    } catch (err) {
      console.error('❌ AI request failed:', err.response?.data || err.message);
      setChatHistory([
        ...newMessages,
        { from: 'ai', text: '❌ Error generating component.' },
      ]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">AI Chat</h2>

      <div className="flex-1 overflow-y-auto border rounded bg-gray-50 p-3 space-y-3">
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-2 rounded text-sm ${
              msg.from === 'user'
                ? 'ml-auto bg-blue-500 text-white text-right'
                : 'mr-auto bg-gray-200 text-black text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Describe your component..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

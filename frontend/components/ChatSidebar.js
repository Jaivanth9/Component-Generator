import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function ChatSidebar({ setCode }) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const newMessages = [...messages, { from: 'user', text: prompt }];
    setMessages(newMessages);
    setPrompt('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/chat/prompt',
        { prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { jsx, css } = res.data;
      setMessages([...newMessages, { from: 'ai', text: '✅ Component generated!' }]);
      setCode({ jsx, css });
    } catch (err) {
      setMessages([...newMessages, { from: 'ai', text: '❌ Error generating component.' }]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2">AI Chat</h2>

      <div className="flex-1 overflow-y-auto border rounded bg-gray-50 p-3 space-y-3">
        {messages.map((msg, i) => (
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

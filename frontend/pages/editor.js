import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import ChatSidebar from '../components/ChatSidebar';
import CodePreview from '../components/CodePreview';
import SessionLoader from '../components/SessionLoader';

export default function Editor() {
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState({ jsx: '', css: '' });
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSessionSelect = (session) => {
    setCurrentSession(session);
    setCode({ jsx: session.jsx || '', css: session.css || '' });
  };

  const effectiveTheme = theme === 'system' ? systemTheme : theme;
  if (!mounted) return null;

  return (
    <div className={effectiveTheme === 'dark' ? 'dark' : ''}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-sm p-4 flex flex-col gap-4">
          <SessionLoader onSelect={handleSessionSelect} />
          <ChatSidebar setCode={setCode} currentSession={currentSession} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold mb-2">Live Component Preview</h1>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              aria-label="Toggle Theme"
            >
              {effectiveTheme === 'dark' ? '🌞 Light' : '🌙 Dark'}
            </button>
          </div>

          {/* Responsive, laptop-friendly preview size */}
          <div className="border bg-white dark:bg-gray-800 rounded shadow p-4 overflow-auto flex justify-center items-center">
            <iframe
              title="Preview"
              className="w-full max-w-3xl h-[420px] rounded bg-white dark:bg-gray-900"
              style={{ border: 'none' }}
              srcDoc={`<style>${code.css}</style>${code.jsx}`}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Generated Code</h2>
            <CodePreview code={code} />
          </div>
        </main>
      </div>
    </div>
  );
}

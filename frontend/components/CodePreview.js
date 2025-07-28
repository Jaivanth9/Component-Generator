import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function CodePreview({ code }) {
  const downloadCode = () => {
    const blob = new Blob(
      [
        `/* styles.css */\n${code.css}\n\n// component.jsx\n${code.jsx}`
      ],
      { type: 'text/plain' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'component.zip';
    a.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-lg">JSX</h3>
        <div className="rounded overflow-auto border border-gray-200 dark:border-gray-700 max-h-72">
          <SyntaxHighlighter
            language="jsx"
            style={duotoneDark}
            customStyle={{
              margin: 0,
              background: 'transparent',
              fontSize: '1rem',
              minWidth: 0,
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
            }}
          >
            {code.jsx}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-lg">CSS</h3>
        <div className="rounded overflow-auto border border-gray-200 dark:border-gray-700 max-h-72">
          <SyntaxHighlighter
            language="css"
            style={duotoneDark}
            customStyle={{
              margin: 0,
              background: 'transparent',
              fontSize: '1rem',
              minWidth: 0,
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
            }}
          >
            {code.css}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={downloadCode}
          className="bg-green-600 text-white px-5 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Download Code
        </button>
      </div>
    </div>
  );
}

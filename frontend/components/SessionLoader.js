// Placeholder for frontend/components/SessionLoader.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SessionLoader({ onSelect }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/session', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Fetched sessions:', res.data); // 👈 debug
      setSessions(res.data); // expecting this to be an array
    } catch (err) {
      console.error('Session load error:', err.response?.data || err.message);
      setSessions([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  fetchSessions();
}, []);


  const handleNewSession = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/session/create`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onSelect(res.data); // pass new session data to parent
    } catch (err) {
      alert('Could not create session');
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Sessions</h2>
        <button
          onClick={handleNewSession}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          + New
        </button>
      </div>
      {loading ? (
        <p className="text-sm text-gray-500">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-sm text-gray-500">No sessions found</p>
      ) : (
        <ul className="space-y-1">
          {sessions.map((session) => (
            <li key={session._id}>
              <button
                onClick={() => onSelect(session)}
                className="text-left w-full px-2 py-1 border rounded hover:bg-gray-100 text-sm"
              >
                {session.name || `Session ${session._id.slice(-4)}`}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

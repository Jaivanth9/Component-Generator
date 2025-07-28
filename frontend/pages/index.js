import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <h1 className="text-4xl font-bold mb-4">Component Generator Platform</h1>
      <p className="mb-6 text-lg">Build & preview AI-generated React components</p>
      <div className="space-x-4">
        <Link href="/login">
          <button className="bg-white text-blue-600 px-6 py-2 rounded font-medium hover:bg-gray-200">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-white text-purple-600 px-6 py-2 rounded font-medium hover:bg-gray-200">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}

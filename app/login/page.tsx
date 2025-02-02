"use client";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async () => {
    if (username === 'user' && password === 'password') {
      router.push('/dashboard'); // Redirect to dashboard after login
    } else {
      alert('Invalid credentials');
    }
  };

  // Prevent rendering during server-side rendering
  if (!isMounted) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          className="border p-2 mb-4 w-full"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="bg-primary text-white p-2 w-full">
          Login
        </button>
      </div>
    </div>
  );
}

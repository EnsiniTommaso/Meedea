'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import './signin.css';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/sign-in', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push('/login');
    } else {
      setErrorMessage(data.message || 'Si è verificato un errore durante la registrazione.');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <header>
        <h1>Sign In</h1>
      </header>


      <nav className="flex space-x-4 bg-white p-4 shadow-md rounded">
        <Link href="/" className="text-blue-500">Home</Link>
        <Link href="/profile" className="text-blue-500">Profilo</Link>
        <Link href="/signin" className="text-blue-500">Iscriviti</Link>
        <Link href="/login" className="text-blue-500">Accedi</Link>
        <Link href="/channel" className="text-blue-500">Canali</Link>
      </nav>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="username" className="mb-1">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="border p-2 rounded mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Scegli un username"
            required
          />

          <label htmlFor="email" className="mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border p-2 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Inserisci la tua email"
            required
          />

          <label htmlFor="password" className="mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border p-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Scegli una password"
            required
          />

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <button type="submit">Registrati</button>
        </form>

        <p className="mt-4 text-center">
          Hai già un account? <Link href="/login" className="button">Accedi qui</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;

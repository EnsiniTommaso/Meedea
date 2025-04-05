'use client'; 
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';  
import { Link } from 'react-router-dom';  
import Layout from "../../components/Layout"; 
import './SignIn.css'; 

export default function AboutUs() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (data.success) {
      navigate('/login'); //da mkodificare
    } else {
      setErrorMessage(data.message || 'Si è verificato un errore durante la registrazione.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
        <header>
          <h1>Sign In</h1>
        </header>

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
            Hai già un account? <Link to="/login" className="button">Accedi qui</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

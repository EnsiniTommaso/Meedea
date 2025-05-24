'use client';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import './SignIn.css';
import axios from '../../axios.js';

export default function AboutUs() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/sign-in', {
        username,
        password,
        email,
      });

      if (res.data.user) {
        navigate(-1);
        navigate('LogIn'); // eventualmente da modificare
        console.log(res.data);
      } else {
        setErrorMessage(res.data.message || 'Si è verificato un errore durante la registrazione.');
      }
    } catch (err) {
      setErrorMessage('Errore durante la richiesta al server.');
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
        <header>
          <h1>Sign In</h1>
        </header>

        <div className="form-container">
          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Scegli un username"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua email"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Scegli una password"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}

            <button type="submit">Registrati</button>
          </form>

          <p className="mt-4 text-center">
            Hai già un account? <Link to="../LogIn" className="button-a">Accedi qui</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
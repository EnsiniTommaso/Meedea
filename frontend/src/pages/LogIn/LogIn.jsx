'use client';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from '../../axios.js';
import './LogIn.css';
import Layout from '../../components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['id_token', 'uid']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/log-in', { email, password });
      console.log(res);

      if (res.data.id_token && res.data.uid) {
        setCookie('id_token', res.data.id_token);
        setCookie('uid', res.data.uid);
        navigate('../Profile');
      } else {
        setErrorMessage('Credenziali non valide. Riprova!');
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
          <h1>Log In</h1>
        </header>

        <div className="form-container">
          <form onSubmit={handleSubmit}>

            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua Email"
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
                placeholder="Inserisci la tua Password"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}

            <button type="submit">Accedi</button>
          </form>

          <p className="mt-4 text-center">
            Non hai un account? <Link to="../SignIn" className="button-a">Registrati qui</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

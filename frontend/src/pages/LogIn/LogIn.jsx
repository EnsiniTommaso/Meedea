'use client'; 
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';  // Usa useNavigate da react-router-dom
import Cookies from 'js-cookie'; 
import { Link } from 'react-router-dom';  // Usa Link da react-router-dom
import './login.css'; 
import Layout from '../../components/Layout';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Usa useNavigate di react-router-dom

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/log-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.id_token) {
      Cookies.set('id_token', data.id_token, { expires: 1 });
      navigate('/profile');  // Usa navigate per spostarti alla pagina profilo
    } else {
      setErrorMessage('Credenziali non valide. Riprova!');
    }
  };

  return (
    <Layout>
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
        <header>
        <h1>Log In</h1>
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
            required
          />

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <button type="submit">Accedi</button>
        </form>

        <p className="mt-4 text-center">
          Non hai un account? <Link to="/signin" className="button">Registrati qui</Link>  {/* Usa Link di react-router-dom */}
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default Login;

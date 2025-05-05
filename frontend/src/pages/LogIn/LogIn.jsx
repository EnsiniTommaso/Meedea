'use client'; 
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useCookies } from 'react-cookie'; 
import { CookiesProvider } from 'react-cookie';
import { Link } from 'react-router-dom'; 
import axios from '../../axios.js'
import './LogIn.css'; 
import Layout from '../../components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const [cookies, setCookie] = useCookies(['id_token','uid']); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('/log-in',
     { email, password }
    );
    
    console.log(res)

    if (res.data.id_token) {
      setCookie('id_token', res.data.id_token); 
    } else {
      setErrorMessage('Credenziali non valide. Riprova!');
    }

    if (res.data.uid) {
      setCookie('uid', res.data.uid); 
      navigate('../Profile'); 
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
            <label htmlFor="email" className="mb-1">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="border p-2 rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Inserisci la tua Email'
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
              placeholder='Inserisci la tua Password'
              required
            />

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

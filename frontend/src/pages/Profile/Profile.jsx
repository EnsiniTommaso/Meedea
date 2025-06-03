'use client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import './Profile.css';
import axios from '../../axios.js';
import { useCookies } from 'react-cookie';

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['id_token', 'uid'])
  const [profilo, setProfilo] = useState({
    nome: 'Not Logged In',
    email: '-',
    eta: 0,
    citta: '-',
    telefono: '-'
  });

  useEffect(() => {
    async function fetchProfile() {
      try{
        const response = await axios.post('/user', {uid:cookies.uid} , { headers:{'id_token':cookies.id_token, 'uid':cookies.uid,'Access-Control-Allow-Origin': '*',} })
        console.log('res:', response)
        setProfilo(response.data)
        
        return response
      }catch(err){console.error(err)}
    }

    fetchProfile()
  }, []);

  const handleModify = () => {
    navigate('../ModificaProfilo');
  };

  return (
    <Layout>
      <div>
        <header>
          <h1>Profilo</h1>
        </header>

        <div className="content">
          <h2>Informazioni Profilo</h2>

          <table>
            <thead>
              <tr>
                <th>Campo</th>
                <th>Valore</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Nome</strong></td>
                <td>{profilo.name}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{profilo.email}</td>
              </tr>
              <tr>
                <td><strong>Età</strong></td>
                <td>{profilo.eta}</td>
              </tr>
              <tr>
                <td><strong>Città</strong></td>
                <td>{profilo.citta}</td>
              </tr>
              <tr>
                <td><strong>Telefono</strong></td>
                <td>{profilo.telefono}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '20px' }}>
            <button onClick={handleModify} className="btn">Modifica Profilo</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

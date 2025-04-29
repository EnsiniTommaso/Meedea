'use client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [profilo, setProfilo] = useState({
    nome: 'Giovanni Rossi',
    email: 'giovanni.rossi@example.com',
    eta: 30,
    citta: 'Roma',
    telefono: '+39 123 456 789'
  });

  useEffect(() => {
    const datiSalvati = localStorage.getItem('profiloUtente');
    if (datiSalvati) {
      setProfilo(JSON.parse(datiSalvati));
    }
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
                <td>{profilo.nome}</td>
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

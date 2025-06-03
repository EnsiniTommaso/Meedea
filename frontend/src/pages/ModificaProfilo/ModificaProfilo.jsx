'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import './ModificaProfilo.css';
import axios from '../../axios.js';
import { useCookies } from 'react-cookie';
  
const ModificaProfilo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const datiSalvati = localStorage.getItem('profiloUtente');
    return JSON.parse(datiSalvati)
      
  });
  const [cookies, setCookie] = useCookies(['id_token', 'uid'])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const conferma = window.confirm("Confermi che i dati inseriti vanno bene?");
    if (conferma) {
      const response = await axios.post('/updateuser', {uid:cookies.uid, data:formData} , { headers:{'id_token':cookies.id_token, 'uid':cookies.uid,'Access-Control-Allow-Origin': '*',} })
      console.log('res:', response)
      navigate('../Profile');
    }
  };

  const handleAnnulla = () => {
    const conferma = window.confirm("Sei sicuro di voler annullare le modifiche?");
    if (conferma) {
      navigate('../Profile');
    }
  };

  const tornaIndietro = () => {
    navigate(-1);
  };

  return (
    <Layout>
         <header>
            Modifica Profilo
        </header>
      <div className="modifica-container">
        <form onSubmit={handleSubmit} className="modifica-form">
          <label>
            Nome:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Età:
            <input type="number" name="eta" value={formData.eta} onChange={handleChange} required />
          </label>
          <label>
            Città:
            <input type="text" name="citta" value={formData.citta} onChange={handleChange} required />
          </label>
          <label>
            Telefono:
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
          </label>

          <div className="bottoni">
            <button type="submit" className="btn">Salva</button>
            <button type="button" className="btn annulla" onClick={handleAnnulla}>Annulla</button>
          </div>
        </form>

        <button onClick={tornaIndietro} className="torna-indietro">← Torna indietro</button>
      </div>
    </Layout>
  );
};

export default ModificaProfilo;

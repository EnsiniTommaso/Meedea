"use client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Channel.css';
import Layout from '../../components/Layout';
import axios from '../../axios.js';

const Channel = () => {
  const navigate = useNavigate();

  const [channels, setChannels] = useState([]);
  const [cookies, setCookie] = useCookies(['id_token', 'uid'])

  useEffect(()=>{
    
    async function fetchChannels() {
      try{
      const response = await axios.get('/chantest',{headers:{'id_token':cookies.id_token, 'uid':cookies.uid,'Access-Control-Allow-Origin': '*',}})
      console.log('res:', response)
      setChannels(response.data)
      
      return response
      }catch(err){console.error(err)}
    }
    fetchChannels()
  },[])

  console.log(channels)

  const handleJoin = (channelName) => {
    const success = Math.random() > 0.2;

    if (success) {
      alert(`Iscrizione al canale "${channelName}" avvenuta correttamente!`);
      navigate('../Chat'); 
    } else{
      alert(`Iscrizione al canale "${channelName}" non avvenuta correttamente. Riprova.`);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-gray-100">
        <header>
          <h1>Canali</h1>
        </header>

        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 shadow-md rounded-lg">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">Nome Canale</th>
                <th className="border p-2">Descrizione Canale</th>
                <th className="border p-2">Azione</th>
              </tr>
            </thead>

            <tbody>
              {channels.map((channel, index) => (
                <tr key={channel.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{channel.name}</td>
                  <td className="border p-2">{channel.description}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleJoin(channel.name)}
                      className="join-button"
                    >
                      Join
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Channel;

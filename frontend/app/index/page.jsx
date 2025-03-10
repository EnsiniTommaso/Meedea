import Link from 'next/link';
import './index.css'; 

const Channel = () => {
  const channels = [
    { id: 1, name: 'Canale Tech', description: 'Questo canale offre contenuti educativi e tutorial.' },
    { id: 2, name: 'Canale Musica', description: 'Un canale per gli appassionati di musica e live performance.' },
    { id: 3, name: 'Canale Viaggi', description: 'Scopri destinazioni e culture da tutto il mondo.' }
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <header className="text-center text-3xl font-bold py-4">Benvenuto in Meedea</header>
      
      <nav className="flex justify-center space-x-4 bg-purple-600 p-4 shadow-md">
        <Link href="/" className="text-white">Home</Link>
        <Link href="/profile" className="text-white">Profilo</Link>
        <Link href="/signin" className="text-white">Iscriviti</Link>
        <Link href="/login" className="text-white">Accedi</Link>
        <Link href="/channel" className="text-blue-500">Canali</Link>
      </nav>

      <div className="max-w-3xl mx-auto mt-6 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Canali:</h2>
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
                <td className="border p-2">
                  <Link href={`/channel/${channel.id}`} className="channel-link">{channel.name}</Link>
                </td>
                <td className="border p-2">{channel.description}</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">Join</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Channel;

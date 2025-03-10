import Link from 'next/link';
import './profile.css'; 

const Profile = () => {
  return (
    <div>
      <header>
        <h1>Profilo</h1>
      </header>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/profile">Profilo</Link>
        <Link href="/signin">Iscriviti</Link>
        <Link href="/login">Accedi</Link>        
        <Link href="/channel" className="text-blue-500">Canali</Link>
      </nav>

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
              <td>Giovanni Rossi</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>giovanni.rossi@example.com</td>
            </tr>
            <tr>
              <td><strong>Età</strong></td>
              <td>30</td>
            </tr>
            <tr>
              <td><strong>Città</strong></td>
              <td>Roma</td>
            </tr>
            <tr>
              <td><strong>Telefono</strong></td>
              <td>+39 123 456 789</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '20px' }}>
          <Link href="/edit-profile" className="btn">Modifica Profilo</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;

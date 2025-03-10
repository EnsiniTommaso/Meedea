import React from "react";
import Link from "next/link";

const App = () => {
  return (
    <div className="home-page">
      
    <nav className="navbar">
      <Link href="/" className="navbar-item">Home</Link>
      <Link href="/profile" className="navbar-item">Profilo</Link>
      <Link href="/signin" className="navbar-item">Iscriviti</Link>
      <Link href="/login" className="navbar-item">Accedi</Link>
      <Link href="/channel" className="navbar-item">Canali</Link>
    </nav>


    <div className="hero-section">
      <h1 className="hero-title">Benvenuto in Meedea</h1>
    </div>

    <div className="content">
      <p className="content-text">Scopri i nostri canali, esplora e unisciti alle community che ti piacciono di più!</p>
    </div>
  </div>
);
};

export default App;

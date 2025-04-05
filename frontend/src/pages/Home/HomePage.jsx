import React from "react";
import Layout from "../../components/Layout";
import "./HomePage.css";

export default function HomePage() {
  return (
    <Layout>
      <div className="home-page">
        <div className="hero-section">
          <h1 className="hero-title">Benvenuto in Meedea</h1>
        </div>
        <div className="content">
          <p className="content-text">
          🌐​Scopri i nostri canali, esplora e unisciti alle community che ti piacciono di più!🌐​
          </p>
        </div>
      </div>
    </Layout>
  );
}

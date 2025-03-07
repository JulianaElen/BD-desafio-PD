import React from 'react';
import { Link } from "react-router-dom";

const styles = {
  container: {
    display: 'flex' as 'flex', 
    flexDirection: 'column' as 'column', 
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50px",
  },
  title: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    fontSize: '2rem',
  },
  link: {
    textDecoration: 'none',
    color: "white",
    fontSize: '1.2rem',
    margin: '10px',
    backgroundColor: "#007bff",
    padding: "10px",
    borderRadius: "5px",
  },
  linkHover: {
    color: '#0056b3',
    textDecoration: 'underline',
    backgroundColor: "#007b",
  }
};

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Parceiros ZÉ DELIVERY</h1>
      <Link to="/create" style={styles.link}>Cadastrar Parceiro</Link>
      <Link to="/see" style={styles.link}>Buscar Parceiros por id</Link>
      <Link to="/near" style={styles.link}>Buscar Parceiro mais próximo</Link>
    </div>
  );
}

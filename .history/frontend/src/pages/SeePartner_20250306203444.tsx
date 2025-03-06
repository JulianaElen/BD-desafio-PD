import React, { useState } from 'react';
import api from '../api';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50px",
  },
  title: {
    fontSize: "2rem",
    fontFamily: "Arial, sans-serif",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "20px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "20px",
  },
  partnerInfo: {
    marginTop: "20px",
  },
  partnerDetail: {
    marginBottom: "10px",
  },
};

export default function SeePartner() {
  const [partnerId, setPartnerId] = useState("");
  const [partnerData, setPartnerData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!partnerId) {
      setError("O ID é obrigatório!");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.get(`/partners/${partnerId}`);
      console.log("Resposta do servidor:", response);
      
      // Tente fazer o parse
      setPartnerData(response.data);
    } catch (err) {
      console.error("Erro ao buscar parceiro:", err);
      setError("Erro ao buscar parceiro, tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Buscar Parceiro por ID</h1>
      <input
        type="text"
        placeholder="Digite o ID do parceiro"
        value={partnerId}
        onChange={(e) => setPartnerId(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {partnerData && (
        <div style={styles.partnerInfo}>
          <h2>Dados do Parceiro</h2>
          <p style={styles.partnerDetail}><strong>ID:</strong> {partnerData.id}</p>
          <p style={styles.partnerDetail}><strong>Nome Fantasia:</strong> {partnerData.trading_name}</p>
          <p style={styles.partnerDetail}><strong>Nome do Dono:</strong> {partnerData.owner_name}</p>
          <p style={styles.partnerDetail}><strong>Documento:</strong> {partnerData.document}</p>
          <p style={styles.partnerDetail}><strong>Área de Cobertura:</strong> {JSON.stringify(partnerData.coverage_area)}</p>
          <p style={styles.partnerDetail}><strong>Endereço:</strong> {JSON.stringify(partnerData.address)}</p>
        </div>
      )}
    </div>
  );
}

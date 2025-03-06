import React, { useState } from 'react'
import api from '../api';

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
    setError(null); // Resetando erro antes de tentar novamente

    try {
      const response = await api.get(`/partners/${partnerId}`);
      setPartnerData(response.data);
    } catch (err) {
      console.error("Erro ao buscar parceiro:", err);
      setError("Erro ao buscar parceiro, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Buscar Parceiro por ID</h1>
      <input
        type="text"
        placeholder="Digite o ID do parceiro"
        value={partnerId}
        onChange={(e) => setPartnerId(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", fontSize: "1rem", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{ padding: "10px", fontSize: "1rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {partnerData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Dados do Parceiro</h2>
          <p><strong>ID:</strong> {partnerData.id}</p>
          <p><strong>Nome Fantasia:</strong> {partnerData.trading_name}</p>
          <p><strong>Nome do Dono:</strong> {partnerData.owner_name}</p>
          <p><strong>Documento:</strong> {partnerData.document}</p>
          <p><strong>Área de Cobertura:</strong> {JSON.stringify(partnerData.coverage_area)}</p>
          <p><strong>Endereço:</strong> {JSON.stringify(partnerData.address)}</p>
        </div>
      )}
    </div>
  )
}

import { useState } from "react";
import api from "../api";

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
  form: {
    display: "flex",
    flexDirection: "column" as const,
    width: "300px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
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
  buttonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default function CreatePartner() {
    const [tradingName, setTradingName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [document, setDocument] = useState("");
    const [coverageArea, setCoverageArea] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!tradingName || !ownerName || !document || !coverageArea || !address) {
        setError("Todos os campos são obrigatórios!");
        return;
      }
  
      setLoading(true);
      setError(null);
  
      try {
        const parsedCoverageArea = JSON.parse(coverageArea);
        const parsedAddress = JSON.parse(address);
  
        await api.post("/partners", {
          trading_name: tradingName,
          owner_name: ownerName,
          document,
          coverage_area: parsedCoverageArea,
          address: parsedAddress,
        });
  
        alert("Parceiro cadastrado com sucesso!");
        setTradingName("");
        setOwnerName("");
        setDocument("");
        setCoverageArea("");
        setAddress("");
      } catch (error) {
        console.error("Erro ao cadastrar parceiro", error);
        setError("Erro ao cadastrar parceiro, verifique os dados e tente novamente.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Cadastrar Parceiro</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nome Fantasia"
            value={tradingName}
            onChange={(e) => setTradingName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Nome do Dono"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Documento"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder='Área de Cobertura (JSON ex: {"type": "MultiPolygon", "coordinates": [[[...]]]} )'
            value={coverageArea}
            onChange={(e) => setCoverageArea(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder='Endereço (JSON ex: {"type": "Point", "coordinates": [lat, lon]} )'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            disabled={loading}
            style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          
        </form>
      </div>
    )
}

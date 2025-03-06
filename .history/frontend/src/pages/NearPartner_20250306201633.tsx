import { useState } from "react";
import api from "../api";

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
}

export default function NearPartner() {
  const [lat, setLat] = useState<string>(""); 
  const [lon, setLon] = useState<string>("");
  const [partner, setPartner] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);

    if (isNaN(parsedLat) || isNaN(parsedLon)) {
      setError("Por favor, insira coordenadas válidas.");
      return;
    }
    console.log("Enviando requisição com:", { lat: parsedLat, lon: parsedLon });
    try {
      const response = await api.get("/partners/nearby", {
        params: { lat: parsedLat, lon: parsedLon },
      });
      console.log(response.data); 
      setPartner(response.data);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar parceiro próximo", err);
      setError("Erro ao buscar parceiro, tente novamente.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Buscar Parceiro Próximo</h1>
      <input
        type="text"
        placeholder="Latitude"
        value={lat}
        style={styles.input}
        onChange={(e) => {
          const value = e.target.value.trim();
          if (value === "-" || value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setLat(value);
          }
        }}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={lon}
        style={styles.input}
        onChange={(e) => {
          const value = e.target.value.trim();
          if (value === "-" || value === "" || /^-?\d*\.?\d*$/.test(value)) {
            setLon(value);
          }
        }}
      />
      <button style={styles.button} onClick={handleSearch}>Buscar</button>

      {error && <p>{error}</p>}
      {partner && (
        <div>
          <h2>{partner.trading_name}</h2>
          <p>{partner.owner_name}</p>
          <p>{partner.document}</p>
        </div>
      )}
    </div>
  );
}
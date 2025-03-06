const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// configuração da conexão (modifique conforme necessario)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'ze_delivery',
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});

// Rota POST para criat um novo parceiro
app.post('/partners', (req, res) => {
  const { trading_name, owner_name, document, coverage_area, address } = req.body;

  const query = 'INSERT INTO partners (trading_name, owner_name, document, coverage_area, address) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [trading_name, owner_name, document, JSON.stringify(coverage_area), JSON.stringify(address)], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar parceiro', details: err });
    }
    res.status(201).json({ message: 'Parceiro criado com sucesso', id: result.insertId });
  });
});

// Rota GET para buscar parceiro mais próximo
app.get('/partners/nearby', (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "As coordenadas lat e lon são obrigatórias." });
  }

  const geoJson = {
    type: "Point",
    coordinates: [parseFloat(lon), parseFloat(lat)],
  };

  con.query(`
    SELECT id, trading_name, owner_name, document, coverage_area
    FROM partners
    WHERE ST_Within(
      ST_GeomFromGeoJSON(coverage_area),
      ST_GeomFromGeoJSON('${JSON.stringify(geoJson)}')
    )
  `, (err, results) => {
    if (err) {
      console.error("Erro ao buscar parceiros próximos:", err);
      return res.status(500).json({ error: "Erro ao buscar parceiros próximos." });
    }
    res.json(results);
  });
});

// Rota GET para buscar parceiro pelo ID
app.get('/partner/:id', (req, res) => {
  const partnerId = req.params.id;
  const query = 'SELECT * FROM partners WHERE id = ?';

  db.query(query, [partnerId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar parceiro', details: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Parceiro não encontrado' });
    }
    res.status(200).json(results[0]);
  });
});







// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

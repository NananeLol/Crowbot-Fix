// server.js
const http = require('http');

// Crée un petit serveur HTTP
const server = http.createServer((req, res) => {
  res.end('Bot is running'); // Réponse simple pour Render
});

// Écoute le port fourni par Render ou fallback 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Lance ton bot Discord
require('./index.js'); // adapte le chemin si nécessaire

const express = require('express');
const imaps = require('imap-simple');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const config = {
  imap: {
    user: 'financeiro@clubevip.net',
    password: 'CYRSG6vT86ZVfe',
    host: 'imap.uhserver.com',
    port: 993,
    tls: true,
    authTimeout: 3000
  }
};

async function fetchEmails() {
  try {
    const connection = await imaps.connect({ imap: config.imap });
    await connection.openBox('INBOX');

    const delay = 24 * 3600 * 1000; // 24 hours
    const yesterday = new Date(Date.now() - delay);
    const searchCriteria = ['FROM', 'noreply@tm.openai.com', 'SINCE', yesterday.toISOString().slice(0,10)];
    const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'], struct: true };

    const messages = await connection.search(searchCriteria, fetchOptions);

    const codes = [];

    messages.forEach(item => {
      const all = item.parts.find(part => part.which === 'TEXT');
      const id = item.attributes.uid;
      const idHeader = "Imap-Id: "+id+"\r\n";
      const body = idHeader + all.body;

      const codeMatch = body.match(/(?:Your ChatGPT code is|=)\s*(\d{6})/);
      const code = codeMatch ? codeMatch[1] : null;

      if (code) {
        // Extract email from headers or body if needed
        codes.push({ code });
      }
    });

    connection.end();
    return codes;
  } catch (err) {
    console.error('Error fetching emails:', err);
    return [];
  }
}

// Logging middleware similar to monitor.php
app.use(async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const date = new Date().toLocaleString('pt-BR');
  const page = req.originalUrl;
  const referer = req.get('Referer') || '';

  if (!referer) {
    return next();
  }

  let country = 'Desconhecido';
  try {
    const response = await axios.get(`http://ipinfo.io/${ip}/json`);
    country = response.data.country || 'Desconhecido';
  } catch (e) {
    // ignore errors
  }

  let logReferer = referer;
  if (referer.includes('revenda') || referer.includes('clube')) {
    logReferer += ' 🚨';
  }

  const logLine = `[${date}] IP: ${ip} | País: ${country} | Página: ${page} | Referer: ${logReferer}\n`;
  fs.appendFile('acessos.txt', logLine, err => {
    if (err) console.error('Error writing log:', err);
  });

  next();
});

// API endpoint to get codes
app.get('/api/codes', async (req, res) => {
  const codes = await fetchEmails();
  res.json(codes);
});

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});

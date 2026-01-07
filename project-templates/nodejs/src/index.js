const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || {{SERVICE_PORT}};

app.use(helmet());
app.use(cors());
app.use(express.json());

let items = [];

app.get('/', (req, res) => res.json({ status: 'healthy', service: '{{PROJECT_NAME}}', version: '1.0.0' }));
app.get('/health', (req, res) => res.json({ status: 'healthy', service: '{{PROJECT_NAME}}', version: '1.0.0' }));
app.get('/ready', (req, res) => res.json({ status: 'ready' }));

app.get('/items', (req, res) => res.json(items));
app.post('/items', (req, res) => {
  const newItem = { id: uuidv4(), ...req.body, createdAt: new Date().toISOString() };
  items.push(newItem);
  res.status(201).json(newItem);
});
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => console.log(`🚀 {{DISPLAY_NAME}} running on port ${PORT}`));
module.exports = app;

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');
const contactFile = path.join(dataDir, 'contact-submissions.json');
const projectFile = path.join(dataDir, 'project-requests.json');

function ensureDataFiles() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(contactFile)) fs.writeFileSync(contactFile, '[]', 'utf-8');
  if (!fs.existsSync(projectFile)) fs.writeFileSync(projectFile, '[]', 'utf-8');
}

ensureDataFiles();

function appendToFile(filePath, record) {
  const current = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  current.push({ id: Date.now().toString(), createdAt: new Date().toISOString(), ...record });
  fs.writeFileSync(filePath, JSON.stringify(current, null, 2), 'utf-8');
}

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  appendToFile(contactFile, { name, email, subject, message });
  return res.json({ ok: true });
});

app.post('/api/project', (req, res) => {
  const { projectName, projectType, projectDescription, budget, timeline } = req.body || {};
  if (!projectName || !projectType || !projectDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  appendToFile(projectFile, { projectName, projectType, projectDescription, budget, timeline });
  return res.json({ ok: true });
});

app.get('/api/admin/contact', (req, res) => {
  const records = JSON.parse(fs.readFileSync(contactFile, 'utf-8'));
  res.json(records);
});

app.get('/api/admin/project', (req, res) => {
  const records = JSON.parse(fs.readFileSync(projectFile, 'utf-8'));
  res.json(records);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});



const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'DevPulse API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 DevPulse Backend running on http://localhost:${PORT}`);
});

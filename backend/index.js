const express = require('express');
const cors = require('cors');
const bibleRoutes = require('./routes/bibleRoutes');
require('dotenv').config();

const app = express();
const port = 5001;
const root_url = process.env.ROOT_URL || '';
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(`${root_url}/search`, bibleRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 Log every request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

require('./routes/proxyRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth Gateway running on port ${PORT}`);
});

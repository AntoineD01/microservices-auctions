const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Bid DB connected"))
  .catch(err => console.error(err));

const bidRoutes = require('./routes/bidRoutes');
app.use('/api/bids', bidRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Bid Service running on port ${PORT}`));

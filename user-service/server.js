const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected for User Service"))
  .catch(err => console.error(err));

const authRoutes = require('./routes/authRoutes');
app.use('/api/users', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));

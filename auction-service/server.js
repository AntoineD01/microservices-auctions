const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected for Auction Service"))
.catch(err => console.error(err));

// THIS LINE IS IMPORTANT
const auctionRoutes = require('./routes/auctionRoutes');
app.use('/api/auctions', auctionRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Auction Service running on port ${PORT}`));

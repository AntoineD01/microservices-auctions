const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, default: 0 }, 
  endDate: { type: Date, required: true },
  createdBy: { type: String, required: true },
  status: { type: String, enum: ['pending', 'live', 'ended'], default: 'live' },
  winnerId: { type: String, default: null }
});

module.exports = mongoose.model('Auction', auctionSchema);

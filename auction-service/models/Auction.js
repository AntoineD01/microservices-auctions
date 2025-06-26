const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, default: 0 }, // new field
  endDate: { type: Date, required: true },
  createdBy: { type: String, required: true }, // userId or email
  status: { type: String, enum: ['pending', 'live', 'ended'], default: 'live' }, // updated
  winnerId: { type: String, default: null } // optional, already added
});

module.exports = mongoose.model('Auction', auctionSchema);

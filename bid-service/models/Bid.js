const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  user_id: String,
  auction_id: String,
  amount: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bid', bidSchema);

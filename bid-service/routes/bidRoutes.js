const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');

// POST /api/bids - place a new bid
router.post('/', async (req, res) => {
  console.log('[BidService] Received POST /api/bids:', req.body);
  const { auctionId, bidderId, amount } = req.body;

  try {
    const bid = new Bid({
      auctionId,
      bidderId,
      amount,
      timestamp: new Date()
    });

    await bid.save();
    res.status(201).json(bid);
  } catch (error) {
    console.error('[BidService] Error placing bid:', error);
    res.status(500).json({ message: 'Failed to place bid' });
  }
});


module.exports = router;

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

// GET /api/bids/auction/:auctionId - list bids for a specific auction
router.get('/auction/:auctionId', async (req, res) => {
  try {
    const { auctionId } = req.params;
    const bids = await Bid.find({ auctionId });
    res.json(bids);
  } catch (error) {
    console.error('[BidService] Error fetching bids by auction:', error);
    res.status(500).json({ message: 'Failed to fetch bids' });
  }
});

// GET /api/bids/user/:userId - list bids by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const bids = await Bid.find({ bidderId: userId });
    res.json(bids);
  } catch (error) {
    console.error('[BidService] Error fetching bids by user:', error);
    res.status(500).json({ message: 'Failed to fetch user bids' });
  }
});


module.exports = router;

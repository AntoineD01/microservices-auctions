const express = require('express');
const router = express.Router();
const Auction = require('../models/Auction');

// Create an auction
router.post('/', async (req, res) => {
  console.log('[AuctionService] POST /api/auctions - Body:', req.body);
  try {
    const auction = new Auction(req.body);
    await auction.save();
    res.status(201).json(auction);
  } catch (error) {
    console.error('[AuctionService] Error creating auction:', error);
    res.status(400).json({ message: error.message });
  }
});


// List all auctions
router.get('/', async (req, res) => {
  console.log('[AuctionService] GET /api/auctions');
  try {
    const auctions = await Auction.find().sort({ endDate: 1 });
    res.json(auctions);
  } catch (error) {
    console.error('[AuctionService] Error fetching auctions:', error);
    res.status(500).json({ message: error.message });
  }
});


// Close expired auctions and notify winners
router.post('/close-expired', async (req, res) => {
  console.log('[AuctionService] POST /api/auctions/close-expired');
  try {
    const now = new Date();
    const expiredAuctions = await Auction.find({
      endDate: { $lt: now },
      status: 'live'
    });

    const results = [];

    for (const auction of expiredAuctions) {
      const topBid = await Bid.findOne({ auctionId: auction._id })
        .sort({ amount: -1 })
        .limit(1);

      auction.status = 'closed';
      auction.winnerId = topBid ? topBid.bidderId : null;

      await auction.save();
      console.log(`[AuctionService] Closed auction ${auction._id}, winner: ${auction.winnerId}`);

      results.push({ auctionId: auction._id, winnerId: auction.winnerId });
    }

    res.json({ closed: results });
  } catch (error) {
    console.error('[AuctionService] Error closing auctions:', error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;

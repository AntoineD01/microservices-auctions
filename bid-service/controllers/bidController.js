const Bid = require('../models/Bid');

const placeBid = async (req, res) => {
  const { auctionId, bidderId, amount } = req.body;
  try {
    const bid = new Bid({ auctionId, bidderId, amount });
    await bid.save();
    res.status(201).json(bid);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBidsByAuction = async (req, res) => {
  try {
    const bids = await Bid.find({ auctionId: req.params.auctionId });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { placeBid, getBidsByAuction };

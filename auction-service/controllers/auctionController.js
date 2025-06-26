const Auction = require('../models/Auction');

exports.createAuction = async (req, res) => {
  const auction = new Auction(req.body);
  await auction.save();
  res.status(201).json(auction);
};

exports.getAllAuctions = async (req, res) => {
  const auctions = await Auction.find();
  res.json(auctions);
};

exports.getAuctionById = async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  if (!auction) return res.status(404).send('Auction not found');
  res.json(auction);
};

exports.deleteAuction = async (req, res) => {
  await Auction.findByIdAndDelete(req.params.id);
  res.send('Auction deleted');
};

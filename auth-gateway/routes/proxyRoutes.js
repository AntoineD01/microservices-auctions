const { createProxyMiddleware } = require('http-proxy-middleware');
const verifyToken = require('../middlewares/verifyToken');

module.exports = function(app) {
  // User routes (no auth)
  app.use('/users', createProxyMiddleware({
    target: process.env.USER_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      '^/users': '/api/users'
    },
    onProxyReq(proxyReq, req, res) {
      console.log(`[Proxy] ${req.method} ${req.originalUrl} -> ${process.env.USER_SERVICE}/api/users`);
    }
  }));

  // Auction routes (require auth)
  app.use('/auctions', verifyToken, createProxyMiddleware({
    target: process.env.AUCTION_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      '^/auctions': '/api/auctions'
    },
    onProxyReq(proxyReq, req, res) {
      console.log(`[Gateway] Forwarding ${req.method} ${req.originalUrl} to ${process.env.AUCTION_SERVICE}/api/auctions`);
    },
    onError(err, req, res) {
      console.error('[Gateway] Proxy error:', err);
      res.status(500).send('Proxy failed');
    }
  }));

  // Bid routes (require auth)
  app.use('/bids', verifyToken, createProxyMiddleware({
    target: process.env.BID_SERVICE,
    changeOrigin: true,
    pathRewrite: {
      '^/bids': '/api/bids',
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log('[Proxy] Forwarding /bids request to BID_SERVICE');

      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
    onError(err, req, res) {
      console.error('[Proxy Error] /bids:', err.message);
      res.status(500).send('Proxy failed');
    }
  }));

};

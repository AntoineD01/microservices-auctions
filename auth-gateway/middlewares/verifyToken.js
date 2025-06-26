const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  console.log('[verifyToken] Authorization header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[verifyToken] Missing or invalid auth header');
    return res.status(403).send('Token missing or malformed');
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[verifyToken] Token decoded:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('[verifyToken] Token verification failed:', err.message);
    res.status(401).send('Invalid token');
  }
};

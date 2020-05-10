const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ msg: 'Token does not exist' });
  }
  try {
    const decoded = jwt.verify(token, config.get('secretKey'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};

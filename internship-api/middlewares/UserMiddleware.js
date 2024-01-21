const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.replace(/"/g, '');
  if (!token) {
    return res.status(401).json({ msg: 'No token provided', status: false });
  }
  jwt.verify(token, 'internship@hackathon', (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Invalid token', status: false });
    }
    req.user = decoded;
    next();
  });
};

module.exports.verifyToken = verifyToken;

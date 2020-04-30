// This is to check token for all routes
const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
  // Check if token exists
  const token= req.header('auth-token');
  if(!token) return res.status(401).send('Access Denied');
  // Verification for token
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

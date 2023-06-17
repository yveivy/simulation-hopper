const jwt = require('jsonwebtoken')

const authenticateMiddleware = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  console.log('authenticatemiddleware being called')
  const token = req.headers.authorization || req.query.token || req.cookies.token;
  
  if (token) {
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Attach the decoded token to the request object
      req.user = decoded;
    } catch (err) {
      // Handle case when token is invalid or expired
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }

  next(); // Proceed to the next middleware or resolver
};

module.exports = authenticateMiddleware;
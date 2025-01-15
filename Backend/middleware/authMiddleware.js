import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.authToken;  // Get the token from cookies
 console.log("token",token)
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the JWT token
    const user = await User.findById(decoded.userId); // Get the user from the database

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;  // Attach the user to the request
    next();  // Call the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


export default authMiddleware;

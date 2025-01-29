// authController.js

import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  console.log("Request body for registration:", req.body);
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received:", req.body); // Log the request data

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Log the user ID and token
    console.log('Generated JWT Token:', token);
    console.log('User ID:', user._id);

    // Set the token in an HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,    
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: 'None',  // Allow cross-origin authentication
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    // Return userId and message
    console.log('Login response:', {
      message: 'Login successful',
      userId: user._id,
    });

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,  // Include userId in the response
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

export const logout = (req, res) => {
  try {
    // Clear the authToken cookie on logout
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
};

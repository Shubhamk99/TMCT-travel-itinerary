const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

class AuthController {
  async register(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already registered');
      }

      // Create new user
      const user = new User({
        email,
        password: await bcrypt.hash(password, 10)
      });

      await user.save();

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        success: true,
        data: {
          token,
          user: {
            id: user._id,
            email: user.email
          }
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: `Registration error: ${error.message}`
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user._id,
            email: user.email
          }
        }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: `Authentication error: ${error.message}`
      });
    }
  }
}

module.exports = new AuthController();

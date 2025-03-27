const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthService {
  async register(email, password) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already registered');
      }

      // Create new user
      const user = new User({
        email,
        password // Password will be hashed by mongoose pre-save hook
      });

      await user.save();
      return this.generateToken(user);
    } catch (error) {
      throw new Error(`Registration error: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      return this.generateToken(user);
    } catch (error) {
      throw new Error(`Login error: ${error.message}`);
    }
  }

  generateToken(user) {
    try {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        token,
        user: {
          id: user._id,
          email: user.email
        }
      };
    } catch (error) {
      throw new Error(`Token generation error: ${error.message}`);
    }
  }

  async validateToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error(`Token validation error: ${error.message}`);
    }
  }
}

module.exports = new AuthService();

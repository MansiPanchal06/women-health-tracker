// server/controllers/authController.js
// Business logic for register and login

import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// ================================
// REGISTER
// POST /api/auth/register
// ================================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if all fields provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // 3. Hash the password
    // bcrypt.hash(password, saltRounds)
    // saltRounds = 10 means hash is computed 2^10 = 1024 times
    // More rounds = more secure but slower
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 5. Send response with token
    if (user) {
      res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        }
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ================================
// LOGIN
// POST /api/auth/login
// ================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if fields provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 3. Compare password with hashed password
    // bcrypt.compare(plainText, hashedPassword)
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // 4. Send response with token
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ================================
// GET PROFILE
// GET /api/auth/profile
// ================================
const getUserProfile = async (req, res) => {
  try {
    // req.user is set by our protect middleware
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export { registerUser, loginUser, getUserProfile };
// ================================
// UPDATE PROFILE
// PUT /api/auth/profile/update
// ================================
export const updateProfile = async (req, res) => {
  try {
    const { name, dateOfBirth, cycleLength, periodLength } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (cycleLength) user.cycleLength = cycleLength;
    if (periodLength) user.periodLength = periodLength;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        dateOfBirth: updatedUser.dateOfBirth,
        cycleLength: updatedUser.cycleLength,
        periodLength: updatedUser.periodLength,
        role: updatedUser.role
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ================================
// CHANGE PASSWORD
// PUT /api/auth/password/change
// ================================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Both current and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    const user = await User.findById(req.user._id);

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully!'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
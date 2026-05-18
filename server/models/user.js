// server/models/User.js
// This defines what a USER looks like in our database

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,          // removes extra spaces
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    },

    // Email - must be unique (no two users same email)
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,        // no duplicate emails
      lowercase: true,     // always store as lowercase
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email'
      ]
    },

    // Password - will be hashed before saving
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },

    // User role - regular user or admin
    role: {
      type: String,
      enum: ['user', 'admin'],  // only these two values allowed
      default: 'user'
    },

    // Profile information
    dateOfBirth: {
      type: Date,
      default: null
    },

    // Average cycle length (default 28 days)
    cycleLength: {
      type: Number,
      default: 28,
      min: 21,
      max: 35
    },

    // Average period duration (default 5 days)
    periodLength: {
      type: Number,
      default: 5,
      min: 2,
      max: 10
    },

    // Profile picture URL
    avatar: {
      type: String,
      default: ''
    },

    // Is account active?
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    // createdAt and updatedAt added automatically
    timestamps: true
  }
);

// Create model from schema
// 'User' → collection name will be 'users' in MongoDB
const User = mongoose.model('User', userSchema);

export default User;
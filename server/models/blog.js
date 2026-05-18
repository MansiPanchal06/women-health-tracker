// server/models/Blog.js
// Health blogs written by admin

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    // Blog title
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200
    },

    // Blog content
    content: {
      type: String,
      required: [true, 'Content is required']
    },

    // Short description
    excerpt: {
      type: String,
      maxlength: 300
    },

    // Who wrote this blog (must be admin)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // Blog category
    category: {
      type: String,
      enum: [
        'period', 'nutrition', 'mental-health',
        'fitness', 'hormones', 'general'
      ],
      default: 'general'
    },

    // Cover image URL
    coverImage: {
      type: String,
      default: ''
    },

    // Tags for searching
    tags: [String],

    // Published or draft
    isPublished: {
      type: Boolean,
      default: true
    },

    // View count
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
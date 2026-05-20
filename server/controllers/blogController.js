import Blog from '../models/blog.js';

// ================================
// CREATE BLOG (Admin only)
// POST /api/blog/create
// ================================
export const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, coverImage, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt: excerpt || content.substring(0, 200),
      author: req.user._id,
      category: category || 'general',
      coverImage: coverImage || '',
      tags: tags || [],
      isPublished: true
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully!',
      data: blog
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
// GET ALL BLOGS
// GET /api/blog/all
// ================================
export const getAllBlogs = async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = { isPublished: true };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
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
// GET SINGLE BLOG
// GET /api/blog/:id
// ================================
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      data: blog
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
// DELETE BLOG (Admin only)
// DELETE /api/blog/:id
// ================================
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
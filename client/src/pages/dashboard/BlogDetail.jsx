import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { getBlogById } from '../../services/blogService';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data.data);
      } catch (err) {
        console.error('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-green-500 text-xl">Loading... 📖</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-green-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Blog not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Back Button */}
        <button
          onClick={() => navigate('/blogs')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition"
        >
          ← Back to Blogs
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Cover Image */}
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-8">
            {/* Category & Views */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full capitalize font-medium">
                {blog.category}
              </span>
              <span className="text-sm text-gray-400">
                👁️ {blog.views} views
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {blog.title}
            </h1>

            {/* Author & Date */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">
                  {blog.author?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {blog.author?.name}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-6">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-sm max-w-none">
              {blog.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p
                    key={index}
                    className={`mb-3 ${
                      paragraph.startsWith('#') ||
                      paragraph.match(/^\d\./) ||
                      paragraph.toUpperCase() === paragraph && paragraph.length > 3
                        ? 'font-bold text-gray-800 text-base mt-5'
                        : 'text-gray-600 leading-relaxed'
                    }`}
                  >
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
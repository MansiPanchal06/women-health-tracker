import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { getAllBlogs } from '../../services/blogService';

const categories = [
  { value: 'all', label: '🌸 All' },
  { value: 'period', label: '🩸 Period' },
  { value: 'nutrition', label: '🥗 Nutrition' },
  { value: 'mental-health', label: '🧠 Mental Health' },
  { value: 'fitness', label: '💪 Fitness' },
  { value: 'hormones', label: '⚗️ Hormones' },
  { value: 'general', label: '📖 General' },
];

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [activeCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs(activeCategory, search);
      setBlogs(data.data || []);
    } catch (err) {
      console.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            📖 Health Blogs
          </h1>
          <p className="text-gray-500 mt-2">
            Expert advice for your health journey
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 bg-white"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-xl transition"
          >
            Search
          </button>
        </form>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat.value
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-green-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-green-500 text-xl">Loading blogs... 📖</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-500 text-lg">No blogs found</p>
            <p className="text-gray-400 text-sm mt-2">
              Run the seed command to add sample blogs!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blogs/${blog._id}`)}
                className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition duration-200"
              >
                {/* Cover Image */}
                {blog.coverImage && (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-5">
                  {/* Category Badge */}
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full capitalize font-medium">
                    {blog.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-800 mt-3 mb-2 line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-sm line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                    <span className="text-xs text-gray-400">
                      By {blog.author?.name || 'Admin'}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">
                        👁️ {blog.views}
                      </span>
                      <span className="text-xs text-green-500 font-medium">
                        Read more →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
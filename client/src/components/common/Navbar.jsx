import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
  { path: '/dashboard', label: '🏠 Dashboard' },
  { path: '/period', label: '🩸 Period' },
  { path: '/mood', label: '😊 Mood' },
  { path: '/water', label: '💧 Water' },
  { path: '/blogs', label: '📖 Blogs' },
  { path: '/profile', label: '👤 Profile' },
];

  return (
    <nav className="bg-white shadow-sm border-b border-pink-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold text-pink-500">
            🌸 HealthTracker
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  location.pathname === link.path
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden md:block">
              Hi, {user?.name?.split(' ')[0]}! 👋
            </span>
            <button
              onClick={handleLogout}
              className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
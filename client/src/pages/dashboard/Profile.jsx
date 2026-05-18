import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import { updateProfile, changePassword } from '../../services/profileService';

const Profile = () => {
  const { user, login } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    dateOfBirth: user?.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split('T')[0]
      : '',
    cycleLength: user?.cycleLength || 28,
    periodLength: user?.periodLength || 5,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await updateProfile(profileData);
      if (data.success) {
        setSuccess('Profile updated successfully! 🌸');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setError('New passwords do not match!');
    }

    if (passwordData.newPassword.length < 6) {
      return setError('Password must be at least 6 characters!');
    }

    setLoading(true);

    try {
      const data = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (data.success) {
        setSuccess('Password changed successfully! 🔐');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-pink-500">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.name}
              </h1>
              <p className="text-gray-500">{user?.email}</p>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                user?.role === 'admin'
                  ? 'bg-purple-100 text-purple-600'
                  : 'bg-pink-100 text-pink-600'
              }`}>
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['profile', 'password', 'cycle'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setError('');
                setSuccess('');
              }}
              className={`px-5 py-2 rounded-xl font-medium capitalize transition ${
                activeTab === tab
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-pink-50'
              }`}
            >
              {tab === 'profile' ? '👤 Profile' :
               tab === 'password' ? '🔐 Password' :
               '🔄 Cycle Settings'}
            </button>
          ))}
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-4">
            {success}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Update Profile
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({
                    ...profileData, name: e.target.value
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({
                    ...profileData, dateOfBirth: e.target.value
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (cannot be changed)
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Profile 🌸'}
              </button>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData, currentPassword: e.target.value
                  })}
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData, newPassword: e.target.value
                  })}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData, confirmPassword: e.target.value
                  })}
                  placeholder="Repeat new password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                {loading ? 'Changing...' : 'Change Password 🔐'}
              </button>
            </form>
          </div>
        )}

        {/* Cycle Settings Tab */}
        {activeTab === 'cycle' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Cycle Settings
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              These settings improve your period predictions
            </p>

            <form onSubmit={handleProfileUpdate} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Cycle Length: {profileData.cycleLength} days
                </label>
                <input
                  type="range"
                  min="21"
                  max="35"
                  value={profileData.cycleLength}
                  onChange={(e) => setProfileData({
                    ...profileData, cycleLength: Number(e.target.value)
                  })}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>21 days (short)</span>
                  <span>28 days (average)</span>
                  <span>35 days (long)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Period Length: {profileData.periodLength} days
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={profileData.periodLength}
                  onChange={(e) => setProfileData({
                    ...profileData, periodLength: Number(e.target.value)
                  })}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>2 days (short)</span>
                  <span>5 days (average)</span>
                  <span>10 days (long)</span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-pink-500">
                    {profileData.cycleLength}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Cycle Length (days)</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-500">
                    {profileData.periodLength}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Period Length (days)</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Cycle Settings 🔄'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
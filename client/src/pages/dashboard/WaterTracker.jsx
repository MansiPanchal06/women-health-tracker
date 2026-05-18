import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import {
  addWater, getTodayWater,
  getWaterHistory, resetTodayWater
} from '../../services/waterService';

const WaterTracker = () => {
  const [todayWater, setTodayWater] = useState({ amount: 0, goal: 2000, logs: [] });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const quickAmounts = [150, 250, 350, 500];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [todayData, historyData] = await Promise.all([
        getTodayWater(),
        getWaterHistory()
      ]);
      setTodayWater(todayData.data || { amount: 0, goal: 2000, logs: [] });
      setHistory(historyData.data || []);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddWater = async (amount) => {
    try {
      setError('');
      await addWater({ amount: Number(amount), goal: todayWater.goal });
      setSuccess(`${amount}ml added! 💧`);
      setCustomAmount('');
      fetchData();
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Failed to add water');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset today\'s water intake?')) {
      try {
        await resetTodayWater();
        fetchData();
      } catch (err) {
        setError('Failed to reset');
      }
    }
  };

  const progressPercent = Math.min(
    (todayWater.amount / todayWater.goal) * 100, 100
  ).toFixed(0);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-blue-500 text-xl">Loading... 💧</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">💧 Water Tracker</h1>
            <p className="text-gray-500 text-sm mt-1">Stay hydrated every day!</p>
          </div>
          <button
            onClick={handleReset}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded-xl transition text-sm"
          >
            Reset Today
          </button>
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

        {/* Today's Progress */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Today's Progress
          </h2>

          {/* Water Glass Visual */}
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-24 h-36 border-4 border-blue-300 rounded-b-2xl overflow-hidden bg-blue-50">
              <div
                className="absolute bottom-0 left-0 right-0 bg-blue-400 transition-all duration-500"
                style={{ height: `${progressPercent}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-sm drop-shadow">
                  {progressPercent}%
                </span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-4xl font-bold text-blue-600">
                {todayWater.amount}
                <span className="text-lg text-gray-400 font-normal">ml</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                of {todayWater.goal}ml daily goal
              </p>

              {/* Progress Bar */}
              <div className="mt-3 bg-blue-100 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {todayWater.goal - todayWater.amount > 0
                  ? `${todayWater.goal - todayWater.amount}ml more to reach goal`
                  : '🎉 Daily goal reached!'}
              </p>
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Quick Add:
            </p>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAddWater(amount)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-3 rounded-xl transition text-center"
                >
                  <p className="text-lg">💧</p>
                  <p className="text-sm">{amount}ml</p>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="flex gap-3">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Custom amount (ml)"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={() => customAmount && handleAddWater(customAmount)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-xl transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Today's Logs */}
        {todayWater.logs && todayWater.logs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Today's Logs
            </h2>
            <div className="space-y-2">
              {todayWater.logs.map((log, index) => (
                <div key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span>💧</span>
                    <span className="text-blue-600 font-medium">{log.amount}ml</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(log.time).toLocaleTimeString('en-IN', {
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7 Day History */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📅 Last 7 Days
            </h2>
            <div className="space-y-3">
              {history.map((day) => (
                <div key={day._id} className="flex items-center gap-4">
                  <p className="text-sm text-gray-500 w-20">
                    {formatDate(day.date)}
                  </p>
                  <div className="flex-1 bg-blue-50 rounded-full h-4">
                    <div
                      className="bg-blue-400 h-4 rounded-full"
                      style={{
                        width: `${Math.min((day.amount / day.goal) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <p className="text-sm font-medium text-blue-600 w-16 text-right">
                    {day.amount}ml
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterTracker;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import { getPredictions } from '../../services/periodService';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await getPredictions();
        setPredictions(data.data);
      } catch (err) {
        console.log('No predictions yet');
      }
    };
    fetchPredictions();
  }, []);

  const cards = [
    {
      emoji: '🩸',
      title: 'Period Tracker',
      desc: predictions
        ? `Next period in ${predictions.daysUntilNextPeriod} days`
        : 'Track your cycle',
      bg: 'bg-pink-50',
      color: 'text-pink-600',
      path: '/period'
    },
    {
      emoji: '😊',
      title: 'Mood Tracker',
      desc: 'Log your daily mood',
      bg: 'bg-purple-50',
      color: 'text-purple-600',
      path: '/mood'
    },
    {
      emoji: '💧',
      title: 'Water Intake',
      desc: 'Track daily hydration',
      bg: 'bg-blue-50',
      color: 'text-blue-600',
      path: '/water'
    },
    {
      emoji: '📖',
      title: 'Health Blogs',
      desc: 'Read health articles',
      bg: 'bg-green-50',
      color: 'text-green-600',
      path: '/blogs'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Welcome */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Good day, {user?.name?.split(' ')[0]}! 🌸
          </h1>
          <p className="text-gray-500 mt-1">
            Here's your health summary for today
          </p>

          {/* Prediction Banner */}
          {predictions && (
            <div className="mt-4 bg-pink-50 border border-pink-100 rounded-xl p-4">
              <p className="text-pink-600 font-medium">
                🔮 Your next period is expected in{' '}
                <span className="font-bold">
                  {predictions.daysUntilNextPeriod} days
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.path}
              onClick={() => navigate(card.path)}
              className={`${card.bg} rounded-2xl p-6 cursor-pointer hover:shadow-md transition duration-200`}
            >
              <p className="text-4xl mb-3">{card.emoji}</p>
              <h3 className={`font-bold text-lg ${card.color}`}>
                {card.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
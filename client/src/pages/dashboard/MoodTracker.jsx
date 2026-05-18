import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import {
  addMood, getMoods,
  getMoodAnalytics, deleteMood
} from '../../services/moodService';

const moodOptions = [
  { value: 'happy', emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-600' },
  { value: 'sad', emoji: '😢', label: 'Sad', color: 'bg-blue-100 text-blue-600' },
  { value: 'anxious', emoji: '😰', label: 'Anxious', color: 'bg-orange-100 text-orange-600' },
  { value: 'calm', emoji: '😌', label: 'Calm', color: 'bg-green-100 text-green-600' },
  { value: 'irritable', emoji: '😤', label: 'Irritable', color: 'bg-red-100 text-red-600' },
  { value: 'energetic', emoji: '⚡', label: 'Energetic', color: 'bg-purple-100 text-purple-600' },
  { value: 'tired', emoji: '😴', label: 'Tired', color: 'bg-gray-100 text-gray-600' },
  { value: 'emotional', emoji: '🥺', label: 'Emotional', color: 'bg-pink-100 text-pink-600' },
];

const symptomOptions = [
  'cramps', 'headache', 'bloating', 'backache',
  'nausea', 'fatigue', 'acne', 'insomnia', 'appetite_changes'
];

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    mood: '',
    date: new Date().toISOString().split('T')[0],
    energyLevel: 5,
    stressLevel: 5,
    symptoms: [],
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [moodsData, analyticsData] = await Promise.all([
        getMoods(),
        getMoodAnalytics()
      ]);
      setMoods(moodsData.data || []);
      setAnalytics(analyticsData.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mood) {
      return setError('Please select a mood!');
    }
    setError('');
    try {
      await addMood(formData);
      setSuccess('Mood logged successfully! 😊');
      setShowForm(false);
      setFormData({
        mood: '',
        date: new Date().toISOString().split('T')[0],
        energyLevel: 5,
        stressLevel: 5,
        symptoms: [],
        notes: ''
      });
      fetchData();
    } catch (err) {
      setError('Failed to log mood');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMood(id);
      fetchData();
    } catch (err) {
      setError('Failed to delete');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const getMoodEmoji = (moodValue) => {
    return moodOptions.find(m => m.value === moodValue)?.emoji || '😊';
  };

  const getMoodColor = (moodValue) => {
    return moodOptions.find(m => m.value === moodValue)?.color || 'bg-gray-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-purple-500 text-xl">Loading... 😊</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">😊 Mood Tracker</h1>
            <p className="text-gray-500 text-sm mt-1">Track your daily emotions</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-5 py-2 rounded-xl transition"
          >
            {showForm ? 'Cancel' : '+ Log Mood'}
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

        {/* Analytics */}
        {analytics && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📊 Mood Analytics
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Most Common</p>
                <p className="text-3xl">
                  {getMoodEmoji(analytics.mostCommonMood)}
                </p>
                <p className="text-sm font-medium text-purple-600 capitalize mt-1">
                  {analytics.mostCommonMood}
                </p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Avg Energy</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {analytics.averageEnergy}
                </p>
                <p className="text-xs text-gray-400">out of 10</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Avg Stress</p>
                <p className="text-3xl font-bold text-red-500">
                  {analytics.averageStress}
                </p>
                <p className="text-xs text-gray-400">out of 10</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Mood Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              How are you feeling?
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Mood *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {moodOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({...formData, mood: option.value})}
                      className={`p-3 rounded-xl text-center transition border-2 ${
                        formData.mood === option.value
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-transparent bg-gray-50 hover:bg-purple-50'
                      }`}
                    >
                      <p className="text-2xl">{option.emoji}</p>
                      <p className="text-xs text-gray-600 mt-1">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Energy Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Energy Level: {formData.energyLevel}/10
                </label>
                <input
                  type="range" min="1" max="10"
                  value={formData.energyLevel}
                  onChange={(e) => setFormData({...formData, energyLevel: Number(e.target.value)})}
                  className="w-full accent-yellow-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>😴 Low</span>
                  <span>⚡ High</span>
                </div>
              </div>

              {/* Stress Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stress Level: {formData.stressLevel}/10
                </label>
                <input
                  type="range" min="1" max="10"
                  value={formData.stressLevel}
                  onChange={(e) => setFormData({...formData, stressLevel: Number(e.target.value)})}
                  className="w-full accent-red-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>😌 Calm</span>
                  <span>😰 Stressed</span>
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {symptomOptions.map((symptom) => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition ${
                        formData.symptoms.includes(symptom)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                      }`}
                    >
                      {symptom.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="How was your day?"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition"
              >
                Save Mood 😊
              </button>
            </form>
          </div>
        )}

        {/* Mood History */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📅 Mood History
          </h2>
          {moods.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">😊</p>
              <p className="text-gray-500">No mood logs yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {moods.map((log) => (
                <div key={log._id}
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getMoodEmoji(log.mood)}</span>
                    <div>
                      <p className={`text-sm font-medium px-2 py-0.5 rounded-full capitalize inline-block ${getMoodColor(log.mood)}`}>
                        {log.mood}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(log.date)} • Energy: {log.energyLevel}/10 • Stress: {log.stressLevel}/10
                      </p>
                      {log.symptoms.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {log.symptoms.map(s => (
                            <span key={s} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full capitalize">
                              {s.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(log._id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
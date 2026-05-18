import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import {
  addPeriod,
  getPeriods,
  getPredictions,
  deletePeriod
} from '../../services/periodService';

const PeriodTracker = () => {
  const [periods, setPeriods] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    flow: 'medium',
    painLevel: 0,
    symptoms: [],
    notes: ''
  });

  const symptomOptions = [
    'cramps', 'headache', 'bloating',
    'backache', 'nausea', 'fatigue',
    'moodSwings', 'breastTenderness'
  ];

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [periodsData, predictionsData] = await Promise.all([
        getPeriods(),
        getPredictions()
      ]);
      setPeriods(periodsData.data || []);
      setPredictions(predictionsData.data);
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
    setError('');
    setSuccess('');
    try {
      await addPeriod(formData);
      setSuccess('Period logged successfully! 🌸');
      setShowForm(false);
      setFormData({
        startDate: '',
        endDate: '',
        flow: 'medium',
        painLevel: 0,
        symptoms: [],
        notes: ''
      });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to log period');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this period log?')) {
      try {
        await deletePeriod(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-pink-500 text-xl">Loading... 🌸</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🩸 Period Tracker</h1>
            <p className="text-gray-500 text-sm mt-1">Track your menstrual cycle</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-2 rounded-xl transition"
          >
            {showForm ? 'Cancel' : '+ Log Period'}
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

        {/* Add Period Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Log New Period</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400"
                  />
                </div>
              </div>

              {/* Flow */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flow Intensity
                </label>
                <div className="flex gap-3">
                  {['light', 'medium', 'heavy', 'spotting'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormData({...formData, flow: f})}
                      className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                        formData.flow === f
                          ? 'bg-pink-500 text-white'
                          : 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pain Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pain Level: {formData.painLevel}/10
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.painLevel}
                  onChange={(e) => setFormData({...formData, painLevel: Number(e.target.value)})}
                  className="w-full accent-pink-500"
                />
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms
                </label>
                <div className="flex flex-wrap gap-2">
                  {symptomOptions.map((symptom) => (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition ${
                        formData.symptoms.includes(symptom)
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-pink-50'
                      }`}
                    >
                      {symptom}
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
                  placeholder="Any additional notes..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition"
              >
                Save Period Log 🌸
              </button>
            </form>
          </div>
        )}

        {/* Predictions Card */}
       {predictions && (
  <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      🔮 Predictions
    </h2>

    {/* Current Phase Banner */}
    <div className={`rounded-xl p-4 mb-4 ${
      predictions.currentPhase === 'menstrual' ? 'bg-red-50 text-red-600' :
      predictions.currentPhase === 'follicular' ? 'bg-yellow-50 text-yellow-600' :
      predictions.currentPhase === 'ovulation' ? 'bg-green-50 text-green-600' :
      'bg-purple-50 text-purple-600'
    }`}>
      <p className="font-semibold capitalize">
        {predictions.currentPhase} Phase
      </p>
      <p className="text-sm mt-1">{predictions.phaseDescription}</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-pink-50 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500 mb-1">Next Period</p>
        <p className="font-bold text-pink-600 text-sm">
          {formatDate(predictions.nextPeriodDate)}
        </p>
      </div>
      <div className="bg-purple-50 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500 mb-1">Days Until</p>
        <p className="font-bold text-purple-600 text-2xl">
          {predictions.daysUntilNextPeriod}
        </p>
      </div>
      <div className="bg-orange-50 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500 mb-1">Ovulation</p>
        <p className="font-bold text-orange-600 text-sm">
          {formatDate(predictions.ovulationDate)}
        </p>
      </div>
      <div className="bg-green-50 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500 mb-1">Cycle Length</p>
        <p className="font-bold text-green-600 text-2xl">
          {predictions.cycleLength}
        </p>
        <p className="text-xs text-gray-400">days avg</p>
      </div>
    </div>

    <div className="mt-4 bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-500">
        🌸 Fertile Window: {formatDate(predictions.fertileWindow.start)} 
        → {formatDate(predictions.fertileWindow.end)}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Based on {predictions.periodsAnalyzed} period(s) logged
      </p>
    </div>
  </div>
)}

        {/* Period History */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📅 Cycle History
          </h2>

          {periods.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">🩸</p>
              <p className="text-gray-500">No periods logged yet</p>
              <p className="text-gray-400 text-sm">Click "Log Period" to start tracking</p>
            </div>
          ) : (
            <div className="space-y-3">
              {periods.map((period) => (
                <div
                  key={period._id}
                  className="flex items-center justify-between p-4 bg-pink-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {formatDate(period.startDate)}
                      {period.endDate && ` → ${formatDate(period.endDate)}`}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full capitalize">
                        {period.flow} flow
                      </span>
                      {period.duration && (
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                          {period.duration} days
                        </span>
                      )}
                      {period.painLevel > 0 && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          Pain: {period.painLevel}/10
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(period._id)}
                    className="text-red-400 hover:text-red-600 text-sm transition"
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

export default PeriodTracker;
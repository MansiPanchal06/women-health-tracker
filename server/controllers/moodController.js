import Mood from '../models/mood.js';

// ================================
// ADD MOOD LOG
// POST /api/mood/add
// ================================
export const addMood = async (req, res) => {
  try {
    const { mood, date, energyLevel, stressLevel, symptoms, notes } = req.body;

    if (!mood) {
      return res.status(400).json({
        success: false,
        message: 'Mood is required'
      });
    }

    const moodLog = await Mood.create({
      user: req.user._id,
      mood,
      date: date || new Date(),
      energyLevel: energyLevel || 5,
      stressLevel: stressLevel || 5,
      symptoms: symptoms || [],
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Mood logged successfully!',
      data: moodLog
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
// GET ALL MOODS
// GET /api/mood/all
// ================================
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(30); // last 30 days

    res.status(200).json({
      success: true,
      count: moods.length,
      data: moods
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
// GET MOOD ANALYTICS
// GET /api/mood/analytics
// ================================
export const getMoodAnalytics = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(30);

    if (moods.length === 0) {
      return res.status(200).json({
        success: true,
        data: null
      });
    }

    // Count mood frequencies
    const moodCount = {};
    let totalEnergy = 0;
    let totalStress = 0;

    moods.forEach(log => {
      moodCount[log.mood] = (moodCount[log.mood] || 0) + 1;
      totalEnergy += log.energyLevel;
      totalStress += log.stressLevel;
    });

    // Find most common mood
    const mostCommonMood = Object.keys(moodCount).reduce((a, b) =>
      moodCount[a] > moodCount[b] ? a : b
    );

    res.status(200).json({
      success: true,
      data: {
        totalLogs: moods.length,
        mostCommonMood,
        moodCount,
        averageEnergy: (totalEnergy / moods.length).toFixed(1),
        averageStress: (totalStress / moods.length).toFixed(1),
      }
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
// DELETE MOOD
// DELETE /api/mood/:id
// ================================
export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: 'Mood log not found'
      });
    }

    if (mood.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await Mood.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Mood log deleted'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
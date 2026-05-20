import Water from '../models/water.js';

// ================================
// ADD WATER INTAKE
// POST /api/water/add
// ================================
export const addWater = async (req, res) => {
  try {
    const { amount, goal } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }

    // Get today's date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if water log exists for today
    let waterLog = await Water.findOne({
      user: req.user._id,
      date: today
    });

    if (waterLog) {
      // Add to existing log
      waterLog.amount += Number(amount);
      waterLog.logs.push({
        amount: Number(amount),
        time: new Date()
      });
      if (goal) waterLog.goal = goal;
      await waterLog.save();
    } else {
      // Create new log for today
      waterLog = await Water.create({
        user: req.user._id,
        date: today,
        amount: Number(amount),
        goal: goal || 2000,
        logs: [{
          amount: Number(amount),
          time: new Date()
        }]
      });
    }

    res.status(200).json({
      success: true,
      message: `${amount}ml added! 💧`,
      data: waterLog
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
// GET TODAY'S WATER
// GET /api/water/today
// ================================
export const getTodayWater = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const waterLog = await Water.findOne({
      user: req.user._id,
      date: today
    });

    res.status(200).json({
      success: true,
      data: waterLog || {
        amount: 0,
        goal: 2000,
        logs: []
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
// GET WATER HISTORY
// GET /api/water/history
// ================================
export const getWaterHistory = async (req, res) => {
  try {
    const history = await Water.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(7); // last 7 days

    res.status(200).json({
      success: true,
      data: history
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
// RESET TODAY'S WATER
// DELETE /api/water/reset
// ================================
export const resetTodayWater = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Water.findOneAndDelete({
      user: req.user._id,
      date: today
    });

    res.status(200).json({
      success: true,
      message: "Today's water intake reset"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
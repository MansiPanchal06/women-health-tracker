// server/controllers/periodController.js
import Period from '../models/period.js';

// ================================
// ADD PERIOD
// POST /api/period/add
// ================================
export const addPeriod = async (req, res) => {
  try {
    const { startDate, endDate, flow, symptoms, painLevel, notes } = req.body;

    if (!startDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date is required'
      });
    }

    // Calculate duration if endDate provided
    let duration = null;
    if (endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    }

    const period = await Period.create({
      user: req.user._id,
      startDate,
      endDate: endDate || null,
      duration,
      flow: flow || 'medium',
      symptoms: symptoms || [],
      painLevel: painLevel || 0,
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Period logged successfully!',
      data: period
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
// GET ALL PERIODS
// GET /api/period/all
// ================================
export const getPeriods = async (req, res) => {
  try {
    const periods = await Period.find({ user: req.user._id })
      .sort({ startDate: -1 }); // newest first

    res.status(200).json({
      success: true,
      count: periods.length,
      data: periods
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
// GET PREDICTIONS
// GET /api/period/predict
// ================================
export const getPredictions = async (req, res) => {
  try {
    // Get last 6 periods
    const periods = await Period.find({ user: req.user._id })
      .sort({ startDate: -1 })
      .limit(6);

    if (periods.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No periods logged yet',
        data: null
      });
    }

    let cycleLength = req.user.cycleLength || 28;

    // ================================
    // SMART PREDICTION
    // If we have 2+ periods, calculate
    // ACTUAL average cycle length
    // ================================
    if (periods.length >= 2) {
      let totalDays = 0;
      let count = 0;

      // Calculate days between consecutive periods
      for (let i = 0; i < periods.length - 1; i++) {
        const current = new Date(periods[i].startDate);
        const previous = new Date(periods[i + 1].startDate);

        const daysBetween = Math.ceil(
          (current - previous) / (1000 * 60 * 60 * 24)
        );

        // Only count realistic cycles (21-35 days)
        if (daysBetween >= 21 && daysBetween <= 35) {
          totalDays += daysBetween;
          count++;
        }
      }

      // Use calculated average if we have valid data
      if (count > 0) {
        cycleLength = Math.round(totalDays / count);
      }
    }

    // Last period start date
    const lastPeriodDate = new Date(periods[0].startDate);

    // Next period = last period + average cycle
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    // Ovulation = 14 days before next period
    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    // Fertile window
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    // Days until next period
    const today = new Date();
    const daysUntilNextPeriod = Math.ceil(
      (nextPeriodDate - today) / (1000 * 60 * 60 * 24)
    );

    // Current cycle phase
    const daysSinceLastPeriod = Math.ceil(
      (today - lastPeriodDate) / (1000 * 60 * 60 * 24)
    );

    // Determine phase
    let currentPhase = '';
    let phaseDescription = '';

    if (daysSinceLastPeriod <= (req.user.periodLength || 5)) {
      currentPhase = 'menstrual';
      phaseDescription = 'You are in your period phase';
    } else if (daysSinceLastPeriod <= 13) {
      currentPhase = 'follicular';
      phaseDescription = 'Follicular phase — energy rising!';
    } else if (daysSinceLastPeriod <= 16) {
      currentPhase = 'ovulation';
      phaseDescription = 'Ovulation phase — peak fertility!';
    } else {
      currentPhase = 'luteal';
      phaseDescription = 'Luteal phase — PMS may occur';
    }

    res.status(200).json({
      success: true,
      data: {
        lastPeriodDate,
        nextPeriodDate,
        ovulationDate,
        fertileWindow: {
          start: fertileStart,
          end: fertileEnd
        },
        daysUntilNextPeriod,
        cycleLength,          // actual calculated cycle
        currentPhase,
        phaseDescription,
        periodsAnalyzed: periods.length
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
// DELETE PERIOD
// DELETE /api/period/:id
// ================================
export const deletePeriod = async (req, res) => {
  try {
    const period = await Period.findById(req.params.id);

    if (!period) {
      return res.status(404).json({
        success: false,
        message: 'Period not found'
      });
    }

    // Make sure user owns this period
    if (period.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await Period.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Period deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
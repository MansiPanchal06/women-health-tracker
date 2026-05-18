// server/models/Period.js
// Tracks menstrual cycle data for each user

import mongoose from 'mongoose';

const periodSchema = new mongoose.Schema(
  {
    // Which user does this belong to?
    // ref: 'User' creates a relationship with User collection
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // When did period start?
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },

    // When did period end?
    endDate: {
      type: Date,
      default: null
    },

    // How many days did it last?
    duration: {
      type: Number,
      default: null
    },

    // Flow intensity
    flow: {
      type: String,
      enum: ['light', 'medium', 'heavy', 'spotting'],
      default: 'medium'
    },

    // Any notes for this cycle
    notes: {
      type: String,
      default: '',
      maxlength: 500
    },

    // Symptoms during this period
    symptoms: [{
      type: String,
      enum: [
        'cramps', 'headache', 'bloating',
        'backache', 'nausea', 'fatigue',
        'moodSwings', 'breastTenderness'
      ]
    }],

    // Pain level 1-10
    painLevel: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Period = mongoose.model('Period', periodSchema);
export default Period;
// server/models/Mood.js
// Daily mood and symptom tracking

import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // Date of this mood log
    date: {
      type: Date,
      required: true,
      default: Date.now
    },

    // Mood type
    mood: {
      type: String,
      required: true,
      enum: [
        'happy', 'sad', 'anxious',
        'calm', 'irritable', 'energetic',
        'tired', 'emotional'
      ]
    },

    // Energy level 1-10
    energyLevel: {
      type: Number,
      min: 1,
      max: 10,
      default: 5
    },

    // Stress level 1-10
    stressLevel: {
      type: Number,
      min: 1,
      max: 10,
      default: 5
    },

    // Physical symptoms
    symptoms: [{
      type: String,
      enum: [
        'cramps', 'headache', 'bloating',
        'backache', 'nausea', 'fatigue',
        'acne', 'insomnia', 'appetite_changes'
      ]
    }],

    // Any notes
    notes: {
      type: String,
      default: '',
      maxlength: 300
    }
  },
  {
    timestamps: true
  }
);

const Mood = mongoose.model('Mood', moodSchema);
export default Mood;
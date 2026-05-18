// server/models/Water.js
// Daily water intake tracking

import mongoose from 'mongoose';

const waterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // Date of intake
    date: {
      type: Date,
      required: true
    },

    // Amount in ml
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount cannot be negative']
    },

    // Daily goal in ml (default 2000ml = 2 litres)
    goal: {
      type: Number,
      default: 2000
    },

    // Individual water logs for the day
    logs: [
      {
        amount: Number,       // ml per drink
        time: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Water = mongoose.model('Water', waterSchema);
export default Water;
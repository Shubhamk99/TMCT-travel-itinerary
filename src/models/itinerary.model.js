const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true,
    index: true // Index for filtering
  },
  startDate: {
    type: Date,
    required: true,
    index: true // Index for sorting
  },
  endDate: {
    type: Date,
    required: true
  },
  activities: [activitySchema],
  shareableId: {
    type: String,
    unique: true,
    sparse: true // Allow null values
  }
}, {
  timestamps: true
});

// Create compound index for userId and destination for efficient querying
itinerarySchema.index({ userId: 1, destination: 1 });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;

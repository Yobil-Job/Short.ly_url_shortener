const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, 'Original URL is required'],
    trim: true,
    match: [/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/, 'Please enter a valid URL']
  },
  shortCode: {
    type: String,
    required: [true, 'Short code is required'],
    unique: true,  // Kept this for uniqueness constraint
    trim: true,
    minlength: [4, 'Short code must be at least 4 characters'],
    maxlength: [20, 'Short code cannot be more than 20 characters'],
    match: [/^[a-zA-Z0-9_-]+$/, 'Short code can only contain letters, numbers, underscores, and hyphens'],
    index: true  // Added this for general indexing (removed the separate index below)
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clicks: [{
    clickedAt: {
      type: Date,
      default: Date.now
    },
    referrer: String,
    userAgent: String,
    ipAddress: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isCustom: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: null
  }
});

// Removed the duplicate shortCode index (it's now defined in the schema above)
// Only keeping the expiresAt index
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to generate a random short code
urlSchema.statics.generateShortCode = function() {
  const length = 6;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

module.exports = mongoose.model('Url', urlSchema);
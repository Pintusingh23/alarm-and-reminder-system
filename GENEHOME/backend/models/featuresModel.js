import mongoose from 'mongoose';

const featuresSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  count: {
    type: Number,
    required: true,
    min: 0
  },
  features: {
    type: [String],
    required: true,
    validate: {
      validator: function(features) {
        return features.length > 0;
      },
      message: 'At least one feature is required'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Features = mongoose.model('Features', featuresSchema);

export default Features;
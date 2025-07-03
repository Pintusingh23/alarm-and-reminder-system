import mongoose from 'mongoose';

const livingSpaceSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  keyPoints: {
    type: [String],
    required: true,
    validate: {
      validator: function(array) {
        return array.length > 0;
      },
      message: 'At least one key point is required'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const LivingSpace = mongoose.model('LivingSpace', livingSpaceSchema);

export default LivingSpace;
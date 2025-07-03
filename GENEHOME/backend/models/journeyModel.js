import mongoose from 'mongoose';

const journeySchema = new mongoose.Schema({
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
  count: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Journey = mongoose.model('Journey', journeySchema);

export default Journey;
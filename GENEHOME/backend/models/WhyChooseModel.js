import mongoose from 'mongoose';

const whyChooseSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const WhyChoose = mongoose.model('WhyChoose', whyChooseSchema);

export default WhyChoose;
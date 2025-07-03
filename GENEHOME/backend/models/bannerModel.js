import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  images: [{
    type: String,
    required: true
  }],
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

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
import Features from '../models/featuresModel.js';
import fs from 'fs';
import path from 'path';

// Helper to parse features array
const parseFeatures = (features) => {
  if (Array.isArray(features)) return features;
  
  try {
    const parsed = JSON.parse(features);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    if (typeof features === 'string') {
      return features.split(',').map(item => item.trim()).filter(Boolean);
    }
    throw new Error('Invalid features format');
  }
};

// Create Feature
export const createFeature = async (req, res) => {
  try {
    const { title, description, count, features } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const parsedFeatures = parseFeatures(features);

    const newFeature = new Features({
      image: req.file.path,
      title,
      description,
      count: Number(count),
      features: parsedFeatures
    });

    await newFeature.save();
    res.status(201).json(newFeature);
  } catch (error) {
    res.status(400).json({ 
      message: error.message.includes('validation failed') 
        ? error.message 
        : 'Invalid data format' 
    });
  }
};

// Get All Features
export const getAllFeatures = async (req, res) => {
  try {
    const features = await Features.find().sort({ createdAt: -1 });
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Feature
export const getFeature = async (req, res) => {
  try {
    const feature = await Features.findById(req.params.id);
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.status(200).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Feature
export const updateFeature = async (req, res) => {
  try {
    const { title, description, count, features } = req.body;
    const feature = await Features.findById(req.params.id);

    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    const parsedFeatures = features ? parseFeatures(features) : feature.features;

    let image = feature.image;
    if (req.file) {
      // Delete old image
      if (feature.image) {
        const oldImagePath = path.join(process.cwd(), feature.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      image = req.file.path;
    }

    const updatedFeature = await Features.findByIdAndUpdate(
      req.params.id,
      { 
        image,
        title,
        description,
        count: count ? Number(count) : feature.count,
        features: parsedFeatures
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedFeature);
  } catch (error) {
    res.status(400).json({ 
      message: error.message.includes('validation failed') 
        ? error.message 
        : 'Invalid data format' 
    });
  }
};

// Delete Feature
export const deleteFeature = async (req, res) => {
  try {
    const feature = await Features.findByIdAndDelete(req.params.id);

    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }

    // Delete image
    if (feature.image) {
      const imagePath = path.join(process.cwd(), feature.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
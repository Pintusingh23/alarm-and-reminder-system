import LivingSpace from '../models/livingSpaceModel.js';
import fs from 'fs';
import path from 'path';

// Helper function to parse keyPoints
const parseKeyPoints = (keyPoints) => {
  if (Array.isArray(keyPoints)) {
    return keyPoints;
  }
  
  try {
    const parsed = JSON.parse(keyPoints);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    if (typeof keyPoints === 'string') {
      return keyPoints.split(',').map(item => item.trim()).filter(Boolean);
    }
    throw new Error('Invalid keyPoints format');
  }
};

// Create Living Space
export const createLivingSpace = async (req, res) => {
  try {
    const { title, description, keyPoints } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const parsedKeyPoints = parseKeyPoints(keyPoints);

    const newLivingSpace = new LivingSpace({
      img: req.file.path,
      title,
      description,
      keyPoints: parsedKeyPoints
    });

    await newLivingSpace.save();
    res.status(201).json(newLivingSpace);
  } catch (error) {
    res.status(400).json({ 
      message: error.message.includes('validation failed') 
        ? error.message 
        : 'Invalid data format' 
    });
  }
};

// Get All Living Spaces
export const getAllLivingSpaces = async (req, res) => {
  try {
    const livingSpaces = await LivingSpace.find().sort({ createdAt: -1 });
    res.status(200).json(livingSpaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Living Space
export const getLivingSpace = async (req, res) => {
  try {
    const livingSpace = await LivingSpace.findById(req.params.id);
    if (!livingSpace) {
      return res.status(404).json({ message: 'Living space not found' });
    }
    res.status(200).json(livingSpace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Living Space
export const updateLivingSpace = async (req, res) => {
  try {
    const { title, description, keyPoints } = req.body;
    const livingSpace = await LivingSpace.findById(req.params.id);

    if (!livingSpace) {
      return res.status(404).json({ message: 'Living space not found' });
    }

    const parsedKeyPoints = keyPoints ? parseKeyPoints(keyPoints) : livingSpace.keyPoints;

    let img = livingSpace.img;
    if (req.file) {
      // Delete old image
      if (livingSpace.img) {
        const oldImagePath = path.join(process.cwd(), livingSpace.img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      img = req.file.path;
    }

    const updatedLivingSpace = await LivingSpace.findByIdAndUpdate(
      req.params.id,
      { 
        img,
        title,
        description,
        keyPoints: parsedKeyPoints
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedLivingSpace);
  } catch (error) {
    res.status(400).json({ 
      message: error.message.includes('validation failed') 
        ? error.message 
        : 'Invalid data format' 
    });
  }
};

// Delete Living Space
export const deleteLivingSpace = async (req, res) => {
  try {
    const livingSpace = await LivingSpace.findByIdAndDelete(req.params.id);

    if (!livingSpace) {
      return res.status(404).json({ message: 'Living space not found' });
    }

    // Delete image
    if (livingSpace.img) {
      const imagePath = path.join(process.cwd(), livingSpace.img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Living space deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
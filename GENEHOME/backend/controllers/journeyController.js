import Journey from '../models/journeyModel.js';
import fs from 'fs';
import path from 'path';

// Create Journey
export const createJourney = async (req, res) => {
  try {
    const { title, description, count, icon } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newJourney = new Journey({
      img: req.file.path,
      title,
      description,
      count: count || 0,
      icon: icon || ''
    });

    await newJourney.save();
    res.status(201).json(newJourney);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Journeys
export const getAllJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find().sort({ createdAt: -1 }); // Now sorting by creation date
    res.status(200).json(journeys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Journey
export const getJourney = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }
    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Journey
export const updateJourney = async (req, res) => {
  try {
    const { title, description, count, icon } = req.body;
    const journey = await Journey.findById(req.params.id);

    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    let img = journey.img;
    if (req.file) {
      // Delete old image
      if (journey.img) {
        const oldImagePath = path.join(process.cwd(), journey.img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      img = req.file.path;
    }

    const updatedJourney = await Journey.findByIdAndUpdate(
      req.params.id,
      { 
        img, 
        title, 
        description, 
        count: count || journey.count,
        icon: icon || journey.icon
      },
      { new: true }
    );

    res.status(200).json(updatedJourney);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Journey
export const deleteJourney = async (req, res) => {
  try {
    const journey = await Journey.findByIdAndDelete(req.params.id);

    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    // Delete image
    if (journey.img) {
      const imagePath = path.join(process.cwd(), journey.img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Journey deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import WhyChoose from '../models/WhyChooseModel.js';
import fs from 'fs';
import path from 'path';

// Create WhyChoose
export const createWhyChoose = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newWhyChoose = new WhyChoose({
      img: req.file.path,
      title,
      description
    });

    await newWhyChoose.save();
    res.status(201).json(newWhyChoose);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All WhyChooses
export const getAllWhyChooses = async (req, res) => {
  try {
    const whyChooses = await WhyChoose.find().sort({ createdAt: -1 });
    res.status(200).json(whyChooses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single WhyChoose
export const getWhyChoose = async (req, res) => {
  try {
    const whyChoose = await WhyChoose.findById(req.params.id);
    if (!whyChoose) {
      return res.status(404).json({ message: 'WhyChoose not found' });
    }
    res.status(200).json(whyChoose);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update WhyChoose
export const updateWhyChoose = async (req, res) => {
  try {
    const { title, description } = req.body;
    const whyChoose = await WhyChoose.findById(req.params.id);

    if (!whyChoose) {
      return res.status(404).json({ message: 'WhyChoose not found' });
    }

    let img = whyChoose.img;
    if (req.file) {
      // Delete old image
      if (whyChoose.img) {
        const oldImagePath = path.join(process.cwd(), whyChoose.img);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      img = req.file.path;
    }

    const updatedWhyChoose = await WhyChoose.findByIdAndUpdate(
      req.params.id,
      { img, title, description },
      { new: true }
    );

    res.status(200).json(updatedWhyChoose);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete WhyChoose
export const deleteWhyChoose = async (req, res) => {
  try {
    const whyChoose = await WhyChoose.findByIdAndDelete(req.params.id);

    if (!whyChoose) {
      return res.status(404).json({ message: 'WhyChoose not found' });
    }
    if (whyChoose.img) {
      const imagePath = path.join(process.cwd(), whyChoose.img);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'WhyChoose deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
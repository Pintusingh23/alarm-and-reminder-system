import Testimonial from '../models/testimonialModel.js';
import fs from 'fs';
import path from 'path';

// Create Testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newTestimonial = new Testimonial({
      image: req.file.path,
      name,
      title,
      description
    });

    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Testimonials
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Testimonial
export const getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    let image = testimonial.image;
    if (req.file) {
      // Delete old image
      if (testimonial.image) {
        const oldImagePath = path.join(process.cwd(), testimonial.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      image = req.file.path;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { image, name, title, description },
      { new: true }
    );

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    // Delete image
    if (testimonial.image) {
      const imagePath = path.join(process.cwd(), testimonial.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
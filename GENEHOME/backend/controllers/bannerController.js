import Banner from '../models/bannerModel.js';
import fs from 'fs';
import path from 'path';

// Create Banner with multiple images
export const createBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    const images = req.files ? req.files.map(file => file.path) : null;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const newBanner = new Banner({
      images,
      title,
      description
    });

    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    // Clean up uploaded files if error occurs
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get All Banners
export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Banner
export const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Banner
export const updateBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    let images = banner.images;
    if (req.files && req.files.length > 0) {
      // Delete old images if they exist
      if (banner.images && banner.images.length > 0) {
        banner.images.forEach(image => {
          const oldImagePath = path.join(process.cwd(), image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        });
      }
      images = req.files.map(file => file.path);
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      { images, title, description },
      { new: true }
    );

    res.status(200).json(updatedBanner);
  } catch (error) {
    // Clean up uploaded files if error occurs
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// Delete Banner
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Delete associated images
    if (banner.images && banner.images.length > 0) {
      banner.images.forEach(image => {
        const imagePath = path.join(process.cwd(), image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
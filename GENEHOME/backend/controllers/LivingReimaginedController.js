import LivingReimagined from '../models/LivingReimaginedModel.js';
import fs from 'fs';
import path from 'path';

// ➤ Create Living Reimagined
export const createLivingReimagined = async (req, res) => {
    try {
        const { title, items } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image || !title || !items) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Parse items if it's a string (from form data)
        let parsedItems;
        if (typeof items === 'string') {
            try {
                parsedItems = JSON.parse(items);
            } catch (e) {
                // If parsing fails, treat as comma-separated string
                parsedItems = items.split(',').map(item => item.trim()).filter(item => item);
            }
        } else {
            parsedItems = items;
        }

        if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
            return res.status(400).json({ message: 'Items must be a non-empty array' });
        }

        const newLiving = new LivingReimagined({
            image,
            title,
            items: parsedItems
        });

        const savedLiving = await newLiving.save();
        res.status(201).json(savedLiving);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Living Reimagined
export const getAllLivingReimagined = async (req, res) => {
    try {
        const livings = await LivingReimagined.find().sort({ createdAt: -1 });
        res.status(200).json(livings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Living Reimagined by ID
export const getLivingReimaginedById = async (req, res) => {
    try {
        const living = await LivingReimagined.findById(req.params.id);
        if (!living) return res.status(404).json({ message: 'Living Reimagined not found' });
        res.status(200).json(living);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Living Reimagined
export const updateLivingReimagined = async (req, res) => {
    try {
        const { title, items } = req.body;
        const image = req.file ? req.file.filename : null;

        // Find the existing document
        const existingLiving = await LivingReimagined.findById(req.params.id);
        if (!existingLiving) {
            return res.status(404).json({ message: 'Living Reimagined not found' });
        }

        // Parse items if it's a string (from form data)
        let parsedItems;
        if (items) {
            if (typeof items === 'string') {
                try {
                    parsedItems = JSON.parse(items);
                } catch (e) {
                    parsedItems = items.split(',').map(item => item.trim()).filter(item => item);
                }
            } else {
                parsedItems = items;
            }
        }

        const updatedData = {
            title: title || existingLiving.title,
            items: parsedItems || existingLiving.items
        };

        if (image) {
            // Delete old image if it exists
            if (existingLiving.image) {
                const oldImagePath = path.join('uploads', existingLiving.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updatedData.image = image;
        }

        const updatedLiving = await LivingReimagined.findByIdAndUpdate(
            req.params.id, 
            updatedData, 
            { new: true }
        );

        res.status(200).json(updatedLiving);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Living Reimagined
export const deleteLivingReimagined = async (req, res) => {
    try {
        const deletedLiving = await LivingReimagined.findByIdAndDelete(req.params.id);
        if (!deletedLiving) {
            return res.status(404).json({ message: 'Living Reimagined not found' });
        }

        // Delete associated image file
        if (deletedLiving.image) {
            const imagePath = path.join('uploads', deletedLiving.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        res.status(200).json({ message: 'Living Reimagined deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
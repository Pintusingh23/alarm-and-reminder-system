import OurApproach from '../models/ourApproachModel.js';

// ➤ Create Our Approach
export const createOurApproach = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image || !title || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newApproach = new OurApproach({
            image,
            title,
            description
        });

        const savedApproach = await newApproach.save();
        res.status(201).json(savedApproach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Approaches
export const getAllOurApproaches = async (req, res) => {
    try {
        const approaches = await OurApproach.find().sort({ createdAt: -1 });
        res.status(200).json(approaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Approach by ID
export const getOurApproachById = async (req, res) => {
    try {
        const approach = await OurApproach.findById(req.params.id);
        if (!approach) return res.status(404).json({ message: 'Approach not found' });
        res.status(200).json(approach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Approach
export const updateOurApproach = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const updatedData = {
            title,
            description
        };

        if (image) {
            updatedData.image = image;
        }

        const updatedApproach = await OurApproach.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedApproach) return res.status(404).json({ message: 'Approach not found' });

        res.status(200).json(updatedApproach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Approach
export const deleteOurApproach = async (req, res) => {
    try {
        const deletedApproach = await OurApproach.findByIdAndDelete(req.params.id);
        if (!deletedApproach) return res.status(404).json({ message: 'Approach not found' });

        res.status(200).json({ message: 'Approach deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

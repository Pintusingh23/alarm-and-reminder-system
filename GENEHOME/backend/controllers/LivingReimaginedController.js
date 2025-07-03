import LivingReimagined from '../models/LivingReimaginedModel.js';

// ➤ Create Living Reimagined
export const createLivingReimagined = async (req, res) => {
    try {
        const { title, items } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image || !title || !items) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newLiving = new LivingReimagined({
            image,
            title,
            items
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

        const updatedData = {
            title,
            items
        };

        if (image) {
            updatedData.image = image;
        }

        const updatedLiving = await LivingReimagined.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedLiving) return res.status(404).json({ message: 'Living Reimagined not found' });

        res.status(200).json(updatedLiving);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Living Reimagined
export const deleteLivingReimagined = async (req, res) => {
    try {
        const deletedLiving = await LivingReimagined.findByIdAndDelete(req.params.id);
        if (!deletedLiving) return res.status(404).json({ message: 'Living Reimagined not found' });

        res.status(200).json({ message: 'Living Reimagined deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

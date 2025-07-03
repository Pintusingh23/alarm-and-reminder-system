import OurCore from '../models/ourCoreModel.js';

// ➤ Create Core Value
export const createOurCore = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Both Title and Description are required' });
        }

        const newCore = new OurCore({ title, description });
        const savedCore = await newCore.save();

        res.status(201).json(savedCore);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Core Values
export const getAllOurCores = async (req, res) => {
    try {
        const cores = await OurCore.find().sort({ createdAt: -1 });
        res.status(200).json(cores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Core Value by ID
export const getOurCoreById = async (req, res) => {
    try {
        const core = await OurCore.findById(req.params.id);
        if (!core) return res.status(404).json({ message: 'Core Value not found' });

        res.status(200).json(core);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Core Value
export const updateOurCore = async (req, res) => {
    try {
        const { title, description } = req.body;

        const updatedCore = await OurCore.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        if (!updatedCore) return res.status(404).json({ message: 'Core Value not found' });

        res.status(200).json(updatedCore);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Core Value
export const deleteOurCore = async (req, res) => {
    try {
        const deletedCore = await OurCore.findByIdAndDelete(req.params.id);
        if (!deletedCore) return res.status(404).json({ message: 'Core Value not found' });

        res.status(200).json({ message: 'Core Value deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

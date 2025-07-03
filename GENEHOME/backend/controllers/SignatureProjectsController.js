import SignatureProject from '../models/SignatureProjectsModel.js';

// ➤ Create Signature Project
export const createSignatureProject = async (req, res) => {
    try {
        const { name, location, features } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image || !name || !location || !features) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProject = new SignatureProject({
            image,
            name,
            location,
            features
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Signature Projects
export const getAllSignatureProjects = async (req, res) => {
    try {
        const projects = await SignatureProject.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Signature Project by ID
export const getSignatureProjectById = async (req, res) => {
    try {
        const project = await SignatureProject.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Signature Project
export const updateSignatureProject = async (req, res) => {
    try {
        const { name, location, features } = req.body;
        const image = req.file ? req.file.filename : null;

        const updatedData = {
            name,
            location,
            features
        };

        if (image) {
            updatedData.image = image;
        }

        const updatedProject = await SignatureProject.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });

        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Signature Project
export const deleteSignatureProject = async (req, res) => {
    try {
        const deletedProject = await SignatureProject.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

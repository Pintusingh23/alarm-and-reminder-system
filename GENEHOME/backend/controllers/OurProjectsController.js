import OurProject from '../models/OurProjectsModel.js';

// ➤ Create Our Project
export const createOurProject = async (req, res) => {
    try {
        const { number, title } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image || !number || !title) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProject = new OurProject({
            image,
            number,
            title
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Our Projects
export const getAllOurProjects = async (req, res) => {
    try {
        const projects = await OurProject.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Our Project by ID
export const getOurProjectById = async (req, res) => {
    try {
        const project = await OurProject.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Our Project
export const updateOurProject = async (req, res) => {
    try {
        const { number, title } = req.body;
        const image = req.file ? req.file.filename : null;

        const updatedData = {
            number,
            title
        };

        if (image) {
            updatedData.image = image;
        }

        const updatedProject = await OurProject.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });

        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Our Project
export const deleteOurProject = async (req, res) => {
    try {
        const deletedProject = await OurProject.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

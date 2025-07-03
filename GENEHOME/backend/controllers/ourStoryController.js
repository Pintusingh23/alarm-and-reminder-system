import OurStory from '../models/OurStoryModel.js';

// ➤ Create Our Story
export const createOurStory = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image || !title || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newStory = new OurStory({
            image,
            title,
            description
        });

        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Stories
export const getAllOurStories = async (req, res) => {
    try {
        const stories = await OurStory.find().sort({ createdAt: -1 });
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Story by ID
export const getOurStoryById = async (req, res) => {
    try {
        const story = await OurStory.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.status(200).json(story);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Story
export const updateOurStory = async (req, res) => {
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

        const updatedStory = await OurStory.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedStory) return res.status(404).json({ message: 'Story not found' });

        res.status(200).json(updatedStory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Story
export const deleteOurStory = async (req, res) => {
    try {
        const deletedStory = await OurStory.findByIdAndDelete(req.params.id);
        if (!deletedStory) return res.status(404).json({ message: 'Story not found' });

        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import Team from '../models/TeamModel.js';

// ➤ Create Team Member
export const createTeam = async (req, res) => {
    try {
        const { title, description, post } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image || !title || !description || !post) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newMember = new Team({
            image,
            title,
            description,
            post
        });

        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Team Members
export const getAllTeam = async (req, res) => {
    try {
        const team = await Team.find().sort({ createdAt: -1 });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Team Member by ID
export const getTeamById = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Team member not found' });
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Team Member
export const updateTeam = async (req, res) => {
    try {
        const { title, description, post } = req.body;
        const image = req.file ? req.file.filename : null;

        const updatedData = {
            title,
            description,
            post
        };

        if (image) {
            updatedData.image = image;
        }

        const updatedMember = await Team.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedMember) return res.status(404).json({ message: 'Team member not found' });

        res.status(200).json(updatedMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Team Member
export const deleteTeam = async (req, res) => {
    try {
        const deletedMember = await Team.findByIdAndDelete(req.params.id);
        if (!deletedMember) return res.status(404).json({ message: 'Team member not found' });

        res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

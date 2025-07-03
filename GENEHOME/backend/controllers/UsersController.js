import User from '../models/UsersModel.js';

// ➤ Create User
export const createUser = async (req, res) => {
    try {
        const { fullName, emailAddress, phoneNumber, message } = req.body;

        if (!fullName || !emailAddress || !phoneNumber || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = new User({
            fullName,
            emailAddress,
            phoneNumber,
            message
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single User by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update User
export const updateUser = async (req, res) => {
    try {
        const { fullName, emailAddress, phoneNumber, message } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { fullName, emailAddress, phoneNumber, message },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete User
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

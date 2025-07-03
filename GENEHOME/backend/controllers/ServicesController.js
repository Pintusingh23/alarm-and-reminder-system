import Service from '../models/ServicesModel.js';

// ➤ Create Service
export const createService = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image || !title || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newService = new Service({
            image,
            title,
            description
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Services
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Service by ID
export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Service
export const updateService = async (req, res) => {
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

        const updatedService = await Service.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedService) return res.status(404).json({ message: 'Service not found' });

        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Service
export const deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);
        if (!deletedService) return res.status(404).json({ message: 'Service not found' });

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

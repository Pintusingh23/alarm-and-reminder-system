import City from '../models/CitiesModel.js';

// ➤ Create City
export const createCity = async (req, res) => {
    try {
        const { name, description, projects, landmark } = req.body;
        const images = req.files;

        if (!images || images.length < 2) {
            return res.status(400).json({ message: 'Both City Image and Landmark Image are required' });
        }

        const image = images[0] ? images[0].filename : null;
        const landmarkImage = images[1] ? images[1].filename : null;

        if (!image || !landmarkImage || !name || !description || !projects || !landmark) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newCity = new City({
            image,
            name,
            description,
            projects,
            landmark,
            landmarkImage
        });

        const savedCity = await newCity.save();
        res.status(201).json(savedCity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Cities
export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find().sort({ createdAt: -1 });
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single City by ID
export const getCityById = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) return res.status(404).json({ message: 'City not found' });
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update City
export const updateCity = async (req, res) => {
    try {
        const { name, description, projects, landmark } = req.body;
        const images = req.files;

        const updatedData = {
            name,
            description,
            projects,
            landmark
        };

        if (images && images.length > 0) {
            if (images[0]) updatedData.image = images[0].filename;
            if (images[1]) updatedData.landmarkImage = images[1].filename;
        }

        const updatedCity = await City.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedCity) return res.status(404).json({ message: 'City not found' });

        res.status(200).json(updatedCity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete City
export const deleteCity = async (req, res) => {
    try {
        const deletedCity = await City.findByIdAndDelete(req.params.id);
        if (!deletedCity) return res.status(404).json({ message: 'City not found' });

        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

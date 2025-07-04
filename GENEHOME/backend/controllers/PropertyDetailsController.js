import PropertyDetail from '../models/PropertyDetailsModel.js';

// ➤ Create Property Detail
export const createPropertyDetail = async (req, res) => {
    try {
        const { title, description, features } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image || !title || !description || !features) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Parse features if it's a string (from form data)
        let parsedFeatures;
        if (typeof features === 'string') {
            try {
                parsedFeatures = JSON.parse(features);
            } catch (error) {
                return res.status(400).json({ message: 'Invalid features format' });
            }
        } else {
            parsedFeatures = features;
        }

        if (!Array.isArray(parsedFeatures) || parsedFeatures.length === 0) {
            return res.status(400).json({ message: 'At least one feature is required' });
        }

        const newDetail = new PropertyDetail({
            image,
            title,
            description,
            features: parsedFeatures
        });

        const savedDetail = await newDetail.save();
        res.status(201).json(savedDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Property Details
export const getAllPropertyDetails = async (req, res) => {
    try {
        const details = await PropertyDetail.find().sort({ createdAt: -1 });
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Property Detail by ID
export const getPropertyDetailById = async (req, res) => {
    try {
        const detail = await PropertyDetail.findById(req.params.id);
        if (!detail) return res.status(404).json({ message: 'Property Detail not found' });
        res.status(200).json(detail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Property Detail
export const updatePropertyDetail = async (req, res) => {
    try {
        const { title, description, features } = req.body;
        const image = req.file ? req.file.filename : null;

        const updatedData = {
            title,
            description
        };

        // Handle features
        if (features) {
            let parsedFeatures;
            if (typeof features === 'string') {
                try {
                    parsedFeatures = JSON.parse(features);
                } catch (error) {
                    return res.status(400).json({ message: 'Invalid features format' });
                }
            } else {
                parsedFeatures = features;
            }

            if (!Array.isArray(parsedFeatures) || parsedFeatures.length === 0) {
                return res.status(400).json({ message: 'At least one feature is required' });
            }

            updatedData.features = parsedFeatures;
        }

        if (image) {
            updatedData.image = image;
        }

        const updatedDetail = await PropertyDetail.findByIdAndUpdate(
            req.params.id, 
            updatedData, 
            { new: true }
        );

        if (!updatedDetail) return res.status(404).json({ message: 'Property Detail not found' });

        res.status(200).json(updatedDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Property Detail
export const deletePropertyDetail = async (req, res) => {
    try {
        const deletedDetail = await PropertyDetail.findByIdAndDelete(req.params.id);
        if (!deletedDetail) return res.status(404).json({ message: 'Property Detail not found' });

        res.status(200).json({ message: 'Property Detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
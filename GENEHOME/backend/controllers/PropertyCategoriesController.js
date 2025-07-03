import PropertyCategory from '../models/PropertyCategoriesModel.js';

// ➤ Create Property Category
export const createPropertyCategory = async (req, res) => {
    try {
        const { type, description, stats } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!type || !description || !image || !stats) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newCategory = new PropertyCategory({
            type,
            description,
            image,
            stats
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get All Property Categories
export const getAllPropertyCategories = async (req, res) => {
    try {
        const categories = await PropertyCategory.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Get Single Property Category by ID
export const getPropertyCategoryById = async (req, res) => {
    try {
        const category = await PropertyCategory.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Update Property Category
export const updatePropertyCategory = async (req, res) => {
    try {
        const { type, description, stats } = req.body;
        const image = req.file ? req.file.filename : null;

        const updatedData = {
            type,
            description,
            stats
        };

        if (image) {
            updatedData.image = image;
        }

        const updatedCategory = await PropertyCategory.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ➤ Delete Property Category
export const deletePropertyCategory = async (req, res) => {
    try {
        const deletedCategory = await PropertyCategory.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

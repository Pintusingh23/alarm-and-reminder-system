import express from 'express';
import upload from '../middleware/upload.js';
import { 
    createPropertyCategory, 
    getAllPropertyCategories, 
    getPropertyCategoryById, 
    updatePropertyCategory, 
    deletePropertyCategory 
} from '../controllers/PropertyCategoriesController.js';

const router = express.Router();

// ➤ Create Category
router.post('/', upload.single('image'), createPropertyCategory);

// ➤ Get All Categories
router.get('/', getAllPropertyCategories);

// ➤ Get Single Category
router.get('/:id', getPropertyCategoryById);

// ➤ Update Category
router.put('/:id', upload.single('image'), updatePropertyCategory);

// ➤ Delete Category
router.delete('/:id', deletePropertyCategory);

export default router;

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
router.post('/', upload.single('image'), createPropertyCategory);
router.get('/', getAllPropertyCategories);
router.get('/:id', getPropertyCategoryById);
router.put('/:id', upload.single('image'), updatePropertyCategory);
router.delete('/:id', deletePropertyCategory);

export default router;

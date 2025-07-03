import express from 'express';
import upload from '../middleware/upload.js';
import { 
    createPropertyDetail, 
    getAllPropertyDetails, 
    getPropertyDetailById, 
    updatePropertyDetail, 
    deletePropertyDetail 
} from '../controllers/PropertyDetailsController.js';

const router = express.Router();

// ➤ Create Property Detail
router.post('/', upload.single('image'), createPropertyDetail);

// ➤ Get All Property Details
router.get('/', getAllPropertyDetails);

// ➤ Get Single Property Detail
router.get('/:id', getPropertyDetailById);

// ➤ Update Property Detail
router.put('/:id', upload.single('image'), updatePropertyDetail);

// ➤ Delete Property Detail
router.delete('/:id', deletePropertyDetail);

export default router;

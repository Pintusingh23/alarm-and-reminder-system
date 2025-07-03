import express from 'express';
import upload from '../middleware/upload.js';
import { 
    createService, 
    getAllServices, 
    getServiceById, 
    updateService, 
    deleteService 
} from '../controllers/ServicesController.js';

const router = express.Router();

// ➤ Create Service
router.post('/', upload.single('image'), createService);

// ➤ Get All Services
router.get('/', getAllServices);

// ➤ Get Single Service
router.get('/:id', getServiceById);

// ➤ Update Service
router.put('/:id', upload.single('image'), updateService);

// ➤ Delete Service
router.delete('/:id', deleteService);

export default router;

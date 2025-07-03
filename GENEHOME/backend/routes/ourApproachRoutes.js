import express from 'express';
import upload  from '../middleware/upload.js';
import { 
    createOurApproach, 
    getAllOurApproaches, 
    getOurApproachById, 
    updateOurApproach, 
    deleteOurApproach 
} from '../controllers/ourApproachController.js';

const router = express.Router();

// ➤ Create Approach
router.post('/', upload.single('image'), createOurApproach);

// ➤ Get All Approaches
router.get('/', getAllOurApproaches);

// ➤ Get Single Approach
router.get('/:id', getOurApproachById);

// ➤ Update Approach
router.put('/:id', upload.single('image'), updateOurApproach);

// ➤ Delete Approach
router.delete('/:id', deleteOurApproach);

export default router;

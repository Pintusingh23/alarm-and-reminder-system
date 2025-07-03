import express from 'express';
import upload from '../middleware/upload.js';
import { 
    createLivingReimagined, 
    getAllLivingReimagined, 
    getLivingReimaginedById, 
    updateLivingReimagined, 
    deleteLivingReimagined 
} from '../controllers/LivingReimaginedController.js';

const router = express.Router();

// ➤ Create Living Reimagined
router.post('/', upload.single('image'), createLivingReimagined);

// ➤ Get All Living Reimagined
router.get('/', getAllLivingReimagined);

// ➤ Get Single Living Reimagined
router.get('/:id', getLivingReimaginedById);

// ➤ Update Living Reimagined
router.put('/:id', upload.single('image'), updateLivingReimagined);

// ➤ Delete Living Reimagined
router.delete('/:id', deleteLivingReimagined);

export default router;

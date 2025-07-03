import express from 'express';
import upload from '../middleware/upload.js';
import { 
    createPartner, 
    getAllPartners, 
    getPartnerById, 
    updatePartner, 
    deletePartner 
} from '../controllers/PartnersController.js';

const router = express.Router();

// ➤ Create Partner
router.post('/', upload.single('documents'), createPartner);

// ➤ Get All Partners
router.get('/', getAllPartners);

// ➤ Get Single Partner
router.get('/:id', getPartnerById);

// ➤ Update Partner
router.put('/:id', upload.single('documents'), updatePartner);

// ➤ Delete Partner
router.delete('/:id', deletePartner);

export default router;

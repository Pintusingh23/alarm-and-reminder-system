import express from 'express';
import { 
    createOurCore, 
    getAllOurCores, 
    getOurCoreById, 
    updateOurCore, 
    deleteOurCore 
} from '../controllers/ourCoreController.js';

const router = express.Router();

// ➤ Create Core
router.post('/', createOurCore);

// ➤ Get All Cores
router.get('/', getAllOurCores);

// ➤ Get Single Core by ID
router.get('/:id', getOurCoreById);

// ➤ Update Core
router.put('/:id', updateOurCore);

// ➤ Delete Core
router.delete('/:id', deleteOurCore);

export default router;

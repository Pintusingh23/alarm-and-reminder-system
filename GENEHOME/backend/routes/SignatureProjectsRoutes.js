import express from 'express';
import upload from '../middleware/upload.js';
import { 
    createSignatureProject, 
    getAllSignatureProjects, 
    getSignatureProjectById, 
    updateSignatureProject, 
    deleteSignatureProject 
} from '../controllers/SignatureProjectsController.js';

const router = express.Router();

// ➤ Create Signature Project
router.post('/', upload.single('image'), createSignatureProject);

// ➤ Get All Signature Projects
router.get('/', getAllSignatureProjects);

// ➤ Get Single Signature Project
router.get('/:id', getSignatureProjectById);

// ➤ Update Signature Project
router.put('/:id', upload.single('image'), updateSignatureProject);

// ➤ Delete Signature Project
router.delete('/:id', deleteSignatureProject);

export default router;

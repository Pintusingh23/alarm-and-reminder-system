import express from 'express';
import upload from '../middleware/upload.js';
import { 
    createOurProject, 
    getAllOurProjects, 
    getOurProjectById, 
    updateOurProject, 
    deleteOurProject 
} from '../controllers/OurProjectsController.js';

const router = express.Router();

// ➤ Create Our Project
router.post('/', upload.single('image'), createOurProject);

// ➤ Get All Our Projects
router.get('/', getAllOurProjects);

// ➤ Get Single Our Project
router.get('/:id', getOurProjectById);

// ➤ Update Our Project
router.put('/:id', upload.single('image'), updateOurProject);

// ➤ Delete Our Project
router.delete('/:id', deleteOurProject);

export default router;

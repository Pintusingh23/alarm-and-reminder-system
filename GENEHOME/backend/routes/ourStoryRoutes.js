import express from 'express';
import upload  from '../middleware/upload.js';
import { 
    createOurStory, 
    getAllOurStories, 
    getOurStoryById, 
    updateOurStory, 
    deleteOurStory 
} from '../controllers/OurStoryController.js';

const router = express.Router();

// Create Story
router.post('/', upload.single('image'), createOurStory);

// Get All Stories
router.get('/', getAllOurStories);

// Get Single Story by ID
router.get('/:id', getOurStoryById);

// Update Story
router.put('/:id', upload.single('image'), updateOurStory);

// Delete Story
router.delete('/:id', deleteOurStory);

export default router;

import express from 'express';
import upload  from '../middleware/upload.js';
import { 
    createTeam, 
    getAllTeam, 
    getTeamById, 
    updateTeam, 
    deleteTeam 
} from '../controllers/TeamController.js';

const router = express.Router();

// ➤ Create Team Member
router.post('/', upload.single('image'), createTeam);

// ➤ Get All Team Members
router.get('/', getAllTeam);

// ➤ Get Single Team Member
router.get('/:id', getTeamById);

// ➤ Update Team Member
router.put('/:id', upload.single('image'), updateTeam);

// ➤ Delete Team Member
router.delete('/:id', deleteTeam);

export default router;

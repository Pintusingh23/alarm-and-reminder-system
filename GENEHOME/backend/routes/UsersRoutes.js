import express from 'express';
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/UsersController.js';

const router = express.Router();

// ➤ Create User
router.post('/', createUser);

// ➤ Get All Users
router.get('/', getAllUsers);

// ➤ Get Single User
router.get('/:id', getUserById);

// ➤ Update User
router.put('/:id', updateUser);

// ➤ Delete User
router.delete('/:id', deleteUser);

export default router;

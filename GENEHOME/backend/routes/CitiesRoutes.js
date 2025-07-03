import express from 'express';
import upload from '../middleware/upload.js';
import { 
    createCity, 
    getAllCities, 
    getCityById, 
    updateCity, 
    deleteCity 
} from '../controllers/CitiesController.js';

const router = express.Router();

// ➤ Create City (Two images: image & landmarkImage)
router.post('/', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'landmarkImage', maxCount: 1 }
]), createCity);

// ➤ Get All Cities
router.get('/', getAllCities);

// ➤ Get Single City
router.get('/:id', getCityById);

// ➤ Update City (Two images optional)
router.put('/:id', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'landmarkImage', maxCount: 1 }
]), updateCity);

// ➤ Delete City
router.delete('/:id', deleteCity);

export default router;

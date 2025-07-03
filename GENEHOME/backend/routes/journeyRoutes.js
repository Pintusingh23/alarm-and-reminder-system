import express from 'express';
import {
  createJourney,
  getAllJourneys,
  getJourney,
  updateJourney,
  deleteJourney
} from '../controllers/journeyController.js';
import uploadJourney from '../middleware/upload.js';

const router = express.Router();

router.post('/', uploadJourney.single('img'), createJourney);
router.get('/', getAllJourneys);
router.get('/:id', getJourney);
router.put('/:id', uploadJourney.single('img'), updateJourney);
router.delete('/:id', deleteJourney);

export default router;
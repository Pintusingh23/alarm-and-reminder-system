import express from 'express';
import {
  createTestimonial,
  getAllTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import uploadTestimonial from '../middleware/upload.js';

const router = express.Router();

// Create Testimonial
router.post('/', uploadTestimonial.single('image'), createTestimonial);
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonial);
router.put('/:id', uploadTestimonial.single('image'), updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
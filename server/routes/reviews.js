import express from 'express';
import { getReviews,createReview } from '../controllers/reviews.js';
import requiredLogin from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requiredLogin, getReviews);
router.post('/', requiredLogin, createReview);

export default router;
import express from 'express';
import { updateReview } from '../../controllers/reviews.js';

const router = express.Router();

router.patch('/:id', updateReview);

export default router;
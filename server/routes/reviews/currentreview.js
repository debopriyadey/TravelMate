import express from 'express';
import { currentReview } from '../../controllers/reviews.js';

const router = express.Router();

router.get('/:id', currentReview);

export default router;
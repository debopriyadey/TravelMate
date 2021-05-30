import express from 'express';
import { deleteReview } from '../../controllers/reviews.js';

const router = express.Router();

router.delete('/:id', deleteReview);

export default router;
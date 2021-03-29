import express from 'express';
import { searchReview } from '../../controllers/reviews.js';

const router = express.Router();

router.post('/', searchReview);

export default router;
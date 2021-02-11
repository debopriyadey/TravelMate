import express from 'express';
import { createReview } from '../../controllers/reviews.js';
import requiredLogin from '../../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requiredLogin, createReview);

export default router;
import express from 'express';
import { getReviews } from '../../controllers/reviews.js';
import requiredLogin from '../../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requiredLogin, getReviews);

export default router;
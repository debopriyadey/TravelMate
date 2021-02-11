import express from 'express';
import { myReviews } from '../../controllers/reviews.js';
import requiredLogin from '../../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requiredLogin, myReviews);

export default router;
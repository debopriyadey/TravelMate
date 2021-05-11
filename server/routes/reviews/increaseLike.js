import express from 'express';
import { increaseLike } from '../../controllers/reviews.js';
import requiredLogin from '../../middleware/requireAuth.js';

const router = express.Router();

router.post('/',requiredLogin, increaseLike);

export default router;
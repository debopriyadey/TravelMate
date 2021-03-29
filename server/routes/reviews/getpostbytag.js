import express from 'express';
import { getPostByTag } from '../../controllers/reviews.js';

const router = express.Router();

router.post('/', getPostByTag);

export default router;
import express from 'express';
import { signup, signin } from '../controllers/auth.js';

const router = express.Router();

router.post('/', signin);
router.post('/', signup);

export default router;
import express from 'express';
import { registerUser, login, verifyEmail } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/verify-email', verifyEmail);

export default router;

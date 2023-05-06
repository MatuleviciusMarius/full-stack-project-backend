import express from 'express';
const router = express.Router();

router.post('/register');
router.post('/login');
router.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

export default router;

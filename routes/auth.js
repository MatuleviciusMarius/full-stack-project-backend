import express from 'express';
const router = express.Router();

router.post('/register');
router.post('/login');
router.get('/test', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

export default router;

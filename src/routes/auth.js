import express from 'express';
const router = express.Router();

// router.post('/register');
// router.post('/login');
router.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  });
});

export default router;

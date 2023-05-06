import express from 'express';
import cors from 'cors';
import config from './src/config.js';
import router from './src/routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

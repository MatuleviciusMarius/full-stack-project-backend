import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI,
  sprakpostKey: process.env.SPARKPOST_KEY,
};

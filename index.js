import { Server } from 'http';
import app from './server.js';

const server = new Server(app);

export default (req, res) => {
  server.emit('request', req, res);
};

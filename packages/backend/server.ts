import express from 'express';
import dotenv from 'dotenv';
import * as http from 'http';
import cookieParser from 'cookie-parser';
import pino from 'express-pino-logger';
import bodyParser from 'body-parser';
import Routes from './routes';

dotenv.config();
const createServer = (sessionSecret = 'secret', reqLimit = '100kb') => {
  const app = express();
  new Routes(app);

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false, limit: reqLimit }));
  // parse application/json
  app.use(bodyParser.json({ limit: reqLimit }));
  app.use(cookieParser(sessionSecret));
  // Rest logger
  app.use(pino());

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  const server = http.createServer(app);
  return server;
};

export default createServer;

import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import pino from 'express-pino-logger';
import Routes from './routes';

dotenv.config();

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: 'http://localhost:8081',
    };

    app.use(pino());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}

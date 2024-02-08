import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import pino from 'express-pino-logger';
import Routes from './routes';

dotenv.config();
const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

new Routes(app);

app.use(pino());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .listen(PORT, 'localhost', function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Error: address already in use');
    } else {
      console.log(err);
    }
  });

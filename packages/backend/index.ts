import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import pino from 'express-pino-logger';
import Routes from './routes';

dotenv.config();
const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.use(pino());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
new Routes(app);
app.listen(PORT, 'localhost', function () {
  console.log(`Server is running on port ${PORT}.`);
});

import { Router } from 'express';
import StatusController from '../controllers/status.controller';

class StatusRoutes {
  router = Router();
  controller = new StatusController();
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get('/totalTests', this.controller.getTotalTests);
    this.router.get('/status', this.controller.getStatus);
  }
}

export default new StatusRoutes().router;

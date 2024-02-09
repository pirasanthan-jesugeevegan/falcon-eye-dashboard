import { Application } from 'express';
import tutorialRoutes from './tutorial.routes';
import statusRoutes from './status.routes';
import productsRoutes from './products.routes';
export default class Routes {
  constructor(app: Application) {
    app.use('/api/tutorials', tutorialRoutes);
    app.use('/api/e2e', statusRoutes);
    app.use('/api', productsRoutes);
  }
}

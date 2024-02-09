import { Application } from 'express';
import homeRoutes from './home.routes';
import tutorialRoutes from './tutorial.routes';
import statusRoutes from './status.routes';

export default class Routes {
  constructor(app: Application) {
    app.use('/api', homeRoutes);
    app.use('/api/tutorials', tutorialRoutes);
    app.use('/api/e2e', statusRoutes);
  }
}

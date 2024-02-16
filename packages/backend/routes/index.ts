import { Application } from 'express'
import tutorialRoutes from './tutorial.routes'
import statusRoutes from './status.routes'
import productsRoutes from './products.routes'
import proxy from './proxy.routes'

export default class Routes {
    constructor(app: Application) {
        app.use('/api/v1/tutorials', tutorialRoutes)
        app.use('/api/v1/e2e', statusRoutes)
        app.use('/api/v1', productsRoutes)
        app.use('/', proxy)
    }
}

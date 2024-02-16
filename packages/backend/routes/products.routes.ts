import { Router } from 'express'
import ProductsController from '../controllers/products.controller'

class ProductsRoutes {
    router = Router()
    controller = new ProductsController()
    constructor() {
        this.intializeRoutes()
    }

    intializeRoutes() {
        this.router.get('/:type/:product', this.controller.getAllDataFromTable)
        this.router.post('/:type/:product', this.controller.createData)
        this.router.delete('/:type/:product/:id', this.controller.deleteDataRow)
    }
}

export default new ProductsRoutes().router

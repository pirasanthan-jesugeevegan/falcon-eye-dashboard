import { Router } from 'express'
import { sonarCloudProxy } from '../middlewares/sonarCloud.proxy.middleware'
import { jiraProxy } from '../middlewares/jira.proxy.middleware'

class ProxyRoutes {
    router = Router()

    constructor() {
        this.intializeRoutes()
    }

    intializeRoutes() {
        this.router.use('/rest/api', jiraProxy)
        this.router.use('/api', sonarCloudProxy)
    }
}

export default new ProxyRoutes().router

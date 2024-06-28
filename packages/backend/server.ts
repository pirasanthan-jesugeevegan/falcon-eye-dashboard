import express from 'express'
import cors, { CorsOptions } from 'cors'
import * as http from 'http'
import pino from 'express-pino-logger'
import bodyParser from 'body-parser'
import Routes from './routes'

const createServer = (reqLimit = '100kb') => {
    const app = express()

    app.get('/is-alive', (req, res) => {
        res.status(200).send('OK')
    })
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false, limit: reqLimit }))
    app.use(bodyParser.json({ limit: reqLimit }))

    new Routes(app)

    app.use(pino())

    const server = http.createServer(app)
    return server
}

export default createServer

import request from 'supertest'
import createServer from '../server'
import ProductsController from './products.controller'
import queries from '../database/db_queries'
import { Request, Response } from 'express'
import db from '../database/connection'

jest.mock('../database/connection.ts', () =>
    jest.fn(() => ({ insert: jest.fn() }))
)

jest.mock('../database/db_queries', () => ({
    getTable: jest.fn(),
    insertData: jest.fn(),
    deleteData: jest.fn(),
}))

describe('ProductsController', () => {
    let productsController: ProductsController
    let req: Partial<Request>
    let res: Partial<Response>

    beforeEach(() => {
        productsController = new ProductsController()
        req = {}
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('GET /api/:type/:product', () => {
        it('should return 404 if invalid type or product', async () => {
            await request(createServer())
                .get('/api/v1/invalidType/invalidProduct')
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: 'Invalid type or product',
                    })
                })
        })
        it('should return 404 if invalid type or product', async () => {
            await request(createServer())
                .get('/api/v1/invalidType/identity_service')
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: 'Invalid type or product',
                    })
                })
        })
        it('should return 200 and data for e2e', async () => {
            const selectMock = [
                {
                    id: 3,
                    date: '2024-03-15T00:00:00.000Z',
                    pass: 10,
                    fail: 2,
                    skip: 5,
                    report_url: 'http://example.com',
                },
            ]
            ;(queries.getTable as jest.Mock).mockResolvedValueOnce(selectMock)

            await request(createServer())
                .get('/api/v1/e2e/identity_service')
                .expect(200)
                .then((response) => {
                    expect(Array.isArray(response.body)).toBe(true)
                    expect(response.body).toEqual(selectMock)
                })
        })
        it('should return 200 and data for unit', async () => {
            const mockRawData = [
                {
                    id: 1,
                    pull_request: 'Hello-its-me22',
                    result: [
                        {
                            id: 1,
                            author: undefined,
                            branch_coverage: undefined,
                            commit: undefined,
                            date: undefined,
                            function_coverage: undefined,
                            line_coverage: undefined,
                            percentage: undefined,
                            statement_coverage: undefined,
                        },
                    ],
                },
            ]
            ;(queries.getTable as jest.Mock).mockResolvedValueOnce(mockRawData)

            await request(createServer())
                .get('/api/v1/unit/identity_service')
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual(mockRawData)
                })
        })
        it('should return 500 if an error occurs while fetching data', async () => {
            jest.spyOn(queries, 'getTable').mockRejectedValue(
                new Error('Database error')
            )

            await request(createServer())
                .get('/api/v1/e2e/identity_service')
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        message: 'Internal Server Error!',
                    })
                })
        })
    })

    describe('POST /api/:type/:product', () => {
        it('should return 400 if invalid type and product', async () => {
            await request(createServer())
                .post('/api/v1/invalidType/invalidProduct')
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: 'Invalid type or product',
                    })
                })
        })
        it('should return 404 if invalid type', async () => {
            await request(createServer())
                .post('/api/v1/invalidType/identity_service')
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: 'Invalid type or product',
                    })
                })
        })
        it('should return 400 for empty request body', async () => {
            await request(createServer())
                .post('/api/v1/e2e/identity_service')
                .send({})
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: [
                            'pass is a required field',
                            'fail is a required field',
                            'skip is a required field',
                            'report_url is a required field',
                            'env is a required field',
                        ],
                    })
                })
        })
        it('should return 201 for successful data insertion for e2e', async () => {
            const mockData = {
                date: '2024-03-15',
                pass: '10',
                fail: '2',
                skip: '3',
                report_url: 'http://example.com',
                env: 'dev',
            }

            ;(db('e2e_identity_service').insert as jest.Mock).mockReturnValue(
                mockData
            )

            await request(createServer())
                .post('/api/v1/e2e/identity_service')
                .send(mockData)
                // .expect(201)
                .then((response) => {
                    expect(response.body).toEqual({
                        message: 'Data added successfully',
                    })
                })
        })
        it('should return 201 for successful data insertion for unit', async () => {
            const mockRawData = [
                {
                    id: 1,
                    pull_request: 'Hello-its-me22',
                    result: [
                        {
                            id: 1,
                            author: undefined,
                            branch_coverage: undefined,
                            commit: undefined,
                            date: undefined,
                            function_coverage: undefined,
                            line_coverage: undefined,
                            percentage: undefined,
                            statement_coverage: undefined,
                        },
                    ],
                },
            ]
            ;(db().insert as jest.Mock).mockReturnValue(mockRawData)

            const mockData = {
                date: '2024-03-15_00:00:00',
                percentage: '10',
                statement_coverage: '2',
                function_coverage: '3',
                commit: 'http://example.com',
                pull_request: 'Hello-its-me22',
                branch_coverage: '2',
                line_coverage: '3',
                author: 'http://example.com',
            }
            ;(queries.insertData as jest.Mock).mockResolvedValueOnce(true)

            await request(createServer())
                .post('/api/v1/unit/identity_service')
                .send(mockData)
                .expect(201)
                .then((response) => {
                    expect(response.body).toEqual({
                        message: 'Data added successfully',
                    })
                })
        })
        it('should return 400 when body is empty for unit type', async () => {
            await request(createServer())
                .post('/api/v1/unit/identity_service')
                .send({})
                .expect(400)
                .then((response) => {
                    expect(response.body).toEqual({
                        error: [
                            'percentage is a required field',
                            'commit is a required field',
                            'pull_request is a required field',
                            'statement_coverage is a required field',
                            'function_coverage is a required field',
                            'branch_coverage is a required field',
                            'line_coverage is a required field',
                            'author is a required field',
                        ],
                    })
                })
        })
        it('should return 400 for invalid data during insertion', async () => {
            await request(createServer())
                .post('/api/v1/e2e/identity_service')
                .send({ name: 'smith' })
                .expect(400)
        })
    })

    describe('DELETE /api/:type/:product/:id', () => {
        it('should return 400 if invalid product', async () => {
            await request(createServer())
                .delete('/api/v1/e2e/invalidProduct/1')
                .expect(404)
        })
        it('should return 404 if data not found', async () => {
            jest.spyOn(queries, 'deleteData').mockResolvedValue(0)
            await request(createServer())
                .delete('/api/v1/e2e/identity_service/1')
                .expect(404)
        })
        it('should return 200 for successful data deletion', async () => {
            jest.spyOn(queries, 'deleteData').mockResolvedValue(1)

            await request(createServer())
                .delete('/api/v1/e2e/identity_service/2')
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual({
                        message: 'Data deleted successfully',
                    })
                })
        })
        it('should return 500 if an error occurs while deleting data', async () => {
            jest.spyOn(queries, 'deleteData').mockRejectedValue(
                new Error('Database error')
            )

            await request(createServer())
                .delete('/api/v1/e2e/identity_service/2')
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        message: 'Internal Server Error!',
                    })
                })
        })
    })
})

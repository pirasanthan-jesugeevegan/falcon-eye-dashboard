import request from 'supertest'
import createServer from '../server'
import db_queries from '../database/db_queries'
import StatusController from './status.controller'
import { Request, Response } from 'express'

jest.mock('../database/db_queries.ts', () => ({
    getLastResult: jest.fn(),
}))

describe('StatusController', () => {
    let statusController: StatusController
    let req: Partial<Request>
    let res: Partial<Response>

    beforeEach(() => {
        statusController = new StatusController()
        req = {}
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('getTotalTests', () => {
        it('should return 200 with total tests', async () => {
            const mockResults = [
                { pass: 10, fail: 2, skip: 3 },
                { pass: 5, fail: 1, skip: 0 },
            ]
            ;(db_queries.getLastResult as jest.Mock).mockResolvedValueOnce(
                mockResults[0]
            )
            ;(db_queries.getLastResult as jest.Mock).mockResolvedValueOnce(
                mockResults[1]
            )

            await request(createServer())
                .get('/api/v1/e2e/totalTests')
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual({ totalTests: 21 })
                })
        })

        it('should return 500 if an error occurs', async () => {
            ;(db_queries.getLastResult as jest.Mock).mockRejectedValueOnce(
                new Error('Database error')
            )

            await request(createServer())
                .get('/api/v1/e2e/totalTests')
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        message: 'Internal Server Error!',
                    })
                })
        })
    })

    describe('getStatus', () => {
        it('should return status for each product', async () => {
            const mockResults = [
                { pass: 10, fail: 2, skip: 3 },
                { pass: 10, fail: 2, skip: 3 },
                { pass: 10, fail: 2, skip: 3 },
                { pass: 10, fail: 2, skip: 3 },
                { pass: 10, fail: 2, skip: 3 },
                { pass: 10, fail: 2, skip: 3 },
                { pass: 10, fail: 2, skip: 3 },
            ]
            mockResults.forEach((result, index) => {
                jest.spyOn(db_queries, 'getLastResult').mockResolvedValueOnce(
                    result
                )
            })

            await request(createServer())
                .get('/api/v1/e2e/status')
                .expect(200)
                .then((response) => {
                    expect(response.body).toHaveLength(7)
                    response.body.forEach((item: Record<string, any>) => {
                        expect(item).toHaveProperty('name')
                        expect(item).toHaveProperty('status')
                        expect(item).toHaveProperty('result')
                    })
                })
        })

        it('should return default value if there is no result for a product', async () => {
            jest.spyOn(db_queries, 'getLastResult').mockResolvedValueOnce([])

            await request(createServer())
                .get('/api/v1/e2e/status')
                .expect(200)
                .then((response) => {
                    expect(response.body).toHaveLength(7)

                    response.body.forEach((item: Record<string, any>) => {
                        if (item.hasOwnProperty('product')) {
                            expect(item).toHaveProperty('product')
                            expect(item).toHaveProperty('status', 'unknown')
                            expect(item).toHaveProperty(
                                'result',
                                'No results available'
                            )
                        } else {
                            expect(item).toHaveProperty('name')
                            expect(item).toHaveProperty('status')
                            expect(item).toHaveProperty('result')
                        }
                    })
                })
        })

        it('should return 500 if an error occurs', async () => {
            ;(db_queries.getLastResult as jest.Mock).mockRejectedValueOnce(
                new Error('Database error')
            )

            await request(createServer())
                .get('/api/v1/e2e/status')
                .expect(500)
                .then((response) => {
                    expect(response.body).toEqual({
                        message: 'Internal Server Error!',
                    })
                })
        })
    })
})

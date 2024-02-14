import db from './connection'
import { servicesAndProducts } from 'shared/src/service-and-product-list'
;(async () => {
    try {
        for (const product of servicesAndProducts) {
            // Create e2e table
            await db.schema.createTableIfNotExists(
                `e2e_${product.api}`,
                (table) => {
                    table.increments('id').primary()
                    table.date('date')
                    table.integer('pass')
                    table.integer('fail')
                    table.integer('skip')
                    table.string('report_url')
                }
            )
            // Create unit table
            await db.schema.createTableIfNotExists(
                `unit_${product.api}`,
                (table) => {
                    table.increments('id').primary()
                    table.timestamp('date')
                    table.string('percentage')
                    table.string('commit')
                    table.string('pull_request')
                    table.string('statement_coverage')
                    table.string('function_coverage')
                    table.string('branch_coverage')
                    table.string('line_coverage')
                    table.string('author')
                }
            )
        }

        // Create e2e_status table
        await db.schema.createTableIfNotExists('e2e_status', (table) => {
            table.increments('id').primary()
            table.string('product') // The name of the product
            table.string('status') // Status for the product (pass/fail/unknown)
            table.string('result') // Result description
        })

        console.log('Created tables for all test types and products!')
        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})()

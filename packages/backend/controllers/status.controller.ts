import { Request, Response } from 'express';
import products from '../product.json';
import { getNameByApi, getTableName } from '../utils/extractName';
import queries from '../database/db_queries';

export default class StatusController {
  async getTotalTests(req: Request, res: Response) {
    try {
      let totalTests = 0;

      for (const product of products) {
        const tableName = getTableName('e2e', product.api);

        if (!tableName) {
          return res.status(400).json({ error: 'Invalid type or product' });
        }

        const latestTestResult = await queries.getLastResult(tableName);

        if (latestTestResult) {
          totalTests +=
            latestTestResult.pass +
            latestTestResult.fail +
            latestTestResult.skip;
        }
      }

      res.status(200).json({ totalTests });
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error!',
      });
    }
  }

  async getStatus(req: Request, res: Response) {
    try {
      const results = [];

      for (const product of products) {
        const tableName = getTableName('e2e', product.api);

        if (!tableName) {
          return res.status(400).json({ error: 'Invalid type or product' });
        }

        const lastResult = await queries.getLastResult(tableName);

        if (!lastResult) {
          results.push({
            product,
            status: 'unknown',
            result: 'No results available',
          });
        } else {
          const overallStatus = lastResult.fail > 0 ? 'fail' : 'pass';
          const totalTests =
            lastResult.pass + lastResult.fail + lastResult.skip;

          const passPercentage = (
            ((lastResult.pass + lastResult.skip) / totalTests) *
            100
          ).toFixed(0);
          const overallResult = `${passPercentage}% test pass`;

          results.push({
            name: getNameByApi(product.api),
            status: overallStatus,
            result: overallResult,
          });
        }
      }

      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error!',
      });
    }
  }
}

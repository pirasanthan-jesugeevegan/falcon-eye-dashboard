import { Request, Response } from 'express';
import db from '../database/connection';
const products = [
  {
    name: 'Identity Service',
    slug: 'identity-service',
    icon: 'FingerprintIcon',
    api: 'identity_service',
  },
  {
    name: 'Key Distribution Service',
    slug: 'key-distribution-service',
    icon: 'SupportIcon',
    api: 'key_distribution_service',
  },
  {
    name: 'Ledger Support Tool',
    slug: 'ledger-support-tool',
    icon: 'PaidIcon',
    api: 'ledger_support_tool',
  },
  {
    name: 'Transaction Protection',
    slug: 'transaction-protection',
    icon: 'SosIcon',
    api: 'transaction_protection',
  },
  {
    name: 'Recovery as a service',
    slug: 'recovery-as-a-service',
    icon: 'SupportAgentIcon',
    api: 'recovery_as_a_service',
  },
  {
    name: 'Secure Data Service',
    slug: 'secure-data-service',
    icon: 'ShieldIcon',
    api: 'secure_data_service',
  },
];
const getTableName = (type: string, product: string) => {
  if (type === 'e2e' || type === 'unit') {
    return `${type}_${product}`;
  }
  return null;
};
const getNameByApi = (value: string) => {
  const item = products.find((item) => item.api === value);
  return item ? item.name : null;
};
export default class StatusController {
  async getTotalTests(req: Request, res: Response) {
    try {
      let totalTests = 0;

      for (const product of products) {
        const tableName = getTableName('e2e', product.api);

        if (!tableName) {
          return res.status(400).json({ error: 'Invalid type or product' });
        }

        const latestTestResult = await db(tableName)
          .select()
          .orderBy('id', 'desc')
          .first();

        if (latestTestResult) {
          totalTests +=
            latestTestResult.pass +
            latestTestResult.fail +
            latestTestResult.skip;
        }
      }

      res.status(201).json({ totalTests });
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

        const lastResult = await db(tableName)
          .select()
          .orderBy('id', 'desc')
          .first();

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

import { Request, Response } from 'express';
import db from '../database/connection';
import { getTableName } from '../utils/extractName';
import createE2eSchema from '../models/create-e2e-model';
import createUnitSchema from '../models/create-unit-model';
import queries from '../database/db_queries';

export default class ProductsController {
  async getAllDataFromTable(req: Request, res: Response) {
    const { type, product } = req.params;
    try {
      const tableName = getTableName(type, product);

      if (!tableName) {
        return res.status(400).json({ error: 'Invalid type or product' });
      }

      const rawData = await queries.getTable(tableName);

      let data;

      if (type === 'unit') {
        data = rawData.reduce((acc, item) => {
          const existingItem = acc.find(
            (groupedItem: { pull_request: any }) =>
              groupedItem.pull_request === item.pull_request
          );

          if (existingItem) {
            existingItem.result.push({
              id: item.id,
              date: item.date,
              commit: item.commit,
              percentage: item.percentage,
              statement_coverage: item.statement_coverage,
              function_coverage: item.function_coverage,
              branch_coverage: item.branch_coverage,
              line_coverage: item.line_coverage,
              author: item.author,
            });
          } else {
            acc.push({
              id: item.id,
              pull_request: item.pull_request,
              result: [
                {
                  id: item.id,
                  date: item.date,
                  commit: item.commit,
                  percentage: item.percentage,
                  statement_coverage: item.statement_coverage,
                  function_coverage: item.function_coverage,
                  branch_coverage: item.branch_coverage,
                  line_coverage: item.line_coverage,
                  author: item.author,
                },
              ],
            });
          }

          return acc;
        }, []);
      } else {
        data = rawData;
      }

      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error!',
      });
    }
  }
  async createData(req: Request, res: Response) {
    const { type, product } = req.params;

    try {
      const tableName = getTableName(type, product);

      if (!tableName) {
        return res.status(400).json({ error: 'Invalid type or product' });
      }

      let dataToInsert;

      if (type === 'e2e') {
        dataToInsert = createE2eSchema.validateSync(
          {
            date: req.body.date,
            pass: req.body.pass,
            fail: req.body.fail,
            skip: req.body.skip,
            report_url: req.body.report_url,
          },
          {
            abortEarly: false,
            stripUnknown: true,
          }
        );
      } else if (type === 'unit') {
        dataToInsert = createUnitSchema.validateSync(
          {
            date: req.body.date,
            percentage: req.body.percentage,
            pull_request: req.body.pull_request,
            commit: req.body.commit,
            statement_coverage: req.body.statement_coverage,
            function_coverage: req.body.function_coverage,
            branch_coverage: req.body.branch_coverage,
            line_coverage: req.body.line_coverage,
            author: req.body.author,
          },
          {
            abortEarly: false,
            stripUnknown: true,
          }
        );
      }

      await db(tableName).insert(dataToInsert);

      res.status(201).json({ message: 'Data added successfully' });
    } catch (err: any) {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({
        message: 'Internal Server Error!',
      });
    }
  }
  async deleteDataRow(req: Request, res: Response) {
    const { type, product, id } = req.params;

    try {
      const tableName = getTableName(type, product);

      if (!tableName) {
        return res.status(400).json({ error: 'Invalid type or product' });
      }

      const deletedRows = await queries.deleteData(tableName, id);
      if (deletedRows > 0) {
        res.status(200).json({ message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ error: 'Data not found' });
      }
    } catch (err: any) {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.errors });
      }
      res.status(500).json({
        message: 'Internal Server Error!',
      });
    }
  }
}

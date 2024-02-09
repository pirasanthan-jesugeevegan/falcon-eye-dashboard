import db from './connection';

export default {
  getLastResult: async (tableName: string) =>
    await db(tableName).select().orderBy('id', 'desc').first(),
  getTable: async (tableName: string) => await db(tableName).select(),
  insertData: async (tableName: string, dataToInsert: any) =>
    await db(tableName).insert(dataToInsert),
  deleteData: async (tableName: string, id: number | string) =>
    await db(tableName).where({ id }).del(),
};

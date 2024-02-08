import { Knex, knex } from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    connectionString:
      'postgres://testing_db_fq98_user:Bs98A2D5R9kPM4psolfkTgcypJVE9tsc@dpg-cmn72to21fec73copj40-a.oregon-postgres.render.com/testing_db_fq98',
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default db;

import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();
// // app.js
// import postgres from 'postgres';
// import express from 'express';

// require('dotenv').config();
// const app = express();
// const db = postgres();
// const {Pool} = require('pg');
// app.get('/',async (req, res) => {
//     const {rows}=  await db.query('SELECT NOW()');
//     res.send('Current time: ${rows[0].now}');
// });

// // app.js
// let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// const sql = postgres({
//   host: PGHOST,
//   database: PGDATABASE,
//   username: PGUSER,
//   password: PGPASSWORD,
//   port: 5432,
//   ssl: 'require',
//   connection: {
//     options: `project=${ENDPOINT_ID}`,
//   },
// });

// async function getPgVersion() {
//   const result = await sql`select version()`;
//   console.log(result);
// }

// getPgVersion();


// const PORT = process.env.PORT || 5000;
// app.liste(PORT, () => console.log(`Server started on port ${PORT}`));

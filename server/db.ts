import pkg from "pg";
const { Pool } = pkg;

const db_pool = new Pool({
  user: "postgres",
  password: "postgres",
  database: "verbose_db",
  host: "localhost",
  port: 5432,
});

export default db_pool;

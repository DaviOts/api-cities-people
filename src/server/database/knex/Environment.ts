import { Knex } from "knex";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "..", "..", "..", "..", ".env"),
});

export const development: Knex.Config = {
  client: "pg",
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "postgres",
    port: Number(process.env.DB_PORT) || 5432,
  },
};

export const test: Knex.Config = {
  ...development,
  client: "sqlite3",
  useNullAsDefault: true,
  connection: ":memory:",
};

export const production: Knex.Config = {
  ...development,
};

import { createPool } from "mysql2/promise";
import "dotenv/config";

//Main data to access the database
export const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "management_system",
  port: 3306,
});

import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

import routes from "./routes/manage.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(5000);
console.log("The server is in the PORT: ", PORT);

/*const mysql = require("mysql2");

var conn = mysql.createConnection({
  host: "webdemo.mysql.database.azure.com",
  user: "jason",
  password: "J@son853",
  database: "management_system",
  port: 3306,
});

conn.query("SELECT * FROM category", function (err, results, fields) {
  console.log(results);
  console.log(fields);
});*/

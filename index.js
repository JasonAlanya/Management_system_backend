import "dotenv/config";
import express from "express";
import cors from "cors";
import { PORT } from "./config.js";

import routes from "./routes/manage.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT);
console.log("The server is in the PORT: ", PORT);

app.get("/", (req, res) => {
  console.log("Petición recibida");
  res.status(200).send("<h1>MYSQL<h1>");
});

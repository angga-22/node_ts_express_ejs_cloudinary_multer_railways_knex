import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { Dashboard, Cars } from "./routes/";
import knexConfig from "./config/db";
const PUBLIC_DIR = path.join(__dirname, "../public");
const PORT = process.env.PORT;

dotenv.config();

const app: Express = express();

app.set("knex", knexConfig);
app.set("view engine", "ejs");
app.use(express.static(PUBLIC_DIR));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use("/dashboard", Dashboard);
app.use("/cars", Cars);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

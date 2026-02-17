import express from "express";
import "dotenv/config";
import nunjucks from "nunjucks";
import path from "path";
import { fileURLToPath } from "url";

import "./shared/services/translationsYup.js";
import { router } from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..", "..");

const server = express();


nunjucks.configure(path.resolve(rootDir, "views"), {
  autoescape: true, 
  express: server, 
  watch: true, 
});
server.set("view engine", "njk");

server.use(express.static(path.resolve(rootDir, "public")));

server.use(express.json());

server.use(router);

export { server };

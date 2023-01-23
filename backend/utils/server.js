import express from "express";
import indexController from "../controllers/indexController.js";
import bodyParser from "body-parser";
import cors from "cors";

const createServer = () => {
  const app = express();

  // Middlewares
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors("*"));
  app.use(express.urlencoded({ extended: true }));

  app.post("/", indexController);
  return app;
};

export default createServer;

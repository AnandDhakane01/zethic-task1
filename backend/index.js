import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import indexController from "./controllers/indexController.js";

const port = 3000;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/", indexController);

app.listen(port, () => {
  console.log("Server listening on port 3000");
});

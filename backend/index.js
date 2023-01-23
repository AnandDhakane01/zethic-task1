import createServer from "./utils/server.js";

const port = 5000;
const app = createServer();

// routes

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

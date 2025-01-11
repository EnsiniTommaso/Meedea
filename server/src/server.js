import express from "express";
import router from "./routers/gateway.js";
import "dotenv/config";

await console.log(
  `Server booting on mode [${process.env.MODE || ".env not found"}]`
);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

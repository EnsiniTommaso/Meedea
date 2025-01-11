import express from "express";
import router from "./routers/gateway.js";
import firebaseController from "./controllers/firebase-controller.js";
import "dotenv/config";

await console.log(
  `Server booting on mode [${process.env.MODE || ".env not found"}]`
);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(router);

firebaseController.SignInNewUser("tommaso.ensini@gmail.it","mariopsw")


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


import { Router } from "express";

import queryTheDB from "../services/QueryTheDB.js";
import loadNChannels from "../services/LoadNChannels.js";
import createNewUser from "../services/CreateNewUser.js";
import logIn from "../services/LogIn.js";

const router = Router();

router.use(queryTheDB);
router.use(loadNChannels);
router.use(createNewUser);
router.use(logIn)

router.get("/", (req, res) => {
  res.send("dis a home page");
});

export default router;

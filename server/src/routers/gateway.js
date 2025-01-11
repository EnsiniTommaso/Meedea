import { Router } from "express";

import queryTheDB from "../services/QueryTheDB.js";
import signInUser from "../services/SignInUser.js";
import loadNChannels from "../services/LoadNChannels.js";

const router = Router();

router.use(signInUser);
router.use(queryTheDB);
router.use(loadNChannels);

router.get("/", (req, res) => {
  res.send("dis a home page");
});

export default router;

import { Router } from "express";
import queryTheDB from '../services/QueryTheDB.js'

const router = Router();

router.use(queryTheDB)

router.get("/", (req,res)=>{
  res.send("dis a home page")
})

export default router


import { Router } from "express";
import  db_manager  from "./db_manager.js"

var router = Router();

router.use(db_manager) 

router.get("/", (req,res)=>{
  res.send("dis a home page")
})

export default router


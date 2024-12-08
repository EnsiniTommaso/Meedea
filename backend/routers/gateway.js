import { Router } from "express";

const router = Router();

router.get("/", (req,res)=>{
  res.send("dis a home page")
})

export default router


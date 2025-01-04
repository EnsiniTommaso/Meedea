import express from "express"
const app = express()

app.post("/query-db", (req,res)=>{
  console.log(req.body)
  res.json({ response:"ciao"})
})

export default app
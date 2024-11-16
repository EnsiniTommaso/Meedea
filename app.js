import express from "express"

const app = express()
const PORT = 8080

app.get("/", (req, res)=>{
    res.send("FUNZIA!!!!")
})

app.listen(PORT)
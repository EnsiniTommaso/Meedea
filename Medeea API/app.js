import express from "express"


const app = express()
const PORT = 8080





app.get("/", (req, res)=>{
    res.send("Test nodejs ed express")
})

app.listen(PORT)
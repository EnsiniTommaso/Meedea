import express from "express"
import cookieParser from "cookie-parser"
import router from "./services/gateway.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser())

app.use(router)

app.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`)
})
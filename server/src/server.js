import express from "express"
import cookieParser from "cookie-parser"
import router from "./services/gateway.js"
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 8080


app.use(express.json())
app.use(cookieParser())

app.use(router)

app.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`)
})
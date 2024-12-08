import express from "express"
import router from "./routers/gateway.js"

const app = express()
const PORT = 8080



app.use(router)

app.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`)
})
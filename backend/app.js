import express from "express"
import router from "./routers/router.js"

const app = express()
const PORT = 8080

app.use(router)

app.listen(PORT)
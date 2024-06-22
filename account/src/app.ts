import * as dotenv from "dotenv"
import express from "express"
import accountRouter from "./router/account"

dotenv.config({path: ".env"})

const app = express()

app.use(express.json())

app.use("/account", accountRouter)

const PORT = process.env.PORT?? 3001

app.listen(PORT, () => console.log(`Working on door ${PORT}`))
import * as dotenv from "dotenv"
import express from "express"
import accountRouter from "./router/account"
import customerRouter from "./router/customer"
import "./infra/provider/kafka/consumers"

dotenv.config({path: ".env"})

const app = express()

app.use(express.json())

app.use("/account", accountRouter)
app.use("/customer", customerRouter)

const PORT = process.env.PORT?? 3001

app.listen(PORT, () => console.log(`Working on door ${PORT}`))
import * as dotenv from 'dotenv'
import express from "express";
import customerRouter from "./routes/customer"
import "./infra/provider/kafka/consumers"

dotenv.config({ path: '.env' })

const app = express()

app.use(express.json())

app.use("/customer", customerRouter)

const port = process.env.PORT ?? 3000

app.listen(port, () => console.log(`Working on door ${port}`))
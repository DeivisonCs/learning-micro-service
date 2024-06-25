import * as dotenv from 'dotenv'
import express from "express";
import transactionRouter from './routes/transaction';
import "./infra/provider/kafka/consumers"

dotenv.config({ path: '.env' })

const app = express()

app.use(express.json())
app.use("/transaction", transactionRouter)

const port = process.env.PORT ?? 3002

app.listen(port, () => console.log(`Working on door ${port}`))
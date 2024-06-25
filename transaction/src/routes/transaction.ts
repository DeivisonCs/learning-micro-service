import express from "express";
import { getTransactionHandler } from "../controller/transaction";

const router = express.Router()

router.get('/', getTransactionHandler)

export default router
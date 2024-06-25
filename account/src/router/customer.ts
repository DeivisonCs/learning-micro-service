import express from "express"
import {getCustomerHandler, transferHandler} from "../controller/customer"

const router = express.Router()

router.get("/", getCustomerHandler)
router.patch("/transfer", transferHandler)

export default router
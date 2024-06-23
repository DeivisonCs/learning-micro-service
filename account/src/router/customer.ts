import express from "express"
import {getCustomerHandler} from "../controller/customer"

const router = express.Router()

router.get("/", getCustomerHandler)

export default router
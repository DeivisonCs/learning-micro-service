import express from "express"
import {createAccountHandler, deleteAccountHandler, getAccountsHandler} from "../controller/account"

const router = express.Router()

router.get("/", getAccountsHandler)
router.delete("/", deleteAccountHandler)

export default router
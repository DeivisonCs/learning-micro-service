import express from "express"
import {createCustomerHandler, getCustomeHandler, deleteCustomerHandler} from "../controller/customer"

// const express = require("express/")
// const controller = require("../controller/customer")
const router = express.Router()

router.get("/", getCustomeHandler)
router.post("/", createCustomerHandler)
router.delete("/", deleteCustomerHandler)


export default router
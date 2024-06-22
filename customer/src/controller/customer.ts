import { Request, Response } from 'express'
import {createCustomer, getCustomer, getAllCustomers, deleteCustomer} from "../service/customer"

const service = require("../service/customer")
const kafkaProducer = require("../infra/provider/kafka/producer")


async function createCustomerHandler(req: Request, res: Response) {
    try{
        const customer = await createCustomer(req.body)
        
        res.status(201).send({
            message: "Customer created",
            customer: customer
        })
    }
    catch (error) {
        res.status(400).send({
            message: "Create customer failed",
            error: (error as Error).message
        });
    }
}

async function getCustomeHandler(req: Request, res: Response) {
    try {
        const id = req.params.id

        let customer: any

        if(id) customer = await getCustomer(id)
        else customer = await getAllCustomers()

        res.status(200).send({ customer: customer });
    } catch (error) {
        res.status(400).send({ error: (error as Error).message });
    }
}

async function deleteCustomerHandler(req: Request, res: Response) {
    try {
        const customer = await service.deleteCustomer(req.params.id);

        res.status(200).send({ message: "Customer deleted", customer: customer });
    } catch (error) {
        res.status(400).send({ error: (error as Error).message });
    }
}

export {createCustomerHandler, getCustomeHandler, deleteCustomerHandler}
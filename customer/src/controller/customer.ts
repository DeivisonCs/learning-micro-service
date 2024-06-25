import { Request, Response } from 'express'
import {createCustomer, getCustomer, getAllCustomers, deleteCustomer} from "../service/customer"
import { kafkaSendMessage } from '../infra/provider/kafka/producer'


async function createCustomerHandler(req: Request, res: Response) {
    try{
        const customer = await createCustomer(req.body)

        const kafkaProducer = new kafkaSendMessage()
        await kafkaProducer.execute("CUSTOMER_CREATED", {
            originId: customer.id,
            email: customer.email
        })

        res.status(201).send({
            message: "Customer created",
            customer: customer
        })
    }
    catch (error) {
        res.status(400).send({
            message: "Create customer failed",
            error: error
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
        res.status(400).send({ error: error });
    }
}

async function deleteCustomerHandler(req: Request, res: Response) {
    try {
        const customer = await deleteCustomer(req.params.id)

        if(customer){
            const kafkaProducer = new kafkaSendMessage()
            await kafkaProducer.execute("CUSTOMER_DELETED", {
                originId: customer.id
            })
        }

        res.status(200).send({ message: "Customer deleted"});
    } catch (error) {
        res.status(400).send({ error: error });
    }
}

export {createCustomerHandler, getCustomeHandler, deleteCustomerHandler}
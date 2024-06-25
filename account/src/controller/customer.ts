import {getAllCustomers, getCustomer} from "../service/customer"
import { Response, Request } from "express"
import { updateAmountHandler } from "./account"
import { kafkaSendMessage } from "../infra/provider/kafka/producer"


async function getCustomerHandler(req: Request, res: Response) {
    try{
        const costumers = await getAllCustomers()

        res.status(200).send({customers:costumers})
    }
    catch(error){
        res.status(400).send({error:error})
    }
}

async function transferHandler(req: Request, res: Response) {
    try{
        const depositStatus =  await updateAmountHandler(req.body.fromId, req.body.amount, "DEPOSIT")

        if(depositStatus === "Amount deposited") {
            const recieveStatus = await updateAmountHandler(req.body.toId, req.body.amount, "RECIEVE")

            if(recieveStatus === "Amount received") {

                // Try to add AWAIT
                sendTransferLog(req.body.fromId, req.body.toId, req.body.amount)

                res.status(200).send({result: recieveStatus})

            }
            else res.status(400).send({result: recieveStatus})
        }
        else{   
            res.status(400).send({result: depositStatus})
        }
    }
    catch(error){
        res.status(400).send({error:error})
    }
}

async function sendTransferLog(fromId: number, toId: number, amount: number) {
    const fromCustomer = await getCustomer(fromId)
    const toCustomer = await getCustomer(toId)

    const kafkaProducer = new kafkaSendMessage()

    await kafkaProducer.execute("TRANSFER_LOG", {
        amount: amount,
        fromId: fromCustomer?.originId,
        toId: toCustomer?.originId,
    })
}

export {getCustomerHandler, transferHandler}
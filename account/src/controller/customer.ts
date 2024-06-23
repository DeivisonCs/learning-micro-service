import {getAllCustomers} from "../service/customer"
import { Response, Request } from "express"

async function getCustomerHandler(req: Request, res: Response) {
    try{
        const costumers = await getAllCustomers()

        res.status(200).send({customers:costumers})
    }
    catch(error){
        res.status(400).send({error:error})
    }
}

export {getCustomerHandler}
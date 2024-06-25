import { kafkaConsumer } from "../kafka.consumer";
import { createTransactionHandler } from "../../../../controller/transaction";
import { createCustomer, getCustomer } from "../../../../service/customer";
import Customer from "../../../../models/customer";

interface transactionAttributes {
    id: number
    amount: number
    
    fromId: number
    fromName: string
    fromAddress: string
    fromEmail: string
    
    toId: number
    toName: string
    toAddress: string
    toEmail: string
}

interface customerDatasInterface {
    originId: number
    name: string
    email: string
    address: string 
}

class customerDatas implements customerDatasInterface {
    id?: number;
    originId: number;
    name: string;
    email: string;
    address: string;

    constructor(originId: number, name: string, address: string, email: string){
        this.originId = originId
        this.name = name
        this.address = address
        this.email = email
    }
}

export async function createTransactionConsumer() {
    console.log("TRANSACTION CREATE CONSUMER IS RUNNING")
    const consumer = await kafkaConsumer("TRANSFER_RECEIPT")

    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString()
            console.log(messageToString)

            const transactionData = JSON.parse(messageToString) as transactionAttributes

            const fromCustomerDatas = new customerDatas(transactionData.fromId, transactionData.fromName, transactionData.fromAddress, transactionData.fromEmail)
            const toCustomerDatas = new customerDatas(transactionData.toId, transactionData.toName, transactionData.toAddress, transactionData.toEmail)

            const fromCustomer = await searchForCustomer(fromCustomerDatas)
            const toCustomer = await searchForCustomer(toCustomerDatas)

            transactionData.fromId = fromCustomer.id
            transactionData.toId = toCustomer.id

            await createTransactionHandler(transactionData)
        }
    })
}


async function searchForCustomer(data: customerDatasInterface): Promise<Customer> {
    let customer = await getCustomer(data.originId)

    if(customer) return customer
    
    return await createCustomer(data) 
}

createTransactionConsumer()
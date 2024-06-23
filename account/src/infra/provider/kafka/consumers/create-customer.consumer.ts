import { kafkaConsumer } from "../kafka.consumer";
import {createCustomer} from "../../../../service/customer"
import {createAccount} from "../../../../service/account"

interface Customer {
    originId: number
    email: string
}

export async function createCustomerConsumer() {
    console.log("CUSTOMER CONSUMER RUNNING")
    const consumer = await kafkaConsumer("CREATE_CUSTOMER")

    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString()
            console.log(messageToString)

            const customerData = JSON.parse(messageToString) as Customer

            const customer = await createCustomer(customerData)
            await createAccount(customer.id)
        }
    })
}

createCustomerConsumer()
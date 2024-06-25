import { kafkaConsumer } from "../kafka.consumer";
import {deleteCustomer} from "../../../../service/customer"

interface Customer {
    originId: number
}

export async function deleteCustomerConsumer() {
    console.log("CUSTOMER DELETE CONSUMER IS RUNNING")
    const consumer = await kafkaConsumer("CUSTOMER_DELETED")

    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString()
            console.log(messageToString)

            const customerData = JSON.parse(messageToString) as Customer

            const customer = await deleteCustomer(customerData.originId)
        }
    })
}

deleteCustomerConsumer()
import { kafkaConsumer } from "../kafka.consumer";
import { getCustomer } from "../../../../service/customer"
import { kafkaSendMessage } from "../producer";

interface transactionAttributes {
    amount: number
    fromId: number
    toId: number
}

export async function getTransferLogConsumer() {
    console.log("TRANSFER LOG CONSUMER IS RUNNING")
    const consumer = await kafkaConsumer("TRANSFER_LOG")

    await consumer.run({
        eachMessage: async ({message}) => {
            const messageToString = message.value!.toString()
            console.log(messageToString)

            const tranferDatas = JSON.parse(messageToString) as transactionAttributes

            const fromCustomer = await getCustomer(tranferDatas.fromId.toString())
            const toCustomer = await getCustomer(tranferDatas.toId.toString())

            const kafkaProducer = new kafkaSendMessage()

            await kafkaProducer.execute("TRANSFER_RECEIPT", {
                fromId: fromCustomer?.id,
                fromName: fromCustomer?.name,
                fromAddress: fromCustomer?.address,
                fromEmail: fromCustomer?.email,

                toId: toCustomer?.id,
                toName: toCustomer?.name,
                toAddress: toCustomer?.address,
                toEmail: toCustomer?.email,

                amount: tranferDatas.amount
            })

        }
    })
}

getTransferLogConsumer()
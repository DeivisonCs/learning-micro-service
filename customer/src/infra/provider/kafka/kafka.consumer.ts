import { kafka } from "."

export const kafkaConsumer = async (topic: string) => {
    const consumer = kafka.consumer({groupId: "CUSTOMER_APP", sessionTimeout: 30000, heartbeatInterval: 10000})
    await consumer.connect()

    await consumer.subscribe({topic, fromBeginning: true})

    return consumer
}
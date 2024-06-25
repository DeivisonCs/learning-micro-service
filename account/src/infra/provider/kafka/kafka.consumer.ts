import { kafka } from "."

export const kafkaConsumer = async (topic: string, group: string) => {
    const consumer = kafka.consumer({groupId: group, sessionTimeout: 30000, heartbeatInterval: 10000})
    await consumer.connect()

    await consumer.subscribe({topic, fromBeginning: true})

    return consumer
}
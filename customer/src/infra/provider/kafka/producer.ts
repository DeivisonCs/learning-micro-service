import { kafka } from ".";

export class kafkaSendMessage {
    async execute(topic: string, payload: any): Promise<void> {
        const producer = kafka.producer({
            allowAutoTopicCreation: true
        })

        await producer.connect()
        console.log(`\nMessage sent to topic ${topic}`)
        console.log(`Payload: ${payload}\n`)

        await producer.send({
            topic,
            messages: [
                {value: JSON.stringify(payload)}
            ]
        })

        await producer.disconnect()
    }
}
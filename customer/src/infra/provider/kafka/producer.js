const  kafka = require("./index")

async function KafkaSendMessage(topic, payload){
    const producer = kafka.producer()

    await producer.connect()
    console.log(`Message sent to topic ${topic}`)
    console.log(payload)

    await producer.send({
        topic,
        message: [
            {value: JSON.stringify(payload)}
        ]
    })

    await producer.disconnect()
}

module.exports = KafkaSendMessage
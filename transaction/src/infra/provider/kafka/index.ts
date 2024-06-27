import * as dotenv from 'dotenv'
import { Kafka, logLevel } from 'kafkajs';

dotenv.config({path: '.env'})

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER!],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_USER!,
      password: process.env.KAFKA_PASSWORD!
  },
  logLevel: logLevel.ERROR
});

export {kafka}
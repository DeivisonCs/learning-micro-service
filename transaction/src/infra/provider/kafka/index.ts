import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['right-leopard-8896-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: 'cmlnaHQtbGVvcGFyZC04ODk2JPvqA-vf4rg41UH0OQMaupbwtFxAiPrxloKl3xA',
      password: 'OTBjZDAzNWItNjc0ZS00M2M5LTlmMTAtZDQ0MDQ3ZGYyZjE5'
  },
  logLevel: logLevel.ERROR
});

export {kafka}
import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['splendid-guinea-5644-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: 'c3BsZW5kaWQtZ3VpbmVhLTU2NDQkfmi4ZvK7SHFSloTPNKatQ7ynY0_V6QDCLhE',
      password: 'M2RmYmQ5OWEtMWRhYi00YmFhLWFjOWMtYmViMDU2NzQ2Njcy'
  },
  logLevel: logLevel.ERROR,
});

export {kafka}
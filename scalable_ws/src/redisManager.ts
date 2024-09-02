import { RedisClientType, createClient } from "redis";

export class RedisManager {
  private client: RedisClientType;
  private subscriber: RedisClientType;

  private constructor() {
    this.client = createClient();
    this.client.connect();
    this.subscriber = createClient();
    this.subscriber.connect();
  }

  
}

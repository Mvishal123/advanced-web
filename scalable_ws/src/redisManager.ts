import { RedisClientType, createClient } from "redis";
import { UserManager } from "./userManager";

export class RedisManager {
  private static instance: RedisManager;
  private client: RedisClientType;
  private subscriber: RedisClientType;

  private constructor() {
    this.client = createClient();
    this.client.connect();
    this.subscriber = createClient();
    this.subscriber.connect();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  public subscribeRoom(roomId: string) {
    this.subscriber.subscribe(roomId, (message: string) => {
      console.log("SUBSCRIBED MESSAGE: ", message);

      UserManager.getInstance().sendMessage(roomId, message);
    });
  }

  public publishMessage(roomId: string, message: string) {
    this.client.publish(roomId, message);
    console.log("publishing message: ", message);
  }

  public unsubscribeRoom(roomId: string) {
    this.client.unsubscribe(roomId);
  }
}

import { WebSocket } from "ws";
import { MessageHandler, MessageType, UserType } from "./types";
import { RedisManager } from "./redisManager";

export class UserManager {
  private users: Record<string, UserType>;
  private roomDetails: Record<string, string[]>;
  private static instance: UserManager;

  private constructor() {
    this.users = {};
    this.roomDetails = {};
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserManager();
    }

    return this.instance;
  }

  addUser(ws: WebSocket) {
    const userId = this.getRandomId();

    const userDetails = {
      ws,
      rooms: [],
    };
    this.users[userId] = userDetails;
    ws.send(JSON.stringify({ type: "userId", userId }));
  }

  handleMessage(data: MessageHandler) {
    const { roomId, type, userId, message } = data;
    if (!this.users[userId]) {
      return;
    }
    switch (type) {
      case "SUBSCRIBE":
        this.subscribe(userId, roomId);
        break;

      case "UNSUBSCRIBE":
        this.unsubcribe(userId, roomId);
        break;

      case "SEND_MESSAGE":
        if (message) {
          RedisManager.getInstance().publishMessage(
            roomId,
            JSON.stringify({ userId, message })
          );
        }
        break;
    }
    // console.log(this.users);
  }

  private subscribe(userId: string, roomId: string) {
    if (this.users[userId]?.rooms.includes(roomId)) {
      return;
    }

    this.users[userId].rooms = [...this.users[userId].rooms, roomId];

    // reverseUsers logic
    if (!this.roomDetails[roomId]?.includes(userId)) {
      this.roomDetails[roomId] = (this.roomDetails[roomId] || []).concat(
        userId
      );
    }
    console.log("ROOM DETAILS: ", this.roomDetails);

    // subscribe to PUB/SUB
    if (this.isFirstSubscription(roomId, "SUBSCRIBE")) {
      RedisManager.getInstance().subscribeRoom(roomId);
      console.log("subscribing to pub/sub...");
    }
  }

  private unsubcribe(userId: string, roomId: string) {
    if (this.users[userId]?.rooms?.includes(roomId)) {
      this.users[userId].rooms = this.users[userId].rooms.filter(
        (room) => room !== roomId
      );
    }

    // reverseUsers
    if (this.roomDetails[roomId]?.includes(userId)) {
      this.roomDetails[roomId] = this.roomDetails[roomId].filter(
        (user) => userId !== user
      );
    }

    // unsubscribe from PUB/SUB
    if (this.isFirstSubscription(roomId, "UNSUBSCRIBE")) {
      RedisManager.getInstance().unsubscribeRoom(roomId);
      console.log("unsubscribing to pub/sub...");
    }
  }

  public sendMessage(_roomId: string, _message: string) {
    const { message, userId }: MessageType = JSON.parse(_message);
    this.roomDetails[_roomId]?.forEach((user) => {
      if (user !== userId) {
        this.emit(this.users[user].ws, message);
      }
    });
  }

  private isFirstSubscription(
    roomId: string,
    type: "SUBSCRIBE" | "UNSUBSCRIBE"
  ) {
    const usersInRoom = this.roomDetails[roomId]?.length;
    console.log({ usersInRoom });

    if ((type = "SUBSCRIBE")) {
      if (usersInRoom === 1) {
        return true;
      }
    } else if (type === "UNSUBSCRIBE") {
      if (usersInRoom === 0) {
        return true;
      }
    }

    return false;
  }

  private emit(ws: WebSocket, message: string) {
    ws.send(message);
  }

  private getRandomId() {
    return Math.random().toString(32) + Math.random().toString(32);
  }
}

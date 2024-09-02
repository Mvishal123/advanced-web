import { WebSocket } from "ws";
import { MessageHandler, UserType } from "./types";

export class UserManager {
  private users: Record<string, UserType>;
  private roomDetails: Record<string, string[]>;
  static instance: UserManager;

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
          this.sendMessage(userId, roomId, message);
        }
        break;
    }
    console.log(this.users);
  }

  private subscribe(userId: string, roomId: string) {
    if (this.users[userId]?.rooms.includes(roomId)) {
      return;
    }
    if (this.isFirstSubscription(roomId)) {
    }
    this.users[userId].rooms = [...this.users[userId].rooms, roomId];
  }

  private unsubcribe(userId: string, roomId: string) {
    if (this.users[userId].rooms.includes(roomId)) {
      this.users[userId].rooms = this.users[userId].rooms.filter(
        (room) => room !== roomId
      );
    }
  }

  private sendMessage(userId: string, roomId: string, message: string) {
    const isUserPartOfRoom = this.users[userId].rooms.includes(roomId);
    if (!isUserPartOfRoom) {
      this.emit(this.users[userId].ws, "User not part of the room.");
      return;
    }
    Object.keys(this.users).forEach((user) => {
      if (this.users[user].rooms.includes(roomId) && user !== userId) {
        const _message = {
          type: "message",
          message: message,
        };
        this.emit(this.users[user].ws, JSON.stringify(_message));
      }
    });
  }

  private isFirstSubscription(roomId: string) {
    let count = 0;
    Object.keys(this.users).forEach((user) => {
      if (this.users[user].rooms.includes(roomId)) {
        count++;
      }
    });

    if (count === 1) {
      return true;
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

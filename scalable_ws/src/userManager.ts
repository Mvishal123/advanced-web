import { WebSocket } from "ws";

interface UserType {
  ws: WebSocket;
  rooms: string[];
}

type MessageHandler = {
  type: "SUBSCRIBE" | "UNSUBSCRIBE" | "SEND_MESSAGE";
  userId: string;
  roomId: string;
  message?: string;
};

export class UserManager {
  private users: Record<string, UserType>;
  static instance: UserManager;

  private constructor() {
    this.users = {};
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
        if (this.users[userId]?.rooms.includes(roomId)) {
          break;
        }
        this.users[userId].rooms = [...this.users[userId].rooms, roomId];
        break;

      case "UNSUBSCRIBE":
        if (this.users[userId].rooms.includes(roomId)) {
          this.users[userId].rooms = this.users[userId].rooms.filter(
            (room) => room !== roomId
          );
        }
        break;

      case "SEND_MESSAGE":
        if (message) {
          const isUserPartOfRoom = this.users[userId].rooms.includes(roomId);
          if (!isUserPartOfRoom) {
            this.emit(this.users[userId].ws, "User not part of the room.");
            break
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
    }
    console.log(this.users);
  }

  private emit(ws: WebSocket, message: string) {
    ws.send(message);
  }

  private getRandomId() {
    return Math.random().toString(32) + Math.random().toString(32);
  }
}

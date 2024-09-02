import { WebSocket } from "ws";

export interface UserType {
  ws: WebSocket;
  rooms: string[];
}

export type MessageHandler = {
  type: "SUBSCRIBE" | "UNSUBSCRIBE" | "SEND_MESSAGE";
  userId: string;
  roomId: string;
  message?: string;
};

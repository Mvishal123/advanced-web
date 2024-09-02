// import { WebSocket } from "ws";

// interface UserType {
//   ws: WebSocket;
//   rooms: string[];
// }

// type MessageHandlerType =
//   | {
//       type: "SUBSCRIBE";
//       userId: string;
//       roomId: string;
//     }
//   | {
//       type: "UNSUBSCRIBE";
//       userId: string;
//       roomId: string;
//     }
//   | {
//       type: "MESSAGE";
//       userId: string;
//       roomId: string;
//       message: string;
//     };

// export class UserManager {
//   private users: Record<string, UserType> = {};
//   private userId: string;

//   private constructor(ws: WebSocket) {
//     this.userId = this.getRandomId();
//     this.users.set(this.userId, {
//       ws,
//       rooms: [],
//     });
//     console.log("USERS: ", this.users);
//   }

//   private getRandomId() {
//     return Math.random().toString(32).concat(Math.random().toString(32));
//   }

//   handleMessage(message: MessageHandlerType) {
//     switch (message.type) {
//       case "SUBSCRIBE":
//         this.users.get(this.userId)?.rooms.push(message.roomId);
//         console.log(this.users);
//     }
//   }

//   closeConnection() {
//     // this.users.delete(this.userId);
//     this.users 
//   }
// }

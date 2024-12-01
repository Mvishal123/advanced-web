"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const redis_1 = require("redis");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer);
const client = (0, redis_1.createClient)();
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log("A user connected: ID", socket.id);
    socket.on("disconnect", () => {
        console.log("A user disconnected");
        client.quit();
    });
    socket.on("submission", (data) => __awaiter(void 0, void 0, void 0, function* () {
        // if (!data.userId) {
        //   socket.emit("error", { message: "Invalid user ID" });
        //   return;
        // }
        // console.log("[WS]: Submission received", data.userId);
        // await client.subscribe(data.userId, (res: string) => {
        //   const data = JSON.parse(res);
        //   console.log("[WS]: Submission result", data);
        //   socket.emit("result", { ...data });
        // });
        console.log("Submission received", data);
        const parsedData = JSON.parse(data);
        console.log("Parsed data", parsedData.userId);
    }));
}));
httpServer.listen(8080, () => {
    console.log("Server is running on port 8080");
});

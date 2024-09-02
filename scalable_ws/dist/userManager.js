"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const redisManager_1 = require("./redisManager");
class UserManager {
    constructor() {
        this.users = {};
        this.roomDetails = {};
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserManager();
        }
        return this.instance;
    }
    addUser(ws) {
        const userId = this.getRandomId();
        const userDetails = {
            ws,
            rooms: [],
        };
        this.users[userId] = userDetails;
        ws.send(JSON.stringify({ type: "userId", userId }));
    }
    handleMessage(data) {
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
                    redisManager_1.RedisManager.getInstance().publishMessage(roomId, JSON.stringify({ userId, message }));
                }
                break;
        }
        // console.log(this.users);
    }
    subscribe(userId, roomId) {
        var _a, _b;
        if ((_a = this.users[userId]) === null || _a === void 0 ? void 0 : _a.rooms.includes(roomId)) {
            return;
        }
        this.users[userId].rooms = [...this.users[userId].rooms, roomId];
        // reverseUsers logic
        if (!((_b = this.roomDetails[roomId]) === null || _b === void 0 ? void 0 : _b.includes(userId))) {
            this.roomDetails[roomId] = (this.roomDetails[roomId] || []).concat(userId);
        }
        console.log("ROOM DETAILS: ", this.roomDetails);
        // subscribe to PUB/SUB
        if (this.isFirstSubscription(roomId, "SUBSCRIBE")) {
            redisManager_1.RedisManager.getInstance().subscribeRoom(roomId);
            console.log("subscribing to pub/sub...");
        }
    }
    unsubcribe(userId, roomId) {
        var _a, _b, _c;
        if ((_b = (_a = this.users[userId]) === null || _a === void 0 ? void 0 : _a.rooms) === null || _b === void 0 ? void 0 : _b.includes(roomId)) {
            this.users[userId].rooms = this.users[userId].rooms.filter((room) => room !== roomId);
        }
        // reverseUsers
        if ((_c = this.roomDetails[roomId]) === null || _c === void 0 ? void 0 : _c.includes(userId)) {
            this.roomDetails[roomId] = this.roomDetails[roomId].filter((user) => userId !== user);
        }
        // unsubscribe from PUB/SUB
        if (this.isFirstSubscription(roomId, "UNSUBSCRIBE")) {
            redisManager_1.RedisManager.getInstance().unsubscribeRoom(roomId);
            console.log("unsubscribing to pub/sub...");
        }
    }
    sendMessage(_roomId, _message) {
        var _a;
        const { message, userId } = JSON.parse(_message);
        (_a = this.roomDetails[_roomId]) === null || _a === void 0 ? void 0 : _a.forEach((user) => {
            if (user !== userId) {
                this.emit(this.users[user].ws, message);
            }
        });
    }
    isFirstSubscription(roomId, type) {
        var _a;
        const usersInRoom = (_a = this.roomDetails[roomId]) === null || _a === void 0 ? void 0 : _a.length;
        console.log({ usersInRoom });
        if ((type = "SUBSCRIBE")) {
            if (usersInRoom === 1) {
                return true;
            }
        }
        else if (type === "UNSUBSCRIBE") {
            if (usersInRoom === 0) {
                return true;
            }
        }
        return false;
    }
    emit(ws, message) {
        ws.send(message);
    }
    getRandomId() {
        return Math.random().toString(32) + Math.random().toString(32);
    }
}
exports.UserManager = UserManager;

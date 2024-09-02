"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const redis_1 = require("redis");
const userManager_1 = require("./userManager");
class RedisManager {
    constructor() {
        this.client = (0, redis_1.createClient)();
        this.client.connect();
        this.subscriber = (0, redis_1.createClient)();
        this.subscriber.connect();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisManager();
        }
        return this.instance;
    }
    subscribeRoom(roomId) {
        this.subscriber.subscribe(roomId, (message) => {
            console.log("SUBSCRIBED MESSAGE: ", message);
            userManager_1.UserManager.getInstance().sendMessage(roomId, message);
        });
    }
    publishMessage(roomId, message) {
        this.client.publish(roomId, message);
        console.log("publishing message: ", message);
    }
    unsubscribeRoom(roomId) {
        this.client.unsubscribe(roomId);
    }
}
exports.RedisManager = RedisManager;

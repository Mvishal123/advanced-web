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
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.connect();
    while (true) {
        try {
            const submission = yield redisClient.brPop("submission", 0);
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("WORKER received data: ", submission);
            console.log("WORKER processed data");
        }
        catch (err) {
            console.log("WORKER ERROR: ", err.message);
        }
    }
});
init();

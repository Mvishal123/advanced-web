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
const client = (0, redis_1.createClient)();
const processSubmission = (submission) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Processing submission", submission);
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    client.publish("submission", JSON.stringify(submission));
});
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis - worker");
            while (true) {
                const result = yield client.brPop("submission", 0);
                if (result) {
                    yield new Promise((resolve) => setTimeout(resolve, 1000));
                    // @ts-ignore
                    const value = JSON.parse(result.element);
                    processSubmission(value);
                }
            }
        }
        catch (error) {
            console.error("Error connecting to Redis - worker", error);
        }
    });
})();

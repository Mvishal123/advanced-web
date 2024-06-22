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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.get("/", (req, res) => {
    res.send("Vishal captcha server");
});
const captchaProtection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const ip = req.ip;
    console.log({ token, ip });
    console.log(process.env.CAPTCHA_SECRET_KEY);
    const verification = yield axios_1.default.post("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        secret: process.env.CAPTCHA_SECRET_KEY,
        response: token,
        remoteip: ip,
    });
    console.log(verification.data);
    if (verification.data.success) {
        console.log("verification successful");
        next();
    }
    else {
        res.status(403).json({ message: "Captcha verification failed" });
    }
});
app.post("/registeruser", captchaProtection, (req, res) => {
    res.status(200).json({ message: "User registered successfully" });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

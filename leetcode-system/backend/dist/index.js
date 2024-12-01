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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const redis_1 = require("./redis");
const schema_1 = require("./schema");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    redis_1.client.set("user", "{name: 'Vishal', age: 25}");
    const result = yield redis_1.client.get("user");
    res.send("Hello World!");
}));
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    try {
        const parsedBody = schema_1.submitReqSchema.safeParse(body);
        if (parsedBody.success) {
            const { userId, problem } = parsedBody.data;
            redis_1.client.lPush("submission", JSON.stringify({ userId, problem }));
            res.json({
                message: `Submission ID:${problem.id} received`,
            });
            return;
        }
        throw new Error("Invalid data");
    }
    catch (error) {
        res.status(400).json({
            message: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Invalid data",
        });
    }
}));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, redis_1.connectClient)();
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }
    catch (error) {
        console.error(error);
    }
});
startServer();

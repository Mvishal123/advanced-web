"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hooksRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.hooksRouter = express_1.default.Router();
exports.hooksRouter.post("/catch/:userId/:zapId", (req, res) => {
    const { userId, zapId } = req.params;
    const body = req.body;
    console.log(`User ${userId} sent a zap ${zapId}`);
    console.log(body);
    res.json({ message: "Zap received" });
});

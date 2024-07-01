"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json()); // Parse JSON bodies
let loadBalancer = 0;
app.get("/", (req, res) => {
    if (loadBalancer <= 3) {
        console.log("Req count: " + loadBalancer + 1);
        loadBalancer++;
        res.send({ success: true });
    }
    else {
        console.log("Req count limit reached: " + loadBalancer);
        res.send({ success: false });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

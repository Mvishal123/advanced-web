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
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json()); // Parse JSON bodies
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let loadLimitReached = false;
    const fetchFunc = () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield fetch("http://localhost:3000/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const respData = yield resp.json();
        console.log(respData);
        return respData;
    });
    while (!loadLimitReached) {
        const respData = yield fetchFunc();
        if (!respData.success) {
            loadLimitReached = true;
        }
    }
    console.log("LIMIT REACHED");
    res.send("server2");
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

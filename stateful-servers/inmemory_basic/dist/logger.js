"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logGames = void 0;
const store_1 = require("./store");
const logGames = () => {
    setInterval(() => {
        store_1.gameManager.showMoves();
    }, 2000);
};
exports.logGames = logGames;

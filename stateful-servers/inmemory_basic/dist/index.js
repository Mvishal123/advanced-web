"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const store_1 = require("./store");
const moves = ["h2 h3", "e3 e4", "a2 a5", "h4 g7", "f7 f8"];
let id = store_1.gameManager.createGame();
const sendGameMoves = () => {
    setInterval(() => {
        store_1.gameManager.addMove(id.toString(), moves[Math.floor(Math.random() * 10) % 4]);
    }, 3000);
};
sendGameMoves();
(0, logger_1.logGames)();

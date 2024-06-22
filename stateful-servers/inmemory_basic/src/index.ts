import { logGames } from "./logger";
import { gameManager } from "./store";

const moves = ["h2 h3", "e3 e4", "a2 a5", "h4 g7", "f7 f8"];

let id = gameManager.createGame();
const sendGameMoves = () => {
  setInterval(() => {
    gameManager.addMove(
      id.toString(),
      moves[Math.floor(Math.random() * 10) % 4]
    );
  }, 3000);
};

sendGameMoves();
logGames()

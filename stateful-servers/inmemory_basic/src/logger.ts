import { gameManager } from "./store";

export const logGames = () => {
  setInterval(() => {
    gameManager.showMoves();
  }, 2000);
};



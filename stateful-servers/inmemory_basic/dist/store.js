"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameManager = exports.DataStore = void 0;
class DataStore {
    constructor() {
        this.store = [];
    }
    addMove(id, move) {
        var _a;
        const current = (_a = this.store
            .find((match) => match.id === id)) === null || _a === void 0 ? void 0 : _a.moves.push(move);
        // console.log(this.store);
    }
    createGame() {
        const gameId = DataStore.id;
        this.store.push({ id: DataStore.id.toString(), moves: [] });
        DataStore.id++;
        return gameId;
    }
    removeGame(gameId) {
        this.store = this.store.filter((game) => game.id !== gameId);
    }
    showMoves() {
        console.log(this.store);
    }
}
exports.DataStore = DataStore;
DataStore.id = 0;
exports.gameManager = new DataStore();

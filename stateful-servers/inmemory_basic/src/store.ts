interface Store {
  id: string;
  moves: string[];
}

export class DataStore {
  private static id = 0;
  private store: Store[];

  constructor() {
    this.store = [];
  }

  public addMove(id: string, move: string) {
    const current = this.store
      .find((match) => match.id === id)
      ?.moves.push(move);

    // console.log(this.store);
  }

  public createGame() {
    const gameId = DataStore.id;
    this.store.push({ id: DataStore.id.toString(), moves: [] });
    DataStore.id++;
    return gameId;
  }

  public removeGame(gameId: string) {
    this.store = this.store.filter((game) => game.id !== gameId);
  }

  public showMoves() {
    console.log(this.store);
  }
}

export const gameManager = new DataStore();

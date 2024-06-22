export interface Store {
  id?: string;
  userId: string;
  type: "USDC" | "ETH" | "BTC" | "SOL";
}

// Singleton pattern
export class DataStore {
  private store: Store[] = [];
  private count = 0;
  private static instance: DataStore;

  // Ensures constructor cannot be called outside the class
  private constructor() {}

  public static getInstance(): DataStore {
    if (!this.instance) {
      this.instance = new DataStore();
    }
    return this.instance;
  }

  public getStoreData() {
    return this.store;
  }

  public deleteStoreData(id: string): void {
    this.store = this.store.filter((store) => store.id !== id);
  }

  public addStoreData(data: Store): void {
    this.store.push({ ...data, id: this.count.toString() });
    this.count++;
  }
}

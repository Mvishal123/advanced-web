import { startLogger } from "./logger";
import { DataStore, Store } from "./store";

const types: Store["type"][] = ["BTC", "ETH", "USDC", "SOL"];
const userIds = ["1", "2", "3", "4", "5"];

const storeData = () => {
  setInterval(() => {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const type: Store["type"] = types[Math.floor(Math.random() * types.length)];

    DataStore.getInstance().addStoreData({ userId, type });
  }, 2000);
};

storeData();
startLogger();

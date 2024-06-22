"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const store_1 = require("./store");
const types = ["BTC", "ETH", "USDC", "SOL"];
const userIds = ["1", "2", "3", "4", "5"];
const storeData = () => {
    setInterval(() => {
        const userId = userIds[Math.floor(Math.random() * userIds.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        store_1.DataStore.getInstance().addStoreData({ userId, type });
    }, 2000);
};
storeData();
(0, logger_1.startLogger)();

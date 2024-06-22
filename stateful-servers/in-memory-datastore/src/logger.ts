import { DataStore } from "./store";

export const startLogger = () => {
  setInterval(() => {
    console.log(DataStore.getInstance().getStoreData());
  }, 2000);
};

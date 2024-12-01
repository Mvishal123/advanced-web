import { createClient } from "redis";

export const client = createClient();
client.on("error", (error) => {
  console.error(error);
});

export const connectClient = async () => {
  try {
    await client.connect();
  } catch (error) {
    throw new Error("Could not connect to Redis");
  }
};

import { createClient } from "redis";

const redisClient = createClient();

const init = async () => {
  await redisClient.connect();

  while (true) {
    try {
      const submission = await redisClient.brPop("submission", 0);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("WORKER received data: ", submission);

      console.log("WORKER processed data");
    } catch (err: any) {
      console.log("WORKER ERROR: ", err.message);
    }
  }
};

init();

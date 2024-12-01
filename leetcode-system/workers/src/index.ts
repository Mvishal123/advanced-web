import { createClient } from "redis";

const client = createClient();

type Submission = {
  userId: string;
  problem: {
    id: string;
    code: string;
  };
};

const processSubmission = async (submission: Submission) => {
  console.log("Processing submission", submission);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  client.publish(submission.userId, JSON.stringify(submission));
};

(async function () {
  try {
    await client.connect();
    console.log("Connected to Redis - worker");

    while (true) {
      const result = await client.brPop("submission", 0);
      if (result) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // @ts-ignore
        const value = JSON.parse(result.element);
        processSubmission(value);
      }
    }
  } catch (error) {
    console.error("Error connecting to Redis - worker", error);
  }
})();

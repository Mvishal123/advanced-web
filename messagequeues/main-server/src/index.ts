import express, { Request, Response } from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());
const redisClient = createClient();

app.post("/submit", async (req: Request, res: Response) => {
  const { id, userId, problem } = req.body;

  try {
    await redisClient.lPush(
      "submission",
      JSON.stringify({ id, userId, problem })
    );

    console.log(`Submission saved to Redis with id: ${id}`);
    res.status(200).send({ message: "Submission saved successfully" });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

const connectRedisClient = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected");
  } catch (error: any) {
    console.error("[ERROR] redis connection failed", error.message);
  }
};

connectRedisClient();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

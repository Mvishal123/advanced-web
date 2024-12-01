require("dotenv").config();

import express from "express";
import cors from "cors";
import { client, connectClient } from "./redis";
import * as zod from "zod";
import { submitReqSchema } from "./schema";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  client.set("user", "{name: 'Vishal', age: 25}");
  const result = await client.get("user");

  res.send("Hello World!");
});

app.post("/submit", async (req, res) => {
  const body = req.body;
  try {
    const parsedBody = submitReqSchema.safeParse(body);
    if (parsedBody.success) {
      const { userId, problem } = parsedBody.data;

      client.lPush("submission", JSON.stringify({ userId, problem }));
      res.json({
        message: `Submission ID:${problem.id} received`,
      });
      return;
    }
    throw new Error("Invalid data");
  } catch (error: any) {
    res.status(400).json({
      message: error?.message ?? "Invalid data",
    });
  }
});

const startServer = async () => {
  try {
    await connectClient();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

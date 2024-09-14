import express from "express";

export const hooksRouter = express.Router();

hooksRouter.post("/catch/:userId/:zapId", (req, res) => {
  const { userId, zapId } = req.params;
  const body = req.body;

  console.log(`User ${userId} sent a zap ${zapId}`);
  console.log(body);

  res.json({ message: "Zap received" });
});

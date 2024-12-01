import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

export const hooksRouter = express.Router();

const prisma = new PrismaClient();

hooksRouter.post(
  "/catch/:userId/:zapId",
  async (req: Request, res: Response) => {
    const { userId, zapId } = req.params;
    const body = req.body;

    const zapCreate = await prisma.$transaction(async (tx) => {
      const zapRun = await tx.zapRun.create({
        data: {
          zapId: zapId,
          metadata: body,
        },
      });

      const zapRunOutBox = await tx.zapRunOutbox.create({
        data: {
          zapRunId: zapRun.id,
        },
      });
    });

    res.json({ message: "Zap received" });
  }
);

import * as z from "zod";

export const submitReqSchema = z.object({
  userId: z.string(),
  problem: z.object({
    id: z.string(),
    code: z.string(),
  }),
});

import express from "express";
import { hooksRouter } from "./routes/hooks";

const app = express();
app.use(express.json());

app.use("/hooks", hooksRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

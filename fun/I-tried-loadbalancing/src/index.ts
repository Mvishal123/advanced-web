import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies

let loadBalancer = 0;

app.get("/", (req: Request, res: Response) => {
  if (loadBalancer <= 3) {
    console.log("Req count: " + loadBalancer + 1);
    loadBalancer++;
    res.send({ success: true });
  } else {
    console.log("Req count limit reached: " + loadBalancer);

    res.send({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

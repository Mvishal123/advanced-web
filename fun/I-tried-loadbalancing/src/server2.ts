import express, { Request, Response } from "express";
const app = express();
const port = 3001;

app.use(express.json()); // Parse JSON bodies

app.get("/", async (req: Request, res: Response) => {
  let loadLimitReached = false;
  const fetchFunc = async () => {
    const resp = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respData = await resp.json();
    console.log(respData);

    return respData;
  };

  while (!loadLimitReached) {
    const respData = await fetchFunc();

    if (!respData.success) {
      loadLimitReached = true;
    }
  }

  console.log("LIMIT REACHED");

  res.send("server2");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

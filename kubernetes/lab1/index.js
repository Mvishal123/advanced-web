const express = require("express");
const app = express();
const port = 3000;

const CONFIGS = {
  NAME: process.env.NAME || "John Doe",
  AGE: process.env.AGE || "100",
};

app.get("/", (req, res) => {
  res.send(`
        <h1>Config variables</h1>
        <pre>${JSON.stringify(CONFIGS)}</pre>
    `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

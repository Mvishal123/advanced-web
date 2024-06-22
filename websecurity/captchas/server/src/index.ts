import express, { NextFunction, Request, response, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.get("/", (req, res) => {
  res.send("Vishal captcha server");
});

const captchaProtection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  const ip = req.ip;

  const verification = await axios.post(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      secret: process.env.CAPTCHA_SECRET_KEY,
      response: token,
      remoteip: ip,
    }
  );

  if (verification.data.success) {
    console.log("verification successful");

    next();
  } else {
    res.status(403).json({ message: "Captcha verification failed" });
  }
};

app.post("/registeruser", captchaProtection, (req: Request, res: Response) => {
  res.status(200).json({ message: "User registered successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

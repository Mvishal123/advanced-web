import { Client, GatewayIntentBits } from "discord.js";
import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences],
});

client.once("ready", () => {
  console.log("Discord bot is ready!");
  checkUserStatus();
});

let status: string = "";

async function checkUserStatus() {
  try {
    const guild = client.guilds.cache.first();

    if (!guild) throw new Error("Bot is not in any guilds.");

    const member = await guild.members.fetch(process.env.DISCORD_USERID!);
    if (!member) throw new Error("User not found in the guild.");

    const presence = member.presence;
    console.log("User presence:", presence?.status);
    status = presence?.status || "offline";
  } catch (error) {
    console.error("Error fetching user status:", error);
    status = "offline";
  }
}

client.login(process.env.DISCORD_TOKEN);

const wss = new WebSocketServer({ server: app.listen(8080) });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ status }));

  client.on("presenceUpdate", async (oldPresence, newPresence) => {
    status = newPresence.status || "offline";
    ws.send(JSON.stringify({ status }));
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

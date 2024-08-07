import cors from "cors";
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import express from "express";
import { WebSocketServer } from "ws";

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

let user: Record<string, string | boolean> = {};
let activity = null;

async function checkUserStatus() {
  try {
    const guild = client.guilds.cache.first();

    if (!guild) throw new Error("Bot is not in any guilds.");

    const member = await guild.members.fetch(process.env.DISCORD_USERID!);
    if (!member) throw new Error("User not found in the guild.");

    const presence = member.presence;
    user["userId"] = member.user.id;
    user["avatar"] = member.user.avatar || "";
    user["status"] = presence?.status || "offline";
    // console.log({ user });
    activity = member.presence?.activities[0];
  } catch (error) {
    console.error("Error fetching user status:", error);
    user["status"] = "offline";
  }
}

client.login(process.env.DISCORD_TOKEN);

const wss = new WebSocketServer({ server: app.listen(8080) });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "user_status", user, activity: activity! }));

  client.on("presenceUpdate", async (oldPresence, newPresence) => {
    user["status"] = newPresence.status || "offline";
    const activity = newPresence.activities[0];

    ws.send(JSON.stringify({ type: "user_activity", activity, user }));
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});

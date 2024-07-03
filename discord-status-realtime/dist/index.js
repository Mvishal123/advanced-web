"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildPresences],
});
client.once("ready", () => {
    console.log("Discord bot is ready!");
    checkUserStatus();
});
let status = "";
function checkUserStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const guild = client.guilds.cache.first();
            if (!guild)
                throw new Error("Bot is not in any guilds.");
            const member = yield guild.members.fetch(process.env.DISCORD_USERID);
            if (!member)
                throw new Error("User not found in the guild.");
            const presence = member.presence;
            // const activity = presence?.activities || [];
            // console.log({ activity });
            console.log("User presence:", presence === null || presence === void 0 ? void 0 : presence.status);
            status = (presence === null || presence === void 0 ? void 0 : presence.status) || "offline";
        }
        catch (error) {
            console.error("Error fetching user status:", error);
            status = "offline";
        }
    });
}
client.login(process.env.DISCORD_TOKEN);
const wss = new ws_1.WebSocketServer({ server: app.listen(8080) });
wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ status }));
    client.on("presenceUpdate", (oldPresence, newPresence) => __awaiter(void 0, void 0, void 0, function* () {
        status = newPresence.status || "offline";
        const activity = newPresence.activities[0];
        ws.send(JSON.stringify({ status, activity }));
    }));
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

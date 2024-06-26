"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Vishal tries to hack the server. hahahaha");
});
const otpStore = {};
app.post("/generate-otp", (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    // generates a 6 sigit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`OTP generated for ${email} is ${otp}`);
    otpStore[email] = otp.toString();
    console.log(otpStore);
    return res.status(200).json({ otp });
});
app.post("/verify-otp", (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res
            .status(400)
            .json({ message: "Email, OTP and New Password is required" });
    }
    if (otpStore[email] !== otp) {
        return res.status(401).json({ message: "Invalid OTP" });
    }
    console.log(`Password changed for ${email} to ${newPassword} and the OTP entered is ${otp}`);
    delete otpStore[email];
    return res.status(200).json({ message: "Password changed successfully" });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

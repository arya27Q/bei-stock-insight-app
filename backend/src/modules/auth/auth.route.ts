import { Router } from "express";
import { authController } from "./auth.controller.js";
import { createRateLimiter } from "../../config/rate-limit.js";

export const authRouter = Router();

// Proteksi brute-force pada endpoint kredensial (maks 20 request per menit per IP)
const authLimiter = createRateLimiter(20, 60 * 1000);
// Proteksi lebih ketat pada OTP reset kata sandi (maks 10 request per menit per IP)
const resetLimiter = createRateLimiter(10, 60 * 1000);

authRouter.post("/register", authLimiter, authController.register);
authRouter.post("/login", authLimiter, authController.login);
authRouter.get("/me", authController.getMe);
authRouter.put("/profile", authController.updateProfile);
authRouter.post("/forgot-password", resetLimiter, authController.forgotPassword);
authRouter.post("/reset-password", resetLimiter, authController.resetPassword);
authRouter.post("/logout", authController.logout);

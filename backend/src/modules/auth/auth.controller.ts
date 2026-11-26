import { Request, Response } from "express";
import crypto from "crypto";
import { authRepository } from "./auth.repository.js";
import { hashPassword, verifyPassword, generateToken, verifyToken } from "./auth.utils.js";

function sanitizeUser(user: any) {
  const { password, resetToken, resetTokenExpires, ...safe } = user;
  return safe;
}

const VALID_EXPERIENCE_LEVELS = ["Pemula", "Menengah", "Mahir"];

function extractVerifiedEmail(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    const payload = verifyToken(token);
    if (payload?.email) {
      return payload.email;
    }
  }
  return null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const authController = {
  // POST /api/auth/register
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, experienceLevel, preferredSectors, bio } = req.body;

      if (!name || typeof name !== "string" || !name.trim() || name.trim().length > 120) {
        res.status(400).json({ status: "error", message: "Nama lengkap wajib diisi (maksimal 120 karakter)." });
        return;
      }
      if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim()) || email.trim().length > 255) {
        res.status(400).json({ status: "error", message: "Email Anda salah. Gunakan format email yang valid." });
        return;
      }
      if (!password || typeof password !== "string" || password.length < 6 || password.length > 128) {
        res.status(400).json({ status: "error", message: "Kata sandi wajib antara 6 hingga 128 karakter." });
        return;
      }

      const safeExp = VALID_EXPERIENCE_LEVELS.includes(experienceLevel) ? experienceLevel : "Pemula";
      const safeBio = typeof bio === "string" ? bio.slice(0, 1000) : "Investor baru di Bursa Efek Indonesia.";

      const existing = await authRepository.findByEmail(email);
      if (existing) {
        res.status(409).json({
          status: "error",
          message: "Akun Anda sudah terdaftar. Silakan masuk menggunakan akun tersebut.",
        });
        return;
      }

      const passwordHash = hashPassword(password);
      const newUser = await authRepository.createUser({
        name: name.trim(),
        email: email.trim(),
        passwordHash,
        experienceLevel: safeExp,
        preferredSectors: Array.isArray(preferredSectors) ? preferredSectors.slice(0, 10) : ["Keuangan", "Barang Konsumsi Primer"],
        bio: safeBio,
      });

      const token = generateToken({ id: newUser.id, email: newUser.email, name: newUser.name });

      res.status(201).json({
        status: "success",
        message: "Pendaftaran akun investor berhasil.",
        token,
        data: sanitizeUser(newUser),
      });
    } catch (err: unknown) {
      console.error("[authController.register] Error:", err);
      res.status(500).json({ status: "error", message: "Terjadi kesalahan saat memproses pendaftaran." });
    }
  },

  // POST /api/auth/login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password || typeof email !== "string" || typeof password !== "string") {
        res.status(400).json({ status: "error", message: "Email dan kata sandi wajib diisi." });
        return;
      }

      if (!EMAIL_REGEX.test(email.trim())) {
        res.status(400).json({ status: "error", message: "Email Anda salah. Periksa kembali format email Anda." });
        return;
      }

      const user = await authRepository.findByEmail(email);
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "Email Anda belum terdaftar. Silakan daftar akun terlebih dahulu.",
        });
        return;
      }

      if (!verifyPassword(password, user.password)) {
        res.status(401).json({
          status: "error",
          message: "Kata sandi Anda salah. Silakan periksa kembali kata sandi Anda.",
        });
        return;
      }

      const token = generateToken({ id: user.id, email: user.email, name: user.name });

      res.json({
        status: "success",
        message: "Berhasil masuk ke akun investor.",
        token,
        data: sanitizeUser(user),
      });
    } catch (err: unknown) {
      console.error("[authController.login] Error:", err);
      res.status(500).json({ status: "error", message: "Terjadi kesalahan saat memproses login." });
    }
  },

  // GET /api/auth/me
  async getMe(req: Request, res: Response) {
    try {
      const email = extractVerifiedEmail(req);

      if (!email) {
        res.status(401).json({ status: "error", message: "Sesi tidak terotentikasi atau token tidak valid." });
        return;
      }

      const user = await authRepository.findByEmail(email);
      if (!user) {
        res.status(404).json({ status: "error", message: "Pengguna tidak ditemukan." });
        return;
      }

      res.json({
        status: "success",
        data: sanitizeUser(user),
      });
    } catch (err: unknown) {
      console.error("[authController.getMe] Error:", err);
      res.status(500).json({ status: "error", message: "Terjadi kesalahan saat memuat data profil." });
    }
  },

  // PUT /api/auth/profile
  async updateProfile(req: Request, res: Response) {
    try {
      const email = extractVerifiedEmail(req);

      if (!email) {
        res.status(401).json({ status: "error", message: "Token autentikasi diperlukan untuk memperbarui profil." });
        return;
      }

      const { name, experienceLevel, initialCapital, initialCapitalLabel, preferredSectors, bio, notificationsEnabled } = req.body;

      const updated = await authRepository.updateProfile(email, {
        name: typeof name === "string" ? name.trim().slice(0, 120) : undefined,
        experienceLevel: VALID_EXPERIENCE_LEVELS.includes(experienceLevel) ? experienceLevel : undefined,
        initialCapital: typeof initialCapital === "number" && initialCapital >= 0 ? initialCapital : undefined,
        initialCapitalLabel: typeof initialCapitalLabel === "string" ? initialCapitalLabel.slice(0, 50) : undefined,
        preferredSectors: Array.isArray(preferredSectors) ? preferredSectors.slice(0, 10) : undefined,
        bio: typeof bio === "string" ? bio.slice(0, 1000) : undefined,
        notificationsEnabled: typeof notificationsEnabled === "boolean" ? notificationsEnabled : undefined,
      });

      res.json({
        status: "success",
        message: "Profil investor berhasil diperbarui.",
        data: sanitizeUser(updated),
      });
    } catch (err: unknown) {
      console.error("[authController.updateProfile] Error:", err);
      res.status(500).json({ status: "error", message: "Gagal memperbarui profil pengguna." });
    }
  },

  // POST /api/auth/forgot-password
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
        res.status(400).json({ status: "error", message: "Email Anda salah. Periksa kembali format email Anda." });
        return;
      }

      const user = await authRepository.findByEmail(email);
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "Email Anda belum terdaftar. Silakan daftar akun terlebih dahulu.",
        });
        return;
      }

      const resetCode = crypto.randomInt(100000, 999999).toString();
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

      await authRepository.setResetToken(email, resetCode, expires);

      res.json({
        status: "success",
        message: "Kode pemulihan 6 digit berhasil dibuat untuk akun terdaftar.",
        demoResetCode: resetCode,
      });
    } catch (err: unknown) {
      console.error("[authController.forgotPassword] Error:", err);
      res.status(500).json({ status: "error", message: "Terjadi kesalahan saat memproses permintaan." });
    }
  },

  // POST /api/auth/reset-password
  async resetPassword(req: Request, res: Response) {
    try {
      const { email, code, newPassword } = req.body;
      if (!email || !code || !newPassword) {
        res.status(400).json({ status: "error", message: "Email, kode reset, dan kata sandi baru wajib diisi." });
        return;
      }

      if (newPassword.length < 6) {
        res.status(400).json({ status: "error", message: "Kata sandi baru minimal 6 karakter." });
        return;
      }

      const user = await authRepository.findByEmail(email);
      if (!user || !user.resetToken || user.resetToken !== code) {
        res.status(400).json({ status: "error", message: "Kode reset tidak valid atau telah kedaluwarsa." });
        return;
      }

      if (user.resetTokenExpires && user.resetTokenExpires < new Date()) {
        res.status(400).json({ status: "error", message: "Kode reset telah kedaluwarsa. Silakan ajukan kembali." });
        return;
      }

      const newHash = hashPassword(newPassword);
      await authRepository.updatePassword(email, newHash);

      res.json({
        status: "success",
        message: "Kata sandi berhasil diperbarui. Silakan masuk menggunakan kata sandi baru.",
      });
    } catch (err: any) {
      console.error("[authController.resetPassword] Error:", err);
      res.status(500).json({ status: "error", message: "Gagal memperbarui kata sandi." });
    }
  },

  // POST /api/auth/logout
  async logout(_req: Request, res: Response) {
    res.json({
      status: "success",
      message: "Berhasil keluar dari akun investor.",
    });
  },
};

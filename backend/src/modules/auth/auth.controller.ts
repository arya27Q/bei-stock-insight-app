import { Request, Response } from "express";
import crypto from "crypto";
import { authRepository } from "./auth.repository.js";
import { hashPassword, verifyPassword, generateToken, verifyToken } from "./auth.utils.js";

function sanitizeUser(user: any) {
  const { password, resetToken, resetTokenExpires, ...safe } = user;
  return safe;
}

export const authController = {
  // POST /api/auth/register
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, experienceLevel, preferredSectors, bio } = req.body;

      if (!name || typeof name !== "string" || !name.trim()) {
        res.status(400).json({ status: "error", message: "Nama lengkap wajib diisi." });
        return;
      }
      if (!email || typeof email !== "string" || !email.includes("@")) {
        res.status(400).json({ status: "error", message: "Alamat email tidak valid." });
        return;
      }
      if (!password || typeof password !== "string" || password.length < 6) {
        res.status(400).json({ status: "error", message: "Kata sandi minimal 6 karakter." });
        return;
      }

      const existing = await authRepository.findByEmail(email);
      if (existing) {
        res.status(409).json({ status: "error", message: "Alamat email sudah terdaftar. Silakan masuk." });
        return;
      }

      const passwordHash = hashPassword(password);
      const newUser = await authRepository.createUser({
        name: name.trim(),
        email: email.trim(),
        passwordHash,
        experienceLevel: experienceLevel || "Pemula",
        preferredSectors: Array.isArray(preferredSectors) ? preferredSectors : ["Keuangan", "Barang Konsumsi Primer"],
        bio: bio || "Investor baru di Bursa Efek Indonesia.",
      });

      const token = generateToken({ id: newUser.id, email: newUser.email, name: newUser.name });

      res.status(201).json({
        status: "success",
        message: "Pendaftaran akun investor berhasil.",
        token,
        data: sanitizeUser(newUser),
      });
    } catch (err: any) {
      console.error("[authController.register] Error:", err);
      res.status(500).json({ status: "error", message: "Terjadi kesalahan saat memproses pendaftaran." });
    }
  },

  // POST /api/auth/login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ status: "error", message: "Email dan kata sandi wajib diisi." });
        return;
      }

      const user = await authRepository.findByEmail(email);
      if (!user) {
        res.status(401).json({ status: "error", message: "Akun dengan email tersebut belum terdaftar." });
        return;
      }

      const isMatch = verifyPassword(password, user.password);
      if (!isMatch) {
        res.status(401).json({ status: "error", message: "Kata sandi yang Anda masukkan salah." });
        return;
      }

      const token = generateToken({ id: user.id, email: user.email, name: user.name });

      res.json({
        status: "success",
        message: "Berhasil masuk ke akun investor.",
        token,
        data: sanitizeUser(user),
      });
    } catch (err: any) {
      console.error("[authController.login] Error:", err);
      res.status(500).json({ status: "error", message: "Terjadi kesalahan saat memproses login." });
    }
  },

  // GET /api/auth/me
  async getMe(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      const emailHeader = req.headers["x-user-email"] as string;

      let email = emailHeader;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        const payload = verifyToken(token);
        if (payload) {
          email = payload.email;
        }
      }

      if (!email) {
        res.status(401).json({ status: "error", message: "Sesi tidak terotentikasi." });
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
    } catch (err: any) {
      console.error("[authController.getMe] Error:", err);
      res.status(500).json({ status: "error", message: "Terjadi kesalahan saat memuat data profil." });
    }
  },

  // PUT /api/auth/profile
  async updateProfile(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      const emailHeader = (req.headers["x-user-email"] as string) || req.body.email;

      let email = emailHeader;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        const payload = verifyToken(token);
        if (payload) {
          email = payload.email;
        }
      }

      if (!email) {
        res.status(401).json({ status: "error", message: "Email pengguna diperlukan untuk memperbarui profil." });
        return;
      }

      const { name, experienceLevel, initialCapital, initialCapitalLabel, preferredSectors, bio, notificationsEnabled } = req.body;

      const updated = await authRepository.updateProfile(email, {
        name,
        experienceLevel,
        initialCapital,
        initialCapitalLabel,
        preferredSectors,
        bio,
        notificationsEnabled,
      });

      res.json({
        status: "success",
        message: "Profil investor berhasil diperbarui.",
        data: sanitizeUser(updated),
      });
    } catch (err: any) {
      console.error("[authController.updateProfile] Error:", err);
      res.status(500).json({ status: "error", message: "Gagal memperbarui profil pengguna." });
    }
  },

  // POST /api/auth/forgot-password
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        res.status(400).json({ status: "error", message: "Alamat email tidak valid." });
        return;
      }

      const user = await authRepository.findByEmail(email);
      if (!user) {
        // Demi keamanan, tetap berikan pesan umum agar tidak mengungkap keberadaan email
        res.json({
          status: "success",
          message: "Jika email terdaftar, instruksi pemulihan kata sandi telah dikirim.",
        });
        return;
      }

      const resetCode = crypto.randomInt(100000, 999999).toString();
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

      await authRepository.setResetToken(email, resetCode, expires);

      res.json({
        status: "success",
        message: "Instruksi dan kode pemulihan kata sandi telah dikirim ke email terdaftar.",
        demoResetCode: resetCode, // Memudahkan pengujian saat demo langsung
      });
    } catch (err: any) {
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

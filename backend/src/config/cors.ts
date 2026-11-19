import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Izinkan request tanpa origin (seperti curl, mobile app, atau server-to-server Next.js rewrite)
    if (!origin) return callback(null, true);

    // Izinkan origin terdaftar di allowedOrigins
    const isAllowed = allowedOrigins.some((allowed) => origin === allowed);
    if (isAllowed || process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    return callback(new Error("Origin tidak diizinkan oleh kebijakan CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-user-email"],
});

import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Izinkan request tanpa origin (seperti curl, mobile app, atau server-to-server rewrite)
    if (!origin) return callback(null, true);
    
    // Izinkan origin lokal atau custom domain frontend
    const isAllowed = allowedOrigins.some((allowed) => origin === allowed || origin.endsWith(".vercel.app"));
    if (isAllowed) {
      return callback(null, true);
    }
    
    return callback(null, true); // Fallback permisif untuk lingkungan development
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

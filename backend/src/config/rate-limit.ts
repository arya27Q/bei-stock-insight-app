import { Request, Response, NextFunction } from "express";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const hits = new Map<string, RateLimitRecord>();

/**
 * Middleware rate limiter ringan berbasis memori untuk mencegah brute-force & spam API
 */
export function createRateLimiter(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    const key = `${clientIp}:${req.baseUrl}${req.path}`;
    const now = Date.now();
    const record = hits.get(key);

    if (!record || now > record.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfterSec = Math.ceil((record.resetAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfterSec));
      res.status(429).json({
        status: "error",
        message: `Terlalu banyak permintaan. Silakan tunggu ${retryAfterSec} detik sebelum mencoba kembali.`,
      });
      return;
    }

    record.count += 1;
    next();
  };
}

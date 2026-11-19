import crypto from "crypto";

/**
 * Hash password menggunakan algoritma scrypt dengan salt acak 16-byte
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

/**
 * Verifikasi kecocokan password terhadap hash scrypt tersimpan
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash) return false;
  
  // Format salt:derivedKey
  if (!storedHash.includes(":")) {
    return password === storedHash;
  }
  
  const [salt, key] = storedHash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

/**
 * Buat JSON Web Token (JWT) standar HS256 masa berlaku 7 hari
 */
export function generateToken(payload: { id: string; email: string; name: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  const secret = process.env.JWT_SECRET || "bei_stock_insight_secret_key_2024";
  const signature = crypto.createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

/**
 * Verifikasi dan decode JWT token
 */
export function verifyToken(token: string): { id: string; email: string; name: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const secret = process.env.JWT_SECRET || "bei_stock_insight_secret_key_2024";
    const expectedSig = crypto.createHmac("sha256", secret).update(`${header}.${body}`).digest("base64url");
    if (signature !== expectedSig) return null;
    
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf-8"));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Token kedaluwarsa
    }
    return payload;
  } catch {
    return null;
  }
}

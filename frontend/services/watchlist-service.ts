import { getStoredToken } from "./auth-service";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const WATCHLIST_STORAGE_KEY = "bei_stock_insight_watchlist";

function getWatchlistStorageKey(email?: string): string {
  const scope = (email || "guest").toLowerCase().trim();
  return `${WATCHLIST_STORAGE_KEY}_${scope}`;
}

function buildAuthHeaders(): Record<string, string> {
  const token = getStoredToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const DEFAULT_WATCHLIST_TICKERS: string[] = [];

/**
 * Membaca watchlist akun dari localStorage sebagai cadangan offline
 */
export function getStoredWatchlist(email?: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getWatchlistStorageKey(email));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Menyimpan watchlist akun ke localStorage
 */
export function saveStoredWatchlist(tickers: string[], email?: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getWatchlistStorageKey(email), JSON.stringify(tickers));
  } catch (err) {
    console.error("[WatchlistService] Gagal simpan ke localStorage:", err);
  }
}

/**
 * Mengambil daftar watchlist dari Backend API (dengan fallback localStorage khusus akun aktif)
 */
export async function fetchWatchlist(email?: string): Promise<string[]> {
  if (!email) return [];
  try {
    const res = await fetch(`${API_BASE_URL}/watchlist?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: buildAuthHeaders(),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const json = await res.json();
    if (json.status === "success" && Array.isArray(json.tickers)) {
      saveStoredWatchlist(json.tickers, email);
      return json.tickers;
    }
    return getStoredWatchlist(email);
  } catch (err) {
    console.warn("[WatchlistService] Backend offline, menggunakan localStorage:", err);
    return getStoredWatchlist(email);
  }
}

/**
 * Toggle status emiten di watchlist (tambah jika belum ada, hapus jika sudah ada)
 */
export async function toggleWatchlistApi(
  ticker: string,
  email: string = "investor@beistockinsight.id"
): Promise<{ action: "added" | "removed"; tickers: string[] }> {
  const cleanTicker = ticker.toUpperCase().trim();
  const currentStored = getStoredWatchlist(email);
  let nextTickers: string[];
  let action: "added" | "removed";

  if (currentStored.includes(cleanTicker)) {
    nextTickers = currentStored.filter((t) => t !== cleanTicker);
    action = "removed";
  } else {
    nextTickers = [cleanTicker, ...currentStored];
    action = "added";
  }

  // Update localStorage seketika untuk responsivitas instan
  saveStoredWatchlist(nextTickers, email);

  // Sinkronisasi ke Backend di background
  try {
    const res = await fetch(`${API_BASE_URL}/watchlist/toggle`, {
      method: "POST",
      headers: buildAuthHeaders(),
      body: JSON.stringify({ email, ticker: cleanTicker }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.status === "success" && Array.isArray(json.tickers)) {
        saveStoredWatchlist(json.tickers, email);
        return { action: json.action, tickers: json.tickers };
      }
    }
  } catch (err) {
    console.warn("[WatchlistService] Gagal sync ke backend, tetap simpan lokal:", err);
  }

  return { action, tickers: nextTickers };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const WATCHLIST_STORAGE_KEY = "bei_stock_insight_watchlist";

export const DEFAULT_WATCHLIST_TICKERS = ["BBCA", "BBRI", "ICBP", "TLKM"];

/**
 * Membaca watchlist dari localStorage sebagai cadangan offline
 */
export function getStoredWatchlist(): string[] {
  if (typeof window === "undefined") return DEFAULT_WATCHLIST_TICKERS;
  try {
    const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(DEFAULT_WATCHLIST_TICKERS));
      return DEFAULT_WATCHLIST_TICKERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_WATCHLIST_TICKERS;
  } catch {
    return DEFAULT_WATCHLIST_TICKERS;
  }
}

/**
 * Menyimpan watchlist ke localStorage
 */
export function saveStoredWatchlist(tickers: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(tickers));
  } catch (err) {
    console.error("[WatchlistService] Gagal simpan ke localStorage:", err);
  }
}

/**
 * Mengambil daftar watchlist dari Backend API (dengan fallback localStorage)
 */
export async function fetchWatchlist(email: string = "investor@beistockinsight.id"): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/watchlist?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const json = await res.json();
    if (json.status === "success" && Array.isArray(json.tickers)) {
      saveStoredWatchlist(json.tickers);
      return json.tickers;
    }
    return getStoredWatchlist();
  } catch (err) {
    console.warn("[WatchlistService] Backend offline, menggunakan localStorage:", err);
    return getStoredWatchlist();
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
  const currentStored = getStoredWatchlist();
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
  saveStoredWatchlist(nextTickers);

  // Sinkronisasi ke Backend di background
  try {
    const res = await fetch(`${API_BASE_URL}/watchlist/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, ticker: cleanTicker }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.status === "success" && Array.isArray(json.tickers)) {
        saveStoredWatchlist(json.tickers);
        return { action: json.action, tickers: json.tickers };
      }
    }
  } catch (err) {
    console.warn("[WatchlistService] Gagal sync ke backend, tetap simpan lokal:", err);
  }

  return { action, tickers: nextTickers };
}

export interface UserProfile {
  name: string;
  email: string;
  experienceLevel: "Pemula" | "Menengah" | "Mahir";
  initialCapital?: number;
  initialCapitalLabel?: string;
  preferredSectors: string[];
  joinedDate: string;
  bio?: string;
  notificationsEnabled: boolean;
}

export const DEFAULT_USER: UserProfile = {
  name: "Arya Pratama",
  email: "arya@beistockinsight.id",
  experienceLevel: "Pemula",
  initialCapital: 2500000,
  initialCapitalLabel: "Rp 2.500.000",
  preferredSectors: ["Keuangan", "Barang Konsumsi Primer"],
  joinedDate: "November 2024",
  bio: "Investor ritel pemula yang fokus pada saham dividen dan perbankan unggulan BEI.",
  notificationsEnabled: true,
};

const AUTH_STORAGE_KEY = "bei_stock_insight_user";

export function getStoredUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return DEFAULT_USER;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return DEFAULT_USER;
  }
}

export function saveStoredUser(user: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Gagal menyimpan profil pengguna ke localStorage:", err);
  }
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.error("Gagal menghapus profil pengguna:", err);
  }
}

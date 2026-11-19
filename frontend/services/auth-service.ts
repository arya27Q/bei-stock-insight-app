import { showFeedbackPopup, hideFeedbackPopup } from "@/components/ui/ActionFeedbackPopup";

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  experienceLevel: "Pemula" | "Menengah" | "Mahir";
  initialCapital?: number;
  initialCapitalLabel?: string;
  preferredSectors: string[];
  joinedDate?: string;
  bio?: string;
  notificationsEnabled: boolean;
  createdAt?: string;
}

export const DEFAULT_USER: UserProfile = {
  id: "demo-user-arya",
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
const AUTH_TOKEN_KEY = "bei_stock_insight_token";
export const AUTH_CHANGE_EVENT = "bei_stock_insight_auth_change";

export function getStoredUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveAuthSession(user: UserProfile, token?: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: { user, token } }));
  } catch (err) {
    console.error("Gagal menyimpan sesi pengguna:", err);
  }
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: { user: null, token: null } }));
  } catch (err) {
    console.error("Gagal menghapus sesi pengguna:", err);
  }
}

// API Login ke Backend Express
export async function loginApi(email: string, password: string): Promise<{ user: UserProfile; token: string }> {
  showFeedbackPopup({
    status: "loading",
    title: "Memproses Login Akun...",
    message: "Memverifikasi kredensial investor ke server BEI Stock Insight.",
  });

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();
    if (!res.ok || json.status !== "success") {
      hideFeedbackPopup();
      throw new Error(json.message || "Gagal masuk ke akun investor.");
    }

    const userData: UserProfile = {
      ...DEFAULT_USER,
      ...json.data,
      joinedDate: json.data?.createdAt
        ? new Date(json.data.createdAt).toLocaleDateString("id-ID", { month: "long", year: "numeric" })
        : "November 2024",
    };

    saveAuthSession(userData, json.token);
    showFeedbackPopup({
      status: "success",
      title: "Login Akun Berhasil!",
      message: `Selamat datang kembali, ${userData.name}. Sesi riset Anda telah aktif.`,
      durationMs: 3200,
    });
    return { user: userData, token: json.token };
  } catch (err) {
    hideFeedbackPopup();
    throw err;
  }
}

// API Register ke Backend Express
export async function registerApi(data: {
  name: string;
  email: string;
  password: string;
  experienceLevel?: "Pemula" | "Menengah" | "Mahir";
  preferredSectors?: string[];
  bio?: string;
}): Promise<{ user: UserProfile; token: string }> {
  showFeedbackPopup({
    status: "loading",
    title: "Mendaftarkan Akun Investor...",
    message: "Menyimpan profil dan preferensi riset Anda ke database.",
  });

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok || json.status !== "success") {
      hideFeedbackPopup();
      throw new Error(json.message || "Gagal mendaftarkan akun baru.");
    }

    const userData: UserProfile = {
      ...DEFAULT_USER,
      ...json.data,
      joinedDate: new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
    };

    saveAuthSession(userData, json.token);
    showFeedbackPopup({
      status: "success",
      title: "Pendaftaran Akun Sukses!",
      message: `Akun investor ${userData.name} berhasil terdaftar dan langsung aktif.`,
      durationMs: 3500,
    });
    return { user: userData, token: json.token };
  } catch (err) {
    hideFeedbackPopup();
    throw err;
  }
}

// API Update Profil ke Backend
export async function updateProfileApi(updated: Partial<UserProfile>): Promise<UserProfile> {
  const token = getStoredToken();
  const currentUser = getStoredUser() || DEFAULT_USER;
  const merged = { ...currentUser, ...updated };

  showFeedbackPopup({
    status: "loading",
    title: "Menyimpan Profil Investor...",
    message: "Memperbarui preferensi riset dan identitas akun Anda.",
  });

  try {
    const res = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "x-user-email": currentUser.email,
      },
      body: JSON.stringify(updated),
    });

    const json = await res.json();
    if (res.ok && json.status === "success") {
      const serverUser = { ...merged, ...json.data };
      saveAuthSession(serverUser, token || undefined);
      showFeedbackPopup({
        status: "success",
        title: "Profil Berhasil Disimpan!",
        message: "Preferensi investasi dan profil akun Anda telah diperbarui.",
        durationMs: 2800,
      });
      return serverUser;
    }
  } catch (err) {
    console.warn("[updateProfileApi] Backend offline, menyimpan ke penyimpanan lokal:", err);
  }

  saveAuthSession(merged, token || undefined);
  showFeedbackPopup({
    status: "success",
    title: "Profil Berhasil Disimpan!",
    message: "Preferensi investasi dan profil akun Anda telah diperbarui.",
    durationMs: 2800,
  });
  return merged;
}

// API Forgot Password
export async function forgotPasswordApi(email: string): Promise<{ message: string; demoResetCode?: string }> {
  const res = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const json = await res.json();
  if (!res.ok || json.status !== "success") {
    throw new Error(json.message || "Gagal memproses permintaan reset kata sandi.");
  }

  return {
    message: json.message,
    demoResetCode: json.demoResetCode,
  };
}

// API Reset Password (Verifikasi Kode OTP & Sandi Baru)
export async function resetPasswordApi(
  email: string,
  code: string,
  newPassword: string
): Promise<{ message: string }> {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, newPassword }),
  });

  const json = await res.json();
  if (!res.ok || json.status !== "success") {
    throw new Error(json.message || "Gagal memperbarui kata sandi.");
  }

  return { message: json.message };
}

// API Logout
export async function logoutApi(): Promise<void> {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    // Ignore network error on logout
  }
  clearAuthSession();
}

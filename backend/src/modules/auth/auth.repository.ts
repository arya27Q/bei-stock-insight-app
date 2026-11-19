import { prisma } from "../../config/prisma.js";

export interface CreateUserInput {
  name: string;
  email: string;
  passwordHash: string;
  experienceLevel?: string;
  initialCapital?: number;
  initialCapitalLabel?: string;
  preferredSectors?: string[];
  bio?: string;
}

export interface UpdateProfileInput {
  name?: string;
  experienceLevel?: string;
  initialCapital?: number;
  initialCapitalLabel?: string;
  preferredSectors?: string[];
  bio?: string;
  notificationsEnabled?: boolean;
}

export const authRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async createUser(data: CreateUserInput) {
    return prisma.user.create({
      data: {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.passwordHash,
        experienceLevel: data.experienceLevel || "Pemula",
        initialCapital: data.initialCapital ?? 2500000,
        initialCapitalLabel: data.initialCapitalLabel || "Rp 2.500.000",
        preferredSectors: data.preferredSectors || ["Keuangan", "Barang Konsumsi Primer"],
        bio: data.bio || "Investor pemula di Bursa Efek Indonesia.",
        notificationsEnabled: true,
      },
    });
  },

  async updateProfile(email: string, data: UpdateProfileInput) {
    return prisma.user.update({
      where: { email: email.toLowerCase().trim() },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.experienceLevel !== undefined && { experienceLevel: data.experienceLevel }),
        ...(data.initialCapital !== undefined && { initialCapital: data.initialCapital }),
        ...(data.initialCapitalLabel !== undefined && { initialCapitalLabel: data.initialCapitalLabel }),
        ...(data.preferredSectors !== undefined && { preferredSectors: data.preferredSectors }),
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.notificationsEnabled !== undefined && { notificationsEnabled: data.notificationsEnabled }),
      },
    });
  },

  async setResetToken(email: string, token: string, expires: Date) {
    return prisma.user.update({
      where: { email: email.toLowerCase().trim() },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    });
  },

  async updatePassword(email: string, newPasswordHash: string) {
    return prisma.user.update({
      where: { email: email.toLowerCase().trim() },
      data: {
        password: newPasswordHash,
        resetToken: null,
        resetTokenExpires: null,
      },
    });
  },
};

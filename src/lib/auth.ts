import bcrypt from "bcryptjs";
import type { AstroCookies } from "astro";
import { prisma } from "./db";
import { clearSessionCookie, getSessionFromCookies, setSessionCookie } from "./session";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function createSession(cookies: AstroCookies, userId: number) {
  setSessionCookie(cookies, userId);
}

export function clearSession(cookies: AstroCookies) {
  clearSessionCookie(cookies);
}

export async function getCurrentUser(cookies: AstroCookies) {
  const payload = getSessionFromCookies(cookies);

  if (!payload) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
}

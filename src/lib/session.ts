import crypto from "node:crypto";
import type { AstroCookies } from "astro";

const SESSION_COOKIE = "nextgen_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type SessionPayload = {
  userId: number;
  expiresAt: number;
};

function getSessionSecret() {
  const secret = import.meta.env?.SESSION_SECRET || "";
  const fallback = "nextgen-dev-secret";
  const activeSecret = secret || fallback;

  if (import.meta.env?.PROD && (!secret || secret === "cambia-esta-clave-larga-en-produccion")) {
    throw new Error("SESSION_SECRET must be configured with a strong value in production.");
  }

  return activeSecret;
}

function signPayload(value: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createToken(payload: SessionPayload) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function readToken(token: string): SessionPayload | null {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  const provided = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString()) as SessionPayload;

    if (payload.expiresAt < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getSessionFromCookies(cookies: AstroCookies) {
  const token = cookies.get(SESSION_COOKIE)?.value;
  return token ? readToken(token) : null;
}

export function setSessionCookie(cookies: AstroCookies, userId: number) {
  const token = createToken({
    userId,
    expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
  });

  cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: import.meta.env.PROD,
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearSessionCookie(cookies: AstroCookies) {
  cookies.delete(SESSION_COOKIE, { path: "/" });
}
